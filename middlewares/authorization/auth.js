const jwt = require("jsonwebtoken");
const CustomError = require("../../helpers/error/CustomError");
const Question = require("../../models/Question");
const asyncHandler = require("express-async-handler");

const getAccessToRoute = (req, res, next) => {
  const access_token = req.headers.authorization;

  if (!(access_token && access_token.startsWith("Bearer:"))) {
    return next(
      new CustomError("You are not authorized to access this page", 401)
    );
  }

  const token = access_token.split(" ")[1];

  const { JWT_SECRET_KEY } = process.env;

  jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this page", 401)
      );
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    };

    return next();
  });
};

const getAdminAccess = (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    return next(new CustomError("Only admins can access this page", 403));
  }

  return next();
};

const getQuestionOwnerAccess = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);

  if (question.user !== userId) {
    return next(
      new CustomError("Only question owner can access this page", 403)
    );
  }

  return next();
});

module.exports = { getAccessToRoute, getAdminAccess, getQuestionOwnerAccess };
