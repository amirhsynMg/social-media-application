const mongoose = require("mongoose");
const debug = require("debug")("app:main");
const config = require("config");

module.exports = function () {
  mongoose
    .connect(config.get("db.address"))
    .then(() => {
      console.log("connected to db");
    })
    .catch(() => {
      console.log("could not connect to db");
    });
};
