const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err, req, res, next) => {
  let customErr = err;
  console.log(err);

  if (err.name === "SyntaxError") {
    customErr = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customErr = new CustomError(err.message, 400);
  }
  if (err.code === 11000) {
    customErr = new CustomError(
      "Duplicate Key Error: Please Check Your Info",
      400
    );
  }

  res.status(customErr.statusCode || 500).json({
    success: false,
    message: customErr.message || "Internal Server Error",
  });
};

module.exports = customErrorHandler;
