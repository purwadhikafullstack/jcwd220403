const router = require('express').Router();

const { privateTransactionControllers } = require('../../controllers');

router.post('/api/transaction/', privateTransactionControllers.addTransaction);

router.get(
  '/api/trips/:userId',
  privateTransactionControllers.getuserTransaction
);

module.exports = router;
