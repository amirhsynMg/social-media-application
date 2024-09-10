const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  followerUserId: [{ type: String, required: true }],
  followedUserId: [{ type: String, required: true }],
});
userSchema.plugin(timestamp);

const RelationShip = mongoose.model("RelationShip", userSchema);

module.exports = RelationShip;
