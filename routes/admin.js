const express = require("express");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");

const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);

module.exports = router;
