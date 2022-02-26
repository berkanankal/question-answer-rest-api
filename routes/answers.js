const express = require("express");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswerByQuestion,
} = require("../controllers/answers");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswersByQuestion);
router.get(
  "/:answer_id",
  checkQuestionAndAnswerExist,
  getSingleAnswerByQuestion
);

module.exports = router;
