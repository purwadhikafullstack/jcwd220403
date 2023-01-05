require('dotenv').config();
const database = require('../models');
const user = database.user;
const userLogin = database.login;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('../middlewares/nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const { OTP_generator } = require('../middlewares/otp_service');

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, fullName, repeatPassword } = req.body;

      if (password !== repeatPassword) {
        res.status(400).send({ message: 'Password does not match' });
      }

      if (password.length < 8) {
        res.status(400).send({ message: 'Password is less than 8 characters' });
      }

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);
      const otp = OTP_generator();

      await user.create({
        email,
        password: hashPass,
        fullName,
      });

      const token = jwt.sign({ email: email }, otp, {
        expiresIn: '5m',
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
        .header('Access-Control-Allow-Credentials', true)
        .cookie('email', email, {
          maxAge: 60 * 5000,
          httpOnly: false,
          path: '/',
        })
        .status(201)
        .send({
          message:
            'Register Success. Please check your email for verification link',
          token,
        });
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

      res.status(200).send({ message: 'Verification Sucess!' });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    let browser = req.device.client.name;
    let device = req.device.device.type;

    const emailExist = await user.findOne({
      where: {
        email,
      },
      raw: true,
    });

    const isValidPassword = await bcrypt.compare(password, emailExist.password);
    if (isValidPassword) {
      if (emailExist.verified == true) {
        let payload = { email: emailExist.email, userId: emailExist.id };

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
          expiresIn: '30s',
        });

        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: '1d' }
        );

        const [loginFound, created] = await userLogin.findOrCreate({
          where: {
            userId: emailExist.id,
            device,
            browser,
          },
          defaults: { refreshToken },
        });

        if (!created) {
          await userLogin.update(
            { refreshToken },
            {
              where: {
                userId: emailExist.id,
                device,
                browser,
              },
            }
          );
        }

        res.header('Access-Control-Allow-Credentials', true);
        res.cookie('refreshToken', refreshToken, {
          maxAge: 28 * 60 * 60 * 1000,
          httpOnly: false,
          sameSite: 'None',
          // secure: 'true',
        });
        res.send({
          userToken: token,
          userEmail: emailExist.email,
          userName: emailExist.fullName,
        });
      } else {
        res.status(403).send({
          message: 'user is not verified yet. Please check your email',
        });
      }
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  },
  resendOTP: async (req, res) => {
    try {
      const { email } = req.body;

      const emailExist = await user.findOne({
        where: {
          email,
        },
        raw: true,
      });

      if (emailExist === null) {
        res.status(400).send({ message: 'email is not registered yet' });
      }

      const otp = OTP_generator();

      const token = jwt.sign({ email: email }, otp, {
        expiresIn: '5m',
      });

      const tempEmail = fs.readFileSync(
        './src/emailTemplates/verificationEmail.html',
        'utf-8'
      );
      const tempCompile = handlebars.compile(tempEmail);

      const tempResult = tempCompile({
        fullName: emailExist.fullName,
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
        .header('Access-Control-Allow-Credentials', true)
        .cookie('email', email, {
          maxAge: 60 * 5000,
          httpOnly: false,
          path: '/',
        })
        .status(200)
        .send({
          message: 'Resent OTP Success',
          token,
        });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const os = req.device.os.name;
      const browser = req.device.client.name;
      const device = req.device.device.type;
      const { email } = req.body;
      const emailExist = await user.findOne({
        where: {
          email,
        },
        raw: true,
      });

      if (emailExist === null) {
        res.status(400).send({ message: 'email is not registered yet' });
      }
      if (emailExist.verified == false) {
        res.status(400).send({
          message: 'user is not verified yet. Please check your email',
        });
      }

      const token = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET_KEY, {
        expiresIn: '10m',
      });

      //TODO: finish forgot password

      res.status(200).send('Success');
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  test: async (req, res) => {
    try {
      res.send('test auth controller');
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
