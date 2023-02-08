const database = require('../models');
const { Op, Sequelize } = require("sequelize");
const nodemailer = require('../middlewares/nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

module.exports = {
  before: async (req, res) => {

    const tomorrow  = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      const response = await database.transaction.findAll({
        attributes: ['id', 'checkIn', 'checkOut', 'transactionStatus', "isReminded"],
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
        where: {
          [Op.and]: [
              {
                checkIn: tomorrow
              },
              {
                transactionStatus: "Diproses"
              },
              {
                isReminded: false
              }
          ]
        },
        raw: true
    })

      if (response.length !== 0) {
        response.map( async (item) => {

          const tempEmail = fs.readFileSync(
            `${process.env.ACCESS_SRC_FILE}emailTemplates/checkInReminder.html`,
            'utf-8'
          );
          const tempCompile = handlebars.compile(tempEmail);
          const tempResult = tempCompile({
            email: item['user.email'],
            fullName: item['user.fullName'],
            roomName: item['room.property.name'],
            propertyName: item['room.property.name'],
            checkIn: new Date(item.checkIn).toLocaleString('en', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
            checkOut: new Date(item.checkOut).toLocaleString('en', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          });
    
          await nodemailer.sendMail({
            from: 'Admin',
            to: item['user.email'],
            subject: `[Holistay] Waktunya Staycation di ${item['room.property.name']}`,
            html: tempResult,
          });
    
          await database.transaction.update(
            { isReminded: true },
            {
              where: {
                id: item.id,
              },
            }
          );

        })
      }
      console.log('Succes Reminder')
    } catch (error) {
      console.log(error);
    }
  },
  sameday: async (req, res) => {

    const today  = new Date();
    today.setDate(today.getDate());

    try {
      const response = await database.transaction.findAll({
        attributes: ['id', 'checkIn', 'checkOut', 'transactionStatus', "isReminded"],
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
        where: {
          [Op.and]: [
              {
                checkIn: today
              },
              {
                transactionStatus: "Diproses"
              },
              {
                isReminded: false
              }
          ]
        },
        raw: true
    })

      if (response.length !== 0) {
        response.map( async (item) => {

          const tempEmail = fs.readFileSync(
            `${process.env.ACCESS_SRC_FILE}emailTemplates/checkInReminder.html`,
            'utf-8'
          );
          const tempCompile = handlebars.compile(tempEmail);
          const tempResult = tempCompile({
            email: item['user.email'],
            fullName: item['user.fullName'],
            roomName: item['room.property.name'],
            propertyName: item['room.property.name'],
            checkIn: new Date(item.checkIn).toLocaleString('en', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
            checkOut: new Date(item.checkOut).toLocaleString('en', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          });
    
          await nodemailer.sendMail({
            from: 'Admin',
            to: item['user.email'],
            subject: `[Holistay] Waktunya Staycation di ${item['room.property.name']}`,
            html: tempResult,
          });
    
          await database.transaction.update(
            { isReminded: true },
            {
              where: {
                id: item.id,
              },
            }
          );

        })
      }
      console.log('Succes Reminder')
    } catch (error) {
      console.log(error);
    }
  },
};
