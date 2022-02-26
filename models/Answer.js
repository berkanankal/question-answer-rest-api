const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Question = require("../models/Question");

const { Schema } = mongoose;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [20, "Content must be at least 20 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: [true, "Question is required"],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) return next();

  const question = await Question.findById(this.question);
  question.answers.push(this._id);
  await question.save();
});

module.exports = mongoose.model("Answer", AnswerSchema);
