const express = require("express");

const router = express.Router();

const upload = require("../../middlewares/uploadAvatar");

const avatarControll = require("../../controllApi/avatar");

const auth = require("../../middlewares/auth");

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  avatarControll.uploadAvatar
);

module.exports = router;
