import { GAME_DEFINITION } from "./games/game";
import { Sequelize } from "sequelize";

export const DB_PARAMETERS = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.POSTGRESQL_ADDON_URI;
  } else {
    return {
      dialect: "sqlite",
      storage: "./var/data.sqlite",
    };
  }
};

export const initDatabase = () => {
  const sequelize = new Sequelize(DB_PARAMETERS());

  sequelize.define("game", GAME_DEFINITION);
  sequelize.sync();

  return sequelize;
};
