"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class unavailableDates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      unavailableDates.belongsTo(models.room, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  unavailableDates.init(
    {
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "unavailableDates",
    }
  );
  return unavailableDates;
};