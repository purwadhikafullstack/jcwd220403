const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('../helpers/nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const { OTP_generator } = require('../helpers/otp_service');

const user = database.user;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, fullName, repeatPassword } = req.body;

      if (password !== repeatPassword) throw 'Password does not match';
      if (password.length < 8) throw 'Password is less than 8 characters';

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);
      const otp = OTP_generator();

      await user.create({
        email,
        password: hashPass,
        fullName,
      });

      const token = jwt.sign({ email: email }, otp, {
        expiresIn: '10m',
      });

      const tempEmail = fs.readFileSync(
        './src/emailTemplates/verificationEmail.html',
        'utf-8'
      );
      const tempCompile = handlebars.compile(tempEmail);

      const tempResult = tempCompile({
        fullName,
        otp,
        link: `http://localhost:3000/verification/${token}`,
      });

      await nodemailer.sendMail({
        from: 'Admin',
        to: email,
        subject: 'User verification',
        html: tempResult,
      });

      res
        .cookie('otp', otp, { maxAge: 50000, httpOnly: false, path: '/api' })
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
    const { token } = req.query;
    const { otp } = req.body;

    try {
      const verify = jwt.verify(token, otp);

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
        './src/emailTemplates/successVerificationEmail.html',
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
      res.status(200).send('Verification Sucess!');
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const emailExist = await user.findOne({
        where: {
          email,
        },
        raw: true,
      });

      if (emailExist === null) throw 'user not found';

      const isValid = await bcrypt.compare(password, emailExist.password);

      if (!isValid) throw 'email or password is incorrect';

      if (emailExist.verified == false)
        throw 'user is not verified yet. Please check your email';

      const token = jwt.sign({ email: emailExist.email }, 'holistay');

      res.status(200).send({
        user: {
          email: emailExist.email,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  resend_OTP: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  users: async (req, res) => {
    try {
      res.status(200).send('test');
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  rememberLogin: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
