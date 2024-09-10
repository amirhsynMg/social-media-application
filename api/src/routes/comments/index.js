const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/addComment/:postId", controller.addComment);
router.get("/getComments/:userId", controller.getComments);
router.put(
  "/updateComments/:userId/:postId/:commentId",
  controller.updateComments
);
router.delete("/deleteComments/:userId/:postId/:commentId", controller.deleteComments);

module.exports = router;
