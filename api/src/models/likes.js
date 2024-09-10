const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
});
userSchema.plugin(timestamp);

const Like = mongoose.model("Like", userSchema);

module.exports = Like;
