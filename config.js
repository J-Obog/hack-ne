const Sequelize = require("sequelize");
const connectionURI = process.env.PGRES_DB;

const db = new Sequelize(connectionURI, {
	pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;