// import modules and packages
const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// home page route
router.get("/", (req,res) => {

    Blog.findAll({
            include: { all: true, nested: true }
        })
        .then(blogs => {
            const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
            const loggedIn = req.session.user ? true : false;

            res.render("home", { blogs: hbsBlogs, loggedIn, username: req.session.user?.username });
        });

});

// login route
router.get("/login", (req,res) => {

    if(req.session.user){
        return res.redirect("/dashboard");
    };

    res.render("login");

});

// logout route
router.get("/logout", (req,res) => {

    req.session.destroy();
    res.redirect("/");

});

// signup route
router.get("/signup", (req,res) => {

    if(req.session.user){
        return res.redirect("/dashboard");
    };

    res.render("signup");

});

// dashboard route
router.get("/dashboard", (req,res) => {

    if(!req.session.user){
        return res.redirect("/login");
    };

    Blog.findAll({
            where: { user_id: req.session.user.id },
            include: { all: true, nested: true }
        })
        .then(blogs => {
            const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
            const loggedIn = req.session.user ? true : false;

            res.render("dashboard", { blogs: hbsBlogs, loggedIn, username: req.session.user?.username });
        });

});

// export
module.exports = router;