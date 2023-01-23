const database = require('../../models');
const transaction = database.transaction;

const addTransaction = async (req, res) => {
  try {
    const { userId, checkIn, checkOut, roomId } = req.body;

    if (!userId || !checkIn || !checkOut || !roomId) {
      return res.status(500).send('Please send a complete data');
    }

    const newTransction = await transaction.create({
      userId,
      checkIn,
      checkOut,
      roomId,
    });

    res
      .status(200)
      .send({ message: 'transaction success', data: newTransction });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { addTransaction };
