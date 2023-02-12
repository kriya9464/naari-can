const mongoose = require("mongoose");

const ProblemCommentSchema = new mongoose.Schema({
  comment: String,
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problems",
  },

  user: Object,
});

module.exports = mongoose.model("problemComments", ProblemCommentSchema);