// import modules and packages
const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models/");
const bcrypt = require("bcrypt");

// GET all users
router.get("/", (req, res) => {

    User.findAll({
            include: { all: true, nested: true }
        })
        .then(dbUsers => {
            res.json(dbUsers);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// GET one user
router.get("/:id", (req, res) => {

    User.findByPk(req.params.id, {
            include: { all: true, nested: true }
        })
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// POST new user
router.post("/", (req, res) => {

    User.create(req.body)
        .then(newUser => {
            req.session.user = {
                id: newUser.id,
                username: newUser.username
            }
            res.json(newUser);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// PUT user update
router.put("/:id", (req, res) => {

    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// DELETE a user
router.delete("/:id", (req, res) => {

    User.destroy({
        where: {
            id: req.params.id
        }
        })
        .then(delUser => {
            res.json(delUser);
        })
        .catch(err => {
            res.status(500).json({ msg: "an error occured", err });
        });

});

// login
router.post("/login", (req, res) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(foundUser => {

            // validate username
            if (!foundUser) {
                return res.status(400).json({ msg: "Incorrect username or password." })
            }

            // validate password
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.user = {
                    id: foundUser.id,
                    username: foundUser.username
                };
                return res.json(foundUser);
            } else {
                return res.status(400).json({ msg: "Incorrect username or password." });
            };

        })
        .catch(err => {
            res.status(500).json({ msg: "An error occured!", err });
        });

});

// export
module.exports = router;