const express = require("express");

const router = express.Router();

const { schemas } = require("../../models/user");

const { validate, auth } = require("../../middlewares");

const authController = require("../../controllApi/auth");
const jsonParse = express.json();

router.post(
  "/register",
  jsonParse,
  validate(schemas.registerSchema),
  authController.register
);

router.post(
  "/login",
  jsonParse,
  validate(schemas.loginSchema),
  authController.login
);

router.post("/logout", auth, authController.logout);

router.get("/current", auth, authController.current);

module.exports = router;
