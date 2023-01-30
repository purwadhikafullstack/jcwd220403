const database = require("../models")
const { Op, Sequelize } = require("sequelize");
// const fs = require("fs");
// const path = require("path");
// const puppeteer = require('puppeteer');
// const nodemailer = require('../middlewares/nodemailer');
// const handlebars = require("handlebars");

module.exports = {
    reportTransactions: async (req, res) => {
        const {tenantId, search, order, order_direction, limit, start, end, page} = req.query
        const startedDate = new Date(start);
        const endDate = new Date(end);
        const offset = (page * limit) - limit
        console.log(offset)
        console.log(req.query)
        try{

            const totalRows = await database.transaction.findAll({
                attributes: [[Sequelize.fn('Count', Sequelize.col('room.property.tenantId')), 'Count']],
                where: { 
                    checkIn: {[Op.between]: [startedDate, endDate]}
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
                    }
                ],
                group: ['room.property.tenantId'],
            })

            // const totalPage = Math.ceil(totalRows[0].Count / limit);
              
            const response = await database.transaction.findAll({
                attributes: ['id', 'checkIn', 'checkOut', 'transactionStatus'],
                where: { 
                    checkIn: {[Op.between]: [startedDate, endDate]}
                },
                include: 
                [
                    {
                        model: database.room,
                        attributes: ['name', 'price'],
                        include: [{
                            model: database.property,
                            attributes: ['tenantId', 'name'],
                        }]
                    },
                    {
                        model: database.user,
                        attributes: ['fullName', 'email']
                    }
                ],
                having: {
                    [Op.and]: [
                        {'room.property.tenantId': tenantId },
                    ]
                },
                order: [
                    [order, order_direction]
                ],
                limit: [+limit],
                offset: [offset]
            })
            
            res.status(201).send(
                { 
                    response,
                    totalRows: totalRows[0],
                    // totalPage
                } 
            )
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    }
}