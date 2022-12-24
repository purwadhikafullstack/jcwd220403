const router = require('express').Router();

const { authControllers } = require('../controllers');

router.get('/', (req, res) => {
  res.status(200).send('home');
});
router.post('/api/register', authControllers.register);
router.post('/api/login', authControllers.login);
router.post('/api/verification/', authControllers.verification);
router.post('/api/forgotPassword/', authControllers.forgotPassword);

module.exports = router;
