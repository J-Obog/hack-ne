const { DataTypes } = require("sequelize");
const sequelize = require("../config.js");

/*Email     Email
Sex     Enum  
Native Language   String
Country   String*/

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
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  }
})



module.exports = User; 
