const router = require('express').Router();

const { paymentController } = require('../../controllers');

router.post('/api/payment/:transactionId', paymentController.addPayment);
router.post(
  '/api/payment/:transactionId/verification',
  paymentController.uploadPaymentProof
);
router.get('/api/payment/:paymentId', paymentController.getPayment);
router.get('/api/testpay', paymentController.testPay);

module.exports = router;
