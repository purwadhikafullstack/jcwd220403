const database = require('../../models');
const transaction = database.transaction;

const getTransactionById = async (req, res) => {
  try {
    const { roomId } = req.params;

    const getTansactions = await transaction.findAll({
      where: { roomId },
    });

    const dates = getTansactions.map((item) => [item.checkIn, item.checkOut]);

    res.status(200).send(dates);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { getTransactionById };
