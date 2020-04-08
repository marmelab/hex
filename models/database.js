import { Sequelize } from "sequelize";

export function getDatabaseInstance() {
  /* @todo: Extract DB parameters in config file */
  return new Sequelize({
    dialect: "sqlite",
    storage: "./var/data.sqlite",
  });
}
