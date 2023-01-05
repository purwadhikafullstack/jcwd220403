const router = require('express').Router();

const { authControllers } = require('../controllers');
const { runValidation, loginValidation } = require('../middlewares/validator');

router.post('/api/register', authControllers.register);
router.post(
  '/api/login',
  loginValidation,
  runValidation,
  authControllers.login
);
router.post('/api/verification/', authControllers.verification);
router.post('/api/resendOTP/', authControllers.resendOTP);
router.post('/api/forgotPassword/', authControllers.forgotPassword);
router.get('/api/test/', authControllers.test);

module.exports = router;
