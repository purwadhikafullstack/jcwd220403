const database = require("../models")
const { Op, Sequelize } = require("sequelize");
// const fs = require("fs");
// const path = require("path");
// const puppeteer = require('puppeteer');
// const nodemailer = require('../middlewares/nodemailer');
// const handlebars = require("handlebars");

module.exports = {
    reportTransactions: async (req, res) => {
        const {tenantId, search, order, order_direction, limit, start, end, page, transactionStatus} = req.query
        const startedDate = start ? new Date(start) : null
        const endDate = end ? new Date(end) : new Date(start)
        const offset = (page * limit) - limit
        console.log(req.query)
        try{

            const rows = await database.transaction.count({
                where: { 
                    [Op.and]: [
                        {
                            checkIn: startedDate ? {[Op.between]: [startedDate, endDate]} : {[Op.not]: null} 
                        },
                        {
                            transactionStatus:  transactionStatus ? transactionStatus : {[Op.not]: null} 
                        }
                    ]
                },
                include: 
                [
                    {
                        model: database.room,
                        attributes: [],
                        required: true,
                        include: [{
                            model: database.property,
                            attributes: [],
                            where: {'tenantId': tenantId}
                        }]
                    },
                    {
                        model: database.user,
                        attributes: ['fullName', 'email'],
                        where: {
                            fullName: search ? {
                                [Op.like]: "%" + search + "%"
                            } : {[Op.not]: null} 
                        }
                    }
                ],
                group: ['room.property.tenantId'],
            })

            const totalRows = rows[0] ? rows[0].count : 0
            const totalPage = Math.ceil(totalRows / limit);
            console.log(totalPage)
              
            const data = await database.transaction.findAll({
                attributes: ['id', 'checkIn', 'checkOut', 'transactionStatus'],
                where: { 
                    [Op.and]: [
                        {
                            checkIn: startedDate ? {[Op.between]: [startedDate, endDate]} : {[Op.not]: null} 
                        },
                        {
                            transactionStatus:  transactionStatus ? transactionStatus : {[Op.not]: null} 
                        }
                    ]
                },
                include: 
                [
                    {
                        model: database.room,
                        attributes: ['name', 'price'],
                        include: [{
                            model: database.property,
                            attributes: ['tenantId', 'name'],
                        }],
                    },
                    {
                        model: database.user,
                        attributes: ['fullName', 'email'],
                        where: {
                            fullName: search ? {
                                [Op.like]: "%" + search + "%"
                            } : {[Op.not]: null} 
                        }
                    }
                ],
                having: {
                    [Op.and]: [
                        {'room.property.tenantId': tenantId },
                    ]
                },
                order: [
                    order === "name" ? [{ model: database.room }, order, order_direction] : 
                    order === "price" ? [{ model: database.room }, order, order_direction] : 
                    order === "fullName" ? [{ model: database.user }, order, order_direction] : 
                    [order, order_direction]
                ],
                limit: [+limit],
                offset: [offset]
            })

            const amount = await database.transaction.findAll({
                attributes: [
                    [Sequelize.fn('sum', Sequelize.col('room.price')), 'total_amount'],
                  ],
                where: { 
                    [Op.and]: [
                        {
                            checkIn: startedDate ? {[Op.between]: [startedDate, endDate]} : {[Op.not]: null} 
                        },
                        {
                            transactionStatus:  ['Menunggu Konfirmasi Pembayaran', 'Diproses']
                        }
                    ]
                },
                include: 
                [
                    {
                        model: database.room,
                        attributes: [],
                        include: [{
                            model: database.property,
                            attributes: [],
                            where: {
                                tenantId
                            }
                        }],
                    },
                ],
                group: ['room.property.tenantId'],
                having: {
                    [Op.and]: [
                        {'total_amount': {[Op.not]: null} },
                    ]
                },
              });

              const totalAmount = amount[0] ? +amount[0].dataValues.total_amount : 0
            
            res.status(201).send(
                { 
                    totalRows,
                    totalPage,
                    totalAmount,
                    data
                } 
            )
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    }
}