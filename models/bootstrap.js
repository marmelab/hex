const DB_PARAMETERS = {
  dialect: "sqlite",
  storage: "./var/data.sqlite",
};

/**
 * InitDatabase
 */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_PARAMETERS);

const { GAME_DEFINITION } = require("./games/game");
sequelize.define("game", GAME_DEFINITION);

sequelize.sync();
