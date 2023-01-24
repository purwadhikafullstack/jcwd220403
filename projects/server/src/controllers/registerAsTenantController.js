const path = require('path');
const database = require('../models');
const tenant = database.tenant;

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

    if (KTPNumber.length !== 16) {
      res.status(500);
      res.send({
        status: false,
        message: 'KTP Number must be 16 digits',
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

    const newTenant = await tenant.create({
      KTPPhoto: filename,
      KTPNumber,
      userId,
    });

    console.log(newTenant);

    ktp.mv('./public/ktp/' + filename);

    res.status(200);
    res.send({
      status: true,
      message: 'file is uploaded',
      data: {
        KTPNumber,
        tenantId: newTenant?.id,
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
