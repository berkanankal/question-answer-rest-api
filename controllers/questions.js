const Question = require("../models/Question");
const asyncHandler = require("express-async-handler");

const getAllQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.find();

  return res.status(200).json({
    success: true,
    data: questions,
  });
});

const getSingleQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const askNewQuestion = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const question = await Question.create({
    ...data,
    user: req.user.id,
  });

  return res.status(201).json({
    success: true,
    data: question,
  });
});

module.exports = { getAllQuestions, getSingleQuestion, askNewQuestion };
