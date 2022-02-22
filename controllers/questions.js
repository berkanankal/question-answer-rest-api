const Question = require("../models/Question");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const askNewQuestion = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const question = await Question.create({
    ...data,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: question,
  });
});

module.exports = { askNewQuestion };
