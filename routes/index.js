const express = require("express");
const auth = require("./auth");
const questions = require("./questions");
const users = require("./users");
const admin = require("./admin");

const router = express.Router();

router.use("/auth", auth);
router.use("/questions", questions);
router.use("/users", users);
router.use("/admin", admin);

module.exports = router;
