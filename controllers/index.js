// import modules and packages
const express = require('express');
const router = express.Router();

// define routes
const frontEnd = require("./frontEndRoutes");
router.use("/", frontEnd);

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

const blogRoutes = require("./blogRoutes");
router.use("/blogs", blogRoutes);

const commentRoutes = require("./commentRoutes");
router.use("/comments", commentRoutes);

// export
module.exports = router;