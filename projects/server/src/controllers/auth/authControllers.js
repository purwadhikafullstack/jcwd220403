const database = require('../../models');
const user = database.user;
const tenant = database.tenant;
const userLogin = database.login;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('../../middlewares/nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const { OTP_generator } = require('../../middlewares/otp_service');
const { toISOLocal } = require('../../middlewares/useLocalISOString');

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, fullName } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const otp = OTP_generator();

      await user.create({
        email,
        password: hashPass,
        fullName,
      });

      const token = jwt.sign({ email: email }, otp, {
        expiresIn: '1d',
      });

      const tempEmail = fs.readFileSync(
        `${process.env.ACCESS_SRC_FILE}emailTemplates/verificationEmail.html`,
        'utf-8'
      );

      if (!tempEmail) {
        return res.status(400).send({ message: 'No email template found' });
      }

      const tempCompile = handlebars.compile(tempEmail);

      const tempResult = tempCompile({
        fullName,
        otp,
        link: `${process.env.DOMAIN}/verification/${token}`,
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
          maxAge: 86400000, //1 day
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
      res.status(400).send(error);
    }
  },

  verification: async (req, res) => {
    const { token } = req.query;
    const { otp } = req.body;

    try {
      const verify = jwt.verify(token, otp);

      const checkUser = await user.findOne({
        where: {
          email: verify.email,
        },
      });

      if (checkUser.verified) {
        return res
          .status(400)
          .send({ message: 'You account is already verified' });
      }

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

      const { email, fullName } = checkUser.dataValues;

      const tempEmail = fs.readFileSync(
        `${process.env.ACCESS_SRC_FILE}emailTemplates/successVerificationEmail.html`,
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
    });

    const isValidPassword = await bcrypt.compare(password, emailExist.password);
    if (isValidPassword) {
      if (emailExist.verified == true) {
        let payload = {
          email: emailExist.email,
          userId: emailExist.id,
          isTenant: emailExist.isTenant,
        };

        const accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: '2h',
          }
        );

        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: '7d' }
        );

        const [loginFound, created] = await userLogin.findOrCreate({
          where: {
            userId: emailExist.id,
            device,
            browser: browser || null,
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
                browser: browser || null,
              },
            }
          );
        }

        const tenantInfo = await tenant.findOne({
          where: {
            userId: emailExist.id,
          },
        });

        const daysForCookie = 7;

        res.header('Access-Control-Allow-Credentials', true);
        res.cookie('refreshToken', refreshToken, {
          maxAge: daysForCookie * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        });
        res.send({
          accessToken,
          userEmail: emailExist.email,
          name: emailExist.fullName,
          userId: emailExist.id,
          userPhoto: emailExist.photo,
          isTenant: emailExist.isTenant,
          tenantId: tenantInfo?.id || '',
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

      if (emailExist.verified) {
        return res
          .status(400)
          .send({ message: 'You account is already verified' });
      }

      let checkResendOTPAttemp = await user.findOne({ where: { email } });

      const lastResendOTPDate = new Date(
        checkResendOTPAttemp.resendOTPDate
      ).getDate();
      console.log(lastResendOTPDate);
      if (lastResendOTPDate < new Date().getDate()) {
        try {
          const newDate = new Date();
          const newUserData = await user.update(
            {
              resendOTPDate: toISOLocal(newDate),
              resendOTPAttemp: 0,
            },
            { where: { email } }
          );
          checkResendOTPAttemp = newUserData;
        } catch (error) {
          console.log(error);
          return res.status(400).send(error);
        }
      }

      if (checkResendOTPAttemp.resendOTPAttemp >= 5) {
        return res.status(400).send({
          message:
            'Maximum resend OTP is five times a day. please try again tomorrow',
        });
      }

      const updateResendOTPAttemp = await user.increment('resendOTPAttemp', {
        by: 1,
        where: { email },
      });

      const otp = OTP_generator();

      const token = jwt.sign({ email: email }, otp, {
        expiresIn: '1d',
      });

      const tempEmail = fs.readFileSync(
        `${process.env.ACCESS_SRC_FILE}emailTemplates/verificationEmail.html`,
        'utf-8'
      );
      const tempCompile = handlebars.compile(tempEmail);

      const tempResult = tempCompile({
        fullName: emailExist.fullName,
        otp,
        link: `${process.env.DOMAIN}/verification/${token}`,
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
          maxAge: 86400000, //1 day
          httpOnly: false,
          path: '/',
        })
        .status(200)
        .send({
          message: 'Resent OTP Success',
          token,
          resendOTPAttemp: updateResendOTPAttemp,
        });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  forgotPassword: async (req, res) => {
    const browser = req.device.client.name;
    const device = req.device.device.type;
    const { email } = req.body;
    const emailExist = await user.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!emailExist) {
      return res.status(400).send({ message: 'email is not registered yet' });
    }
    if (!emailExist.verified) {
      return res.status(400).send({
        message: 'user is not verified yet. Please check your email',
      });
    }

    const token = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET_KEY, {
      expiresIn: '15m',
    });

    const tempEmail = fs.readFileSync(
      `${process.env.ACCESS_SRC_FILE}emailTemplates/forgotPassword.html`,
      'utf-8'
    );
    const tempCompile = handlebars.compile(tempEmail);

    const tempResult = tempCompile({
      email,
      browser,
      device,
      link: `${process.env.DOMAIN}/resetpassword/${emailExist.id}/${token}`,
    });

    await nodemailer.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Reset Password Request',
      html: tempResult,
    });

    res.status(200).send({ message: 'Success', email });
  },

  resetPassword: async (req, res) => {
    const { password, id, token } = req.body;

    try {
      jwt.verify(token, process.env.RESET_PASSWORD_SECRET_KEY);
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      await user.update(
        {
          password: hashPass,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).send({ message: 'Reset Password Success' });
    } catch (error) {
      res.status(401).send(error.message);
    }
  },
};
