// import modules and packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// define class extension
class Comment extends Model { };

// define model properties
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        }
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Blogs',
            key: 'id',
        }
    }
}, {
    sequelize
});

// export
module.exports = Comment;