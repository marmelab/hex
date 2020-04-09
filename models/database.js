import { Sequelize } from "sequelize";

const { DB_PARAMETERS } = require("./bootstrap");

let instance;

export const getDatabaseInstance = () => {
  if (instance) {
    return instance;
  }

  instance = new Sequelize(DB_PARAMETERS);
  return instance;
};
