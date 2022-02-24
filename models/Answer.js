const mongoose = require("mongoose");

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

module.exports = mongoose.model("Answer", AnswerSchema);
