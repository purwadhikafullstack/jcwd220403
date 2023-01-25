const database = require('../../models');
const transaction = database.transaction;
const { Op } = require('sequelize');

const getTransactionByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;

    const getTansactions = await transaction.findAll({
      attributes: ['checkIn', 'checkOut'],
      where: {
        [Op.and]: [
          { roomId },
          {
            [Op.and]: [
              { transactionStatus: { [Op.ne]: 'Gagal' } },
              { transactionStatus: { [Op.ne]: 'Dibatalkan' } },
            ],
          },
        ],
      },
    });

    res.status(200).send(getTansactions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const getTansactions = await transaction.findOne({
      where: { id },
    });

    res.status(200).send(getTansactions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { getTransactionByRoomId, getTransactionById };
