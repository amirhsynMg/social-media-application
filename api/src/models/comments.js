const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  descs: { type: String, required: true },
});
userSchema.plugin(timestamp);

const Comment = mongoose.model("Comment", userSchema);

module.exports = Comment;
