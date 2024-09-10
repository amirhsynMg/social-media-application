const express = require("express");
const router = express.Router();
// routers
const authRouter = require("./auth/index");
const userRouter = require("./users/index");
const postsRouter = require("./posts/index");
const likesRouter = require("./likes/index");
const commentsRouter = require("./comments/index");
const relationShip = require("./relationShip/index");

const error = require("../middlewares/errors");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postsRouter);
router.use("/likes", likesRouter);
router.use("/comments", commentsRouter);
router.use("/relationShip", relationShip);
router.use(error);
module.exports = router;
