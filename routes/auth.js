const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("auth home page");
});
router.get("/register", (req, res, next) => {
  res.send("auth register page");
});

module.exports = router;
