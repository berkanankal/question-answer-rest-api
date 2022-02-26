const asyncHandler = require("express-async-handler");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

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

const getAllAnswersByQuestion = asyncHandler(async (req, res, next) => {
  const { question_id } = req.params;

  // const answers = await Answer.find({ question: question_id });

  const question = await Question.findById(question_id).populate("answers");
  const answers = question.answers;

  return res.status(200).json({
    success: true,
    count: answers.length,
    data: answers,
  });
});

const getSingleAnswerByQuestion = asyncHandler(async (req, res, next) => {
  const { answer_id } = req.params;

  const answer = await Answer.findById(answer_id)
    .populate({
      path: "question",
      select: "title content user",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .populate({
      path: "user",
      select: "name profile_image",
    });

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswerByQuestion,
};
