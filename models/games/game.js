import { Sequelize, DataTypes } from "sequelize";

export const GAME_DEFINITION = {
  uuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  firstPlayerNickname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  secondPlayerNickname: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  winner: {
    type: Sequelize.INTEGER,
  },
  grid: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
};
