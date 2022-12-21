const router = require('express').Router();

const { userControllers } = require('../controllers');

router.get('/', (req, res) => {
  res.status(200).send('home');
});
router.post('/api/register', userControllers.register);
router.get('/api/verification/:token', userControllers.verification);

module.exports = router;
