const router = require('express').Router();

const { privateTransactionControllers } = require('../../controllers');

router.post('/api/transaction/', privateTransactionControllers.addTransaction);

router.get(
  '/api/transaction/user',
  privateTransactionControllers.getuserTransaction
);

module.exports = router;
