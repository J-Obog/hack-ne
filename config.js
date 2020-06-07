//require('dotenv').config();
const Sequelize = require('sequelize');
const connectionURI = process.env.DATABASE_URL;

const opts = {
  dialect: 'postgres',
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const db = new Sequelize(connectionURI, opts);

module.exports = db;
