const router = require('express').Router();

const { userControllers } = require('../controllers');

router.get('/', (req, res) => {
  res.status(200).send('home');
});
router.get('/api/users', userControllers.users);
router.post('/api/register', userControllers.register);
router.post('/api/login', userControllers.login);
router.post('/api/verification/', userControllers.verification);

module.exports = router;
