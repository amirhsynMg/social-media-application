const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getUser(req, res) {
    const user = await this.User.findOne({ userName: req.params.userName });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    const result = _.pick(user, [
      "_id",
      "userName,email",
      "name",
      "followers",
      "followings",
    ]);
    res.status(200).json({ message: "user found", data: result });
  }
})();
