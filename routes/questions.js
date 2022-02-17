const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("questions home page");
});
router.get("/delete", (req, res, next) => {
  res.send("questions delete page");
});

module.exports = router;
