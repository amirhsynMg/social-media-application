const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async addComment(req, res) {
    // finding user that has posted
    const userPosted = await this.User.findById(req.body.userId);

    if (!userPosted) {
      return res
        .status(400)
        .json({ message: "posted user does not exist", data: null });
    }
    // finding user that wants to comment
    const token = jwt.decode(req.body.token);
    const userCommented = await this.User.findById(token._id);

    if (!token) {
      return res
        .status(400)
        .json({ message: "user does not have access", data: null });
    }
    if (!userCommented) {
      return res
        .status(400)
        .json({ message: "commented user does not exist", data: null });
    }
    // adding comment on the post with comment id
    const postIndex = userPosted.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    userPosted.post[postIndex].comment.push({
      descs: req.body.descs,
      commentedUserId: userCommented._id,
    });

    const result = await userPosted.save();

    res.status(200).json({
      message: "comment Added",
      data: result.post,
    });
  }

  async getComments(req, res) {
    // finding user
    const user = await this.User.findById(req.params.userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "commented user does not exist", data: null });
    }
    let findcommentedUserId = [];
    user.post.forEach(function (element) {
      element.comment.forEach(function (childelement) {
        findcommentedUserId.push(childelement.commentedUserId);
      });
    });
    console.log(findcommentedUserId);
    let commentedUsers = [];

    for (let i = 0; i <= findcommentedUserId.length; i++) {
      let id = findcommentedUserId[0];
      let user = await this.User.findById(id).select({
        userName: 1,
        email: 1,
        _id: 1,
        name: 1,
      });
      commentedUsers.push(user);
    }
    console.log(commentedUsers);

    res.status(200).json({
      message: "user comments",
      data1: user.post,
      data2: commentedUsers,
    });
  }

  async updateComments(req, res) {
    // finding if commented user exist
    const token = jwt.decode(req.body.token, config.get("jwt_key"));
    if (!token) {
      return res
        .status(400)
        .json({ message: "user does not have access", data: null });
    }
    // finding the posted user and the post
    const postedUser = await this.User.findById(req.params.userId);
    const postIndex = postedUser.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    const post = postedUser.post[postIndex];
    if (!post) {
      return res
        .status(400)
        .json({ message: "post does not exist", data: null });
    }

    // finding the comment
    const commentIndex = post.comment.findIndex(
      (obj) => obj._id == req.params.commentId
    );
    console.log(commentIndex);
    const comment = post.comment[commentIndex];
    if (!comment) {
      return res
        .status(400)
        .json({ message: "comment does not exist", data: null });
    }
    if (token._id !== comment.commentedUserId) {
      return res
        .status(400)
        .json({ message: "post does not exist", data: null });
    }
    // checking the user wanting to update to be the same one who commented
    if (token._id != comment.commentedUserId) {
      return res
        .status(400)
        .json({ message: "user does not have access", data: null });
    }

    postedUser.post[postIndex].comment[commentIndex] = {
      descs: req.body.descs,
      commentedUserId: token._id,
    };
    const result = await postedUser.save();

    res.status(200).json({
      message: "comment successfully updated",
      data: result.post,
    });
  }
  async deleteComments(req, res) {
    // finding user
    const user = await this.User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        data: null,
      });
    }
    // finding post
    const postIndex = user.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    const post = user.post[postIndex];
    if (!post) {
      return res.status(400).json({
        message: "post not found",
        data: null,
      });
    }
    // finding comment
    const commentIndex = post.comment.findIndex(
      (obj) => obj._id == req.params.commentId
    );
    const comment = post.comment[commentIndex];
    if (!comment) {
      return res.status(400).json({
        message: "comment not found",
        data: null,
      });
    }

    user.post[postIndex].comment.splice(commentIndex, 1);
    console.log(user.post[postIndex].comment);
    await user.save();
    res
      .status(200)
      .json({
        message: "post successfully deleted",
        data: user.post[postIndex].comment,
      });
  }
})();
