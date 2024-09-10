const express = require("express");
const router = express.Router();
const validator = require("./validator");
const controller = require("./controller");

router.post(
  "/register",
  validator.registerValidator(),
  controller.validate,
  controller.register
);

router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
