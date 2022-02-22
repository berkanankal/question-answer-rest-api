const mongoose = require("mongoose");

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [10, "Title must be at least 10 characters long"],
    unique: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [20, "Content must be at least 20 characters long"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: String,
});
