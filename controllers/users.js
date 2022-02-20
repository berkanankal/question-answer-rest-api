const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    data: users,
  });
});

const getSingleUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = { getAllUsers, getSingleUser };
