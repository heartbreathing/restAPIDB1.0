const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv")

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: "postgres",
  }
);

const TodoTable = sequelize.define('TodoTable', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Model synced with database!");
  })
  .catch((error) => {
    console.error("Error syncing model with database:", error);
  });

module.exports = {
  TodoTable
};
