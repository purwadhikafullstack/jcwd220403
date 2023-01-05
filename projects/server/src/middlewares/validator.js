const { check, validationResult, body } = require('express-validator');
const database = require('../models');
const user = database.user;

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

exports.loginValidation = [
  check('email', 'Please input your email').notEmpty(),
  check('email', 'Please input a valid email').isEmail(),
  body('email').custom((value) => {
    return user
      .findOne({
        where: {
          email: value,
        },
        raw: true,
      })
      .then((user) => {
        if (!user) {
          return Promise.reject('email is not registered yet');
        }
      });
  }),
  check('password', 'Please input your password').notEmpty(),
  check('password', 'Password should be at least 8 characters').isLength({
    min: 8,
  }),
];

exports.registerValidation = [
  check('email', 'Please input your email').notEmpty(),
  check('email', 'Please input a valid email').isEmail(),
  check('password', 'Please input your password').notEmpty(),
  check('password', 'Password should be at least 8 characters')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number'
    ),
];
