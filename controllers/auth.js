const User = require("../models/User");

const register = async (req, res, next) => {
  const data = req.body;

  const user = await User.create(data);

  res.status(200).json({
    success: true,
    data: user,
  });
};

module.exports = { register };
