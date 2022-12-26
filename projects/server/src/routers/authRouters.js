const router = require('express').Router();

const { authControllers } = require('../controllers');

router.post('/api/register', authControllers.register);
router.post('/api/login', authControllers.login);
router.post('/api/verification/', authControllers.verification);
router.post('/api/resendOTP/', authControllers.resendOTP);
router.post('/api/forgotPassword/', authControllers.forgotPassword);
router.get('/api/test/', authControllers.test);

module.exports = router;
