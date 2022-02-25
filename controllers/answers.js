const getAllAnswers = (req, res, next) => {
  console.log(req.params);

  res.status(200).json({
    success: true,
  });
};

module.exports = { getAllAnswers };
