const mongoose = require("mongoose");

const BlogLikeSchema = new mongoose.Schema({
  //answer: String,
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
  },

  user: Object,
});

module.exports = mongoose.model("blogLikes", BlogLikeSchema);