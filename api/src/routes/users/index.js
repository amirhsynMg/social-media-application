const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/searchUser/:userName", controller.getUser);

module.exports = router;
