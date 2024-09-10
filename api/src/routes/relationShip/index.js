const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/follow/:userId", controller.followUser);
router.put("/unFollow/:userId", controller.unFollowUser);

module.exports = router;
