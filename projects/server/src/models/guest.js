'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guest.belongsTo(models.transaction, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  guest.init(
    {
      adult: DataTypes.INTEGER,
      children: DataTypes.INTEGER,
      infant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'guest',
    }
  );
  return guest;
};
