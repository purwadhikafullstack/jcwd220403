const router = require('express').Router();

const { userControllers } = require('../controllers');

router.get('/', (req, res) => {
  res.cookie('cookie', 'tes', { maxAge: 5000 }).status(200).send('home');
});
router.post('/api/register', userControllers.register);
router.post('/api/verification/', userControllers.verification);

module.exports = router;
