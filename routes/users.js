const express = require("express");
const { getSingleUser } = require("../controllers/users");

const router = express.Router();

router.get("/:id", getSingleUser);

module.exports = router;
