require('dotenv').config();

const Sequelize = require("sequelize");
const connectionURI = process.env.CONNECTION_URI

const opts = {
    define: {
    	timestamps: false,
        freezeTableName: true
    }
}

const db = new Sequelize(connectionURI, opts)

module.exports = db;