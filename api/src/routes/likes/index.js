const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/likePost/:userId/:postId", controller.likePost);
router.get("/getLikes/:userId/:postId", controller.getLikes);

module.exports = router;
