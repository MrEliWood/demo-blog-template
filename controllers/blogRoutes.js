// import modules and packages
const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

// GET all blogs
router.get("/", (req, res) => {

    Blog.findAll({
            include: { all: true, nested: true }
        })
        .then(dbBlogs => {
            res.json(dbBlogs);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// GET one blog
router.get("/:id", (req, res) => {

    Blog.findByPk(req.params.id, {
            include: { all: true, nested: true }
        })
        .then(dbBlog => {
            res.json(dbBlog);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// POST new blog
router.post("/", (req, res) => {

    console.log(req.session.user.id)

    if (!req.session.user) {
        return res.redirect("/login");
    };
    
    Blog.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user.id
        })
        .then(newBlog => {
            res.json(newBlog);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// PUT blog update
router.put("/:id", (req, res) => {

    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
        })
        .then(updatedBlog => {
            res.json(updatedBlog);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// DELETE a blog
router.delete("/:id", (req, res) => {

    Blog.destroy({
        where: {
            id: req.params.id
        }
        })
        .then(deletedBlog => {
            res.json(deletedBlog);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// export
module.exports = router;