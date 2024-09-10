const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async register(req, res) {
    // CHECK IF USER EXISTS
    console.log(req.body.userName);
    let userExists = await this.User.findOne({ userName: req.body.userName });
    if (userExists) {
      return res
        .status(409)
        .json({ data: null, message: "the user already exists" });
    }
    // CREATE A NEW USER
    //hash the password
    const salt = await bcrypt.genSalt(10);
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await new this.User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });
    await user.save();

    return res
      .status(200)
      .json({ data: user, message: "user has been created" });
  }

  async login(req, res) {
    const user = await this.User.findOne({ userName: req.body.userName });
    // CHECK IF USER EXISTS
    if (!user)
      return this.response({
        res,
        code: 400,
        data: null,
        message: "invalid username or password",
      });
    // COMPARE THE PASSWORD
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword)
      return this.response({
        res,
        data: null,
        code: 400,
        message: "invalid username or password",
      });
    // making a jwt and saving it into cookies
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    const userWithNoPassword = await this.User.findOne({
      userName: req.body.userName,
    }).select("-password");
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      message: "user successfully loggined",
      data: userWithNoPassword,
      token: token,
    });
  }
  async logout(req, res) {
    res
      .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ data: null, message: "user has been logged out" });
  }
})();
