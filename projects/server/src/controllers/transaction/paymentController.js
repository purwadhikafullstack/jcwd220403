const database = require('../../models');
const path = require('path');
const payment = database.payment;

const addPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { paymentMethodId, total } = req.body;

    if (!transactionId || !paymentMethodId || !total) {
      return res.status(500).send('Please send a complete data');
    }

    const addPayment = await payment.create({
      transactionId,
      paymentMethodId,
      total,
    });

    res.status(200).send(addPayment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const uploadPaymentProof = async (req, res) => {
  const { transactionId } = req.params;

  if (!req.files) {
    return res.status(400).send('Please upload a file');
  }

  const { paymentProof } = req.files;

  if (!paymentProof || !transactionId) {
    return res.status(500).send('Incomplete data ');
  }

  const extensionName = path.extname(paymentProof.name);
  const allowedExtension = ['.png', '.jpg', '.jpeg', '.webp'];

  if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send({
      status: false,
      message: 'Invalid image extension',
    });
  }

  const filename = `receipt${transactionId}${extensionName}`;

  const addPaymentProof = await payment.update(
    { paymentProof: filename },
    { where: { transactionId } }
  );

  await paymentProof.mv('./public/paymentProof/' + filename, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });

  res.status(200).send({
    message:
      'file is successfully uploaded, please wait for the verification process',
    data: addPaymentProof,
  });
};

module.exports = { addPayment, uploadPaymentProof };
