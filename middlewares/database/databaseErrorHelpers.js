const User = require("../../models/User");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

const CustomError = require("../../helpers/error/CustomError");
const asyncHandler = require("express-async-handler");

const checkUserExist = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  return next();
});

const checkQuestionExist = asyncHandler(async (req, res, next) => {
  const id = req.params.id || req.params.question_id;

  const question = await Question.findById(id);

  if (!question) {
    return next(new CustomError("Question not found", 404));
  }

  return next();
});

const checkQuestionAndAnswerExist = asyncHandler(async (req, res, next) => {
  const { question_id, answer_id } = req.params;

  const answer = await Answer.findOne({
    _id: answer_id,
    question: question_id,
  });

  if (!answer) {
    return next(
      new CustomError("Answer not found with associated with this question")
    );
  }

  return next();
});

module.exports = {
  checkUserExist,
  checkQuestionExist,
  checkQuestionAndAnswerExist,
};
