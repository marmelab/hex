const { Sequelize, DataTypes } = require("sequelize");
const GAME_DEFINITION = {
  uuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  player1_nickname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  player2_nickname: {
    type: Sequelize.STRING,
  },
  grid: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
};

module.exports = { GAME_DEFINITION };
