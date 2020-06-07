require('dotenv').config();
const Sequelize = require('sequelize');
const connectionURI = process.env.DATABASE_URL;

const opts = {
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
};

const db = new Sequelize(connectionURI, opts);

module.exports = db;
