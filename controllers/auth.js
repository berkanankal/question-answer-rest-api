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
      expires: new Date(Date.now() + COOKIE_EXPIRE * 1000 * 60),
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

const imageUpload = asyncHandler(async (req, res, next) => {
  if (!req.savedImage) {
    return next(new CustomError("Please upload an image", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedImage,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Profile image upload successful",
    data: user,
  });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { resetEmail } = req.body;
  const { RESET_PASSWORD_EXPIRE } = process.env;

  const user = await User.findOne({ email: resetEmail });

  if (!user) {
    return next(new CustomError("There is no user with that email", 400));
  }

  const resetPasswordToken = user.getResetPasswordTokenFromUserModel();

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
  user.save();

  res.status(200).json({
    success: true,
    message: "Token sent to your email",
  });
});

module.exports = {
  register,
  login,
  getLoggedInUser,
  logout,
  imageUpload,
  forgotPassword,
};
