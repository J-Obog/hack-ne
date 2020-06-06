const { DataTypes } = require("sequelize");
const sequelize = require("../config.js");


const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true, 
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})



module.exports = User; 
