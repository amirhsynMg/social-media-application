const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async likePost(req, res) {
    // finding user
    const user = await this.User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    // finding post
    const postIndex = user.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    const post = user.post[postIndex];
    if (!post) {
      return res.status(400).json({ message: "post not found", data: null });
    }
    // checking token
    const token = await jwt.decode(req.body.token, config.get("jwt_key"));
    if (!token) {
      return res
        .status(400)
        .json({ message: "user has no access", data: null });
    }

    //checking if user has already liked the post
    const likedUser = await this.Likes.findOne({ userId: token._id });
    const dislike = await this.Likes.deleteOne({ userId: token._id });
    if (likedUser) {
      return res
        .status(400)
        .json({ message: "you have disliked the post", data: null });
    }
    // like the post
    const like = await new this.Likes({
      userId: token._id,
      postId: req.params.postId,
    });
    await like.save();
    res.status(200).json({ message: "like was successful", data: like });
  }

  async getLikes(req, res) {
    // finding user
    const user = await this.User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    // finding post
    const postIndex = user.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    const post = user.post[postIndex];
    if (!post) {
      return res.status(400).json({ message: "post not found", data: null });
    }
    // checking token
    const token = await jwt.decode(req.body.token, config.get("jwt_key"));
    if (!token) {
      return res
        .status(400)
        .json({ message: "user has no access", data: null });
    }
    // finding liked users
    const users = await this.Likes.find({ postId: req.params.postId });
    if (!users) {
      return res
        .status(400)
        .json({ message: "post does not have any likes", data: null });
    }
    res.status(200).json({ message: "liked users", data: users });
  }
})();
