const express = require("express");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswerByQuestion,
  editAnswer,
  deleteAnswer,
} = require("../controllers/answers");
const {
  getAccessToRoute,
  getAnswerOwnerAccess,
} = require("../middlewares/authorization/auth");
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
router.put(
  "/:answer_id",
  [getAccessToRoute, checkQuestionAndAnswerExist, getAnswerOwnerAccess],
  editAnswer
);
router.delete(
  "/:answer_id",
  [getAccessToRoute, checkQuestionAndAnswerExist, getAnswerOwnerAccess],
  deleteAnswer
);

module.exports = router;
