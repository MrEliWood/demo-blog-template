// import modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define class extension
class Blog extends Model { };

// define model properties
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "New Blog Post"
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
}, {
    sequelize
});

// export
module.exports = Blog;