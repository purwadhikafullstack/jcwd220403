const database = require('../../models');
const paymentMethod = database.paymentMethod;

const getPaymentMethod = async (req, res) => {
  try {
    const { paymentMethodId } = req.params;

    const getData = await paymentMethod.findOne({
      where: { id: paymentMethodId },
    });

    res.status(200).send(getData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { getPaymentMethod };
