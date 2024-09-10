const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  img: { type: String, required: true },
});
userSchema.plugin(timestamp);

const Story = mongoose.model("Story", userSchema);

module.exports = Story;
