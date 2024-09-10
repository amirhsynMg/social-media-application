const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async createPost(req, res) {
    const token = jwt.decode(req.body.token);

    const user = await this.User.findById(token._id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "user does not exist", data: null });
    }

    user.post.push(req.body);
    await user.save();

    res.status(200).json({ message: "post created", data: user.post });
  }

  async getPosts(req, res) {
    let user = await this.User.findById(req.params.userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "user does not exist", data: null });
    }

    res.status(200).json({ message: "user posts", data: user.post });
  }
  async updatePost(req, res) {
    const token = jwt.decode(req.body.token);
    const user = await this.User.findById(token._id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "user does not exist", data: null });
    }

    const postIndex = user.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    console.log(postIndex);
    if (postIndex === null) {
      return res
        .status(400)
        .json({ message: "post does not exist", data: null });
    }
    user.post[postIndex] = req.body;

    await user.save();
    res
      .status(200)
      .json({ message: "post successfully updated", data: user.post });
  }
  async deletePost(req, res) {
    const token = jwt.decode(req.body.token);
    const user = await this.User.findById(token._id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "user does not exist", data: null });
    }
    const postIndex = user.post.findIndex(
      (obj) => obj._id == req.params.postId
    );
    if (postIndex === null) {
      return res
        .status(400)
        .json({ message: "post does not exist", data: null });
    }
    user.post.splice(postIndex, 1);

    await user.save();
    res
      .status(200)
      .json({ message: "post successfully deleted", data: user.post });
  }
})();
