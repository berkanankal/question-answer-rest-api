const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user.role === "admin") {
    return next(new CustomError("You can't block an admin user", 400));
  }

  user.isBlocked = !user.isBlocked;
  user.save();

  return res.status(200).json({
    success: true,
    message: "Blocked-Unblocked user",
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user.role === "admin") {
    return next(new CustomError("You can't delete an admin user", 400));
  }

  await user.remove();

  return res.status(200).json({
    success: true,
    message: "Deleted user",
  });
});

module.exports = { blockUser, deleteUser };
