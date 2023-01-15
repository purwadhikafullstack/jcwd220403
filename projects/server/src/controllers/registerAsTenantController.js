require('dotenv').config();
const path = require('path');
const database = require('../models');
const tenant = database.tenant;
const user = database.tenant;
const jwt = require('jsonwebtoken');

const RegisterAsTenant = async (req, res) => {
  const { KTPNumber, userId } = req.body;
  const ktp = req.files.KTPPhoto;

  const findTenant = await tenant.findOne({
    where: { userId },
  });

  if (findTenant) {
    res.status(500);
    res.send({
      message: 'User is already a tenant',
    });
  } else {
    if (!req.files) {
      res.status(500);
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    }

    const extensionName = path.extname(ktp.name);
    const allowedExtension = ['.png', '.jpg', '.jpeg', '.webp'];

    if (!allowedExtension.includes(extensionName)) {
      res.status(500);
      res.send({
        status: false,
        message: 'Invalid image extension',
      });
    }

    const filename = `user${userId}${extensionName}`;

    await tenant.create({
      KTPPhoto: filename,
      KTPNumber,
      userId,
    });

    ktp.mv('./public/ktp/' + filename);
    res.status(200);
    res.send({
      status: true,
      message: 'file is uploaded',
      data: {
        KTPNumber,
        name: ktp.name,
        mimetype: ktp.mimetype,
        size: ktp.size,
      },
    });
  }
};

const test = async (req, res) => {
  res.sendStatus(200);
};

module.exports = { RegisterAsTenant, test };
