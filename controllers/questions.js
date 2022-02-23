const Question = require("../models/Question");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

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
  let { content, title } = req.body;

  if (!content || !title) {
    return next(new CustomError("Please provide all fields", 400));
  }

  content = content.trim();
  title = title.trim();

  const question = await Question.create({
    content,
    title,
    user: req.user.id,
  });

  return res.status(201).json({
    success: true,
    data: question,
  });
});

const editQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return next(new CustomError("Please provide all fields", 400));
  }

  let question = await Question.findById(id);

  question.title = title.trim();
  question.content = content.trim();
  question = await question.save();

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await Question.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
});

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  askNewQuestion,
  editQuestion,
  deleteQuestion,
};
