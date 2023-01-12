require('dotenv').config();
const path = require('path');
const database = require('../models');
const user = database.user;
const userLogin = database.login;

const RegisterAsTenant = async (req, res) => {
  const { KTPNumber, userID } = req.body;

  try {
    if (!req.files) {
      res.status(500);
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      let ktp = req.files.ktp;

      const extensionName = path.extname(ktp.name);
      const allowedExtension = ['.png', '.jpg', '.jpeg']; //.webp

      if (!allowedExtension.includes(extensionName)) {
        res.status(500);
        res.send({
          status: false,
          message: 'Invalid image extension',
        });
      } else {
        ktp.mv('./public/ktp/' + `user${userID}${extensionName}`);

        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            userID,
            KTPNumber,
            name: ktp.name,
            mimetype: ktp.mimetype,
            size: ktp.size,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const test = async (req, res) => {
  res.sendStatus(200);
};

module.exports = { RegisterAsTenant, test };
