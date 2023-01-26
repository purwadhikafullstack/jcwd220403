const router = require('express').Router();

const { paymentController } = require('../../controllers');

router.post('/api/payment/:transactionId', paymentController.addPayment);

module.exports = router;
