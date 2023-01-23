const router = require('express').Router();

const { transactionControllers } = require('../../controllers');

router.get(
  '/api/transaction/:roomId',
  transactionControllers.getTransactionById
);

module.exports = router;
