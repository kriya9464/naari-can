const mongoose = require("mongoose");

const BlogCommentSchema = new mongoose.Schema({
  comment: String,
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
  },

  user: Object,
});

module.exports = mongoose.model("blogComments", BlogCommentSchema);