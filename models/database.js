import { initDatabase } from "./bootstrap";

let instance;

export const getDatabaseInstance = () => {
  if (instance) {
    return instance;
  }

  return initDatabase();
};
