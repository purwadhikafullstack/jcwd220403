const database = require('../models');
const user = database.user;

module.exports = {
  users: async (req, res) => {
    try {
      const users = await user.findAll({
        attributes: ['id', 'fullName', 'email'],
      });

      res.json({ users });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  userById: async (req, res) => {
    try {
      const { id } = req.params;
      const userById = await user.findOne({
        where: {
          id,
        },
      });

      res.json({ userById });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
