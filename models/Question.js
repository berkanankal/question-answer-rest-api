const mongoose = require("mongoose");
const slugify = require("slugify");

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
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

QuestionSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

QuestionSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }

  this.slug = this.makeSlug();
  return next();
});

module.exports = mongoose.model("Question", QuestionSchema);
