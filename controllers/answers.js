const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const Answer = require("../models/Answer");

const addNewAnswerToQuestion = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { question_id } = req.params;
  const user_id = req.user.id;

  const answer = await Answer.create({
    content,
    user: user_id,
    question: question_id,
  });

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = { addNewAnswerToQuestion };
