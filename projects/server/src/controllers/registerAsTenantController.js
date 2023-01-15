require('dotenv').config();
const path = require('path');
const database = require('../models');
const tenant = database.tenant;
const jwt = require('jsonwebtoken');

const RegisterAsTenant = async (req, res) => {
  const { KTPNumber } = req.body;
  const ktp = req.files.KTPPhoto;
  let userIdFromToken;
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookies.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (err, decode) => {
      if (err) return res.sendStatus(403);
      return (userIdFromToken = decode.userId);
    }
  );
  const findTenant = await tenant.findOne({
    where: { userId: userIdFromToken },
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

    const filename = `user${userIdFromToken}${extensionName}`;

    await tenant.create({
      KTPPhoto: filename,
      KTPNumber,
      userId: userIdFromToken,
    });

    ktp.mv('./public/ktp/' + filename);
    res.status(200);
    res.send({
      status: true,
      message: 'File is uploaded',
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
