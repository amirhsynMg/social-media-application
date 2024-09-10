const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/createPost", controller.createPost);
router.get("/getPost/:userId", controller.getPosts);
router.put("/updatePost/:postId", controller.updatePost);
router.delete("/deletePost/:postId", controller.deletePost);

module.exports = router;
