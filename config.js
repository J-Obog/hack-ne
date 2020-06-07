const Sequelize = require("sequelize");
const connectionURI = process.env.DATABASE_URL

const opts = {
    define: {
    	timestamps: false,
        freezeTableName: true
    }
}

const db = new Sequelize(connectionURI, opts)

module.exports = db;