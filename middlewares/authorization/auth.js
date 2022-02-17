const jwt = require("jsonwebtoken");
const CustomError = require("../../helpers/error/CustomError");

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
    };

    return next();
  });
};

module.exports = { getAccessToRoute };
