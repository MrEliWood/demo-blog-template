// import modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

// define class extension
class User extends Model { };

// define model properties
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
}, {
    // hash password
    hooks: {
        beforeCreate: async userdata => {
            userdata.password = await bcrypt.hash(userdata.password, 10);
            return userdata;
        }
    },
    sequelize
});

module.exports = User;