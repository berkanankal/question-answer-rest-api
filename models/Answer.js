const mongoose = require("mongoose");
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
  likeCount: {
    type: Number,
    default: 0,
  },
});

AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) return next();
  const question = await Question.findById(this.question);
  question.answers.push(this._id);
  question.answerCount = question.answers.length;
  await question.save();
});

AnswerSchema.post("remove", async function () {
  const question = await Question.findById(this.question);
  const answerIndex = question.answers.indexOf(this._id);
  question.answers.splice(answerIndex, 1);
  question.answerCount = question.answers.length;
  await question.save();
});

module.exports = mongoose.model("Answer", AnswerSchema);
