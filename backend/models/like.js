const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  //answer: String,
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers",
  },
/*   createdAt: {
    type: Date,
    default: Date.now(),
  }, */
  user: Object,
});

module.exports = mongoose.model("Likes", LikeSchema);