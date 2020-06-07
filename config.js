const Sequelize = require("sequelize");
const connectionURI = process.env.DATABASE_URL

/*
options: {
		define: {
			timestamps: false,
			freezeTableName: true
    	}
    }/*,
	dialect: 'postgres',
	dialectOptions: {
		ssl: false
	}
*/
const options = {
	define: {
		timestamps: false,
		freezeTableName: true,
		dialect: 'postgres',
		ssl: true
	}
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
		},
	},
}

const db = new Sequelize(connectionURI, options);

/*db.options = {
	define: {
		timestamps: false,
		freezeTableName: true
	}
}*/

module.exports = db;