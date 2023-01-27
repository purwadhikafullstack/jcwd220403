const router = require('express').Router();

const { paymentController } = require('../../controllers');

router.post('/api/payment/:transactionId', paymentController.addPayment);
router.post(
  '/api/payment/:transactionId/verification',
  paymentController.uploadPaymentProof
);

module.exports = router;
