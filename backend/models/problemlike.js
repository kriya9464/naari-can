const mongoose = require("mongoose");

const ProblemLikeSchema = new mongoose.Schema({
  //answer: String,
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problems",
  },

  user: Object,
});

module.exports = mongoose.model("problemLikes", ProblemLikeSchema);