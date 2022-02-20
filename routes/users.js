const express = require("express");
const { getAllUsers, getSingleUser } = require("../controllers/users");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getSingleUser);

module.exports = router;
