require("./games/game");

const DB_PARAMETERS = {
  dialect: "sqlite",
  storage: ":memory:",
};

const { GAME_DEFINITION } = require("./games/game");

/**
 * InitDatabase
 */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_PARAMETERS);

sequelize.define("game", GAME_DEFINITION);
sequelize.sync();

module.exports = { DB_PARAMETERS };