const database = require('../../models');
const transaction = database.transaction;
const guest = database.guest;

const addTransaction = async (req, res) => {
  try {
    const {
      userId,
      checkIn,
      checkOut,
      roomId,
      adultGuest,
      childrenGuest,
      infantGuest,
    } = req.body;

    if (
      !userId ||
      !checkIn ||
      !checkOut ||
      !roomId ||
      !adultGuest ||
      !childrenGuest ||
      !infantGuest
    ) {
      return res.status(500).send('Please send a complete data');
    }

    const newTransaction = await transaction.create({
      userId,
      checkIn,
      checkOut,
      roomId,
    });

    const newGuestList = await guest.create({
      transactionId: newTransaction.id,
      adult: adultGuest,
      children: childrenGuest,
      infant: infantGuest,
    });

    res.status(200).send({
      message: 'Transaction success',
      roomDetail: newTransaction,
      guestList: newGuestList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getuserTransaction = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await transaction.findAll({
      where: { userId },
    });

    res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getUsersTransactions = async (req, res) => {};

const cancelTransaction = async (req, res) => {};

module.exports = {
  addTransaction,
  getUsersTransactions,
  getuserTransaction,
  cancelTransaction,
};
