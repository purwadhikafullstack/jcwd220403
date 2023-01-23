const database = require("../models")
const { Op } = require("sequelize");

module.exports = {
    transactionsUser: async (req, res) => {
        try{
            const response = await database.transaction.findAll({
                attributes: ['checkIn', 'checkOut', 'transactionStatus'],
                include: 
                [
                    {
                        model: database.room,
                        attributes: ['name', 'price'],
                        include: [{
                            model: database.property,
                            attributes: ['tenantId'],
                        }]
                    },
                    {
                        model: database.user,
                        attributes: ['fullName']
                    }
                ],
                having: {
                    [Op.and]: [
                        {'room.property.tenantId': 2 },
                        {'transactionStatus' : 'Menunggu Konfirmasi Pembayaran'}
                    ]
                }
            })


            res.status(201).send(response)
        }catch(err){
            console.log(err)
            res.status(404).send(err)
        }
    }
}