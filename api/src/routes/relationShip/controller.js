const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async followUser(req, res) {
    // finding user
    const user = await this.User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    // finding user who wants to follow
    const token = await jwt.decode(req.body.token);
    if (!token) {
      return res
        .status(400)
        .json({ message: "user does not have access", data: null });
    }
    const followingUser = await this.User.findById(token._id);
    if (!followingUser) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    // check if user has already followed
    const followIndex = user.followers.findIndex((obj) => obj == token._id);
    if (followingUser._id == user.followers[followIndex]) {
      return res.status(400).json({ message: "you have  already followed" });
    }
    // adding follower
    user.followers.push(token._id);
    // adding to second users followings
    followingUser.followings.push(user._id);

    await user.save();
    await followingUser.save();
    res
      .status(200)
      .json({ message: "successfuly followed", data: user.followers });
  }
  async unFollowUser(req, res) {
    // finding user
    const user = await this.User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    // finding user who wants to follow
    const token = await jwt.decode(req.body.token);
    if (!token) {
      return res
        .status(400)
        .json({ message: "user does not have access", data: null });
    }
    const followingUser = await this.User.findById(token._id);
    if (!followingUser) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    // check if user has already followed
    const followerIndex = user.followers.findIndex((obj) => obj == token._id);
    const followingIndex = followingUser.followings.findIndex(
      (obj) => obj == req.params.userId
    );
    if (followingUser._id == user.followers[followerIndex]) {
      user.followers.splice(followerIndex, 1);
      followingUser.followings.splice(followingIndex, 1);
      await user.save();
      await followingUser.save();
      return res.status(400).json({ message: "successfully unfolowed" });
    }
    res.status(400).json({ message: "you have not followed" });
  }
})();
