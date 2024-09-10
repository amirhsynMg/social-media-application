const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  name: { type: String },
  coverPic: { type: String },
  profilePic: { type: String },
  city: { type: String },
  website: { type: String },
  // post
  post: [
    {
      descs: { type: String, required: true },
      img: { type: String, required: true },
      // comment
      comment: [
        {
          descs: { type: String },
          commentedUserId: { type: String },
          date: { type: String, default: Date.now },
        },
      ],
      // likes
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    },
  ],
  // comment
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  // story
  story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
  // relationShips
  followers: [{ type: String }],
  followings: [{ type: String }],
  //likes
  likes: { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
});
userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

module.exports = User;
