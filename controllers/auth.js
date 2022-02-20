const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const bcrypt = require("bcryptjs");
const sendEmail = require("../helpers/libraries/nodemailer");

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

  try {
    const resetPasswordUrl = `${process.env.API_URL}/api/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
    `;

    await sendEmail({
      from: process.env.SMTP_EMAIL, // sender address
      to: resetEmail, // list of receivers
      subject: "Reset Password Token", // Subject line
      html: emailTemplate, // html body
    });
    res.status(200).json({
      success: true,
      message: "Token sent to your email",
    });
  } catch (error) {
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    user.save();

    return next(new CustomError("Email Could Not Be Sent", 500));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { newPassword } = req.body;

  if (!resetPasswordToken) {
    return next(new CustomError("Please provide a valid token", 400));
  }

  if (!newPassword) {
    return next(new CustomError("Please provide a new password", 400));
  }

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Invalid Token or Session Expired", 404));
  }

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  user.save();

  res.status(200).json({
    success: true,
    message: "Reset Password Successful",
  });
});

module.exports = {
  register,
  login,
  getLoggedInUser,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
};
