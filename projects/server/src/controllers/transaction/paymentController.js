const database = require('../../models');
const payment = database.payment;

const addPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { paymentMethodId, total } = req.body;

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

module.exports = { addPayment };
