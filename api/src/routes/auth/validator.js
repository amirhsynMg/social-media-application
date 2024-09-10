const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("email must be valid"),
      check("name").notEmpty().withMessage("name cant be empty"),
      check("userName").notEmpty().withMessage("username cant be empty"),
      check("password").notEmpty().withMessage("password cant be empty"),
    ];
  }
  loginValidator() {
    return [
      check("userName").isEmail().withMessage("email must be valid"),
      check("password").not().isEmpty().withMessage("password cant be empty"),
    ];
  }
})();
