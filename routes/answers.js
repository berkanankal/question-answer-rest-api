const express = require("express");
const { getAllAnswers } = require("../controllers/answers");

const router = express.Router({ mergeParams: true });

router.get("/", getAllAnswers);

module.exports = router;
