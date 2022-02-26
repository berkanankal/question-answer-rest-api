const express = require("express");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
} = require("../controllers/answers");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);

module.exports = router;
