const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('../helpers/nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

const user = database.user;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, fullName } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      await user.create({
        email,
        password: hashPass,
        fullName,
      });

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '10m',
      });

      const tempEmail = fs.readFileSync(
        './emailTemplates/verificationEmail.html',
        'utf-8'
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        fullName,
        link: `http://localhost:2000/api/verification/${token}`,
      });

      await nodemailer.sendMail({
        from: 'Admin',
        to: email,
        subject: 'User verification',
        html: tempResult,
      });

      res
        .status(200)
        .send(
          'Register Success. Please check your email for verification link'
        );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  verification: async (req, res) => {
    const { token } = req.params;

    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

      await user.update(
        {
          verified: true,
        },
        {
          where: {
            email: verify.email,
          },
        }
      );

      const verifiedUser = await user.findOne({
        where: {
          email: verify.email,
        },
      });

      const { email, fullName } = verifiedUser.dataValues;

      const tempEmail = fs.readFileSync(
        './emailtemplates/successVerificationEmail.html',
        'utf-8'
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email,
        fullName,
      });

      await nodemailer.sendMail({
        from: 'Admin',
        to: email,
        subject: 'Verification Success',
        html: tempResult,
      });
      res.redirect('http://localhost:2000/api/');
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
