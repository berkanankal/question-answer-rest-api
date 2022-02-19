const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
  logout,
  imageUpload,
  forgotPassword,
} = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../helpers/libraries/multer");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getAccessToRoute, getLoggedInUser);
router.get("/logout", getAccessToRoute, logout);
router.post("/forgotpassword", forgotPassword);
router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);

module.exports = router;
