import { getDatabaseInstance } from "../database";
import { GAME_DEFINITION } from "./game";

/**
 * This function returns an object used by Sequelize to initialize the table.
 *
 * @returns Object gameTable
 */
export function getGameRepository() {
  const sequelize = getDatabaseInstance();

  return sequelize.define("game", GAME_DEFINITION);
}

export function getGameByUuid(uuid) {
  return getGameRepository().findOne({
    where: {
      uuid: uuid,
    },
  });
}
