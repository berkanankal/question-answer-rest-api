const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const bcrypt = require("bcryptjs");

const register = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const user = await User.create(data);

  res.status(200).json({
    success: true,
    data: user,
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!(user && bcrypt.compareSync(password, user.password))) {
    return next(new CustomError("Please check your credentials", 400));
  }

  const { COOKIE_EXPIRE, NODE_ENV } = process.env;

  const token = user.getTokenFromUserModel();

  res
    .status(200)
    .cookie("access_token", `Bearer: ${token}`, {
      expires: new Date(Date.now() + COOKIE_EXPIRE * 1000),
      httpOnly: true,
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
      },
      access_token: `Bearer: ${token}`,
    });
});

const getLoggedInUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

const logout = (req, res, next) => {
  res.status(200).clearCookie("access_token").json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = { register, login, getLoggedInUser, logout };
