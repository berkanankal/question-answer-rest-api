const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
  logout,
} = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getAccessToRoute, getLoggedInUser);
router.get("/logout", getAccessToRoute, logout);

module.exports = router;
