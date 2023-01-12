// import models
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment")

// user to blog
User.hasMany(Blog, {
    foreignKey: 'user_id',
});
Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

// user to comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// blog to comment
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

// export
module.exports = { User, Blog, Comment };