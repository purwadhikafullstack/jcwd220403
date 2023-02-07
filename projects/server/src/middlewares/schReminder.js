const database = require('../models');
const { Op, Sequelize } = require("sequelize");

module.exports = {
  users: async (req, res) => {
    try {
      const response = await database.transaction.findAll({
        attributes: ['id', 'checkIn', 'checkOut', 'transactionStatus'],
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
        raw: true
    })
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  },
};
