const express = require("express");
const {
  getAllQuestions,
  getSingleQuestion,
  askNewQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  dislikeQuestion,
} = require("../controllers/questions");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");
const answers = require("./answers");

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put(
  "/:id",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/dislike",
  [getAccessToRoute, checkQuestionExist],
  dislikeQuestion
);
router.use("/:question_id/answers", checkQuestionExist, answers);

module.exports = router;
