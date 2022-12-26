const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenControllers');

router.get('/api/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;
