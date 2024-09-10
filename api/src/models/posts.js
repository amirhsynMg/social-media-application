const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  descs: { type: String, required: true },
  img: { type: String, required: true },
  // comment
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  // likes
  likes: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
});
userSchema.plugin(timestamp);

const Post = mongoose.model("Post", userSchema);

module.exports = Post;
