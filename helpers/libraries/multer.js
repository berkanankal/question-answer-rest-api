const multer = require("multer");
const path = require("path");
const CustomError = require("../error/CustomError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "public/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const savedImage = `image_${req.user.id}.${extension}`;
    req.savedImage = savedImage;

    cb(null, savedImage);
  },
});

const fileFilter = (req, file, cb) => {
  allowedTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid image file", 400), false);
  }

  return cb(null, true);
};

const profileImageUpload = multer({ storage, fileFilter });

module.exports = profileImageUpload;
