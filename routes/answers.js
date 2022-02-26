const express = require("express");
const { addNewAnswerToQuestion } = require("../controllers/answers");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addNewAnswerToQuestion);

module.exports = router;
