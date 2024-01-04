import { Sequelize } from "sequelize";

const db = new Sequelize("db_sl", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
