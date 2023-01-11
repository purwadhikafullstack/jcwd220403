const router = require('express').Router();

const { userControllers } = require('../controllers');

router.get('/api/users', userControllers.users);
router.get('/api/user/:id', userControllers.userById);

module.exports = router;
