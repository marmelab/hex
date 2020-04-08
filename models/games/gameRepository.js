import { getDatabaseInstance } from "../database";

/**
 * This function returns an object used by Sequelize to initialize the table.
 *
 * @returns Object gameTable
 */
export function getGameRepository() {
  const sequelize = getDatabaseInstance();
  const { GAME_DEFINITION } = require("./game");
  return sequelize.define("game", GAME_DEFINITION);
}
