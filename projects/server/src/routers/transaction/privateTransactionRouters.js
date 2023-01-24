const router = require('express').Router();

const { privateTransactionControllers } = require('../../controllers');

router.post('/api/transaction/', privateTransactionControllers.addTransaction);

module.exports = router;
