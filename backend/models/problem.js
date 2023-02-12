const mongoose = require('mongoose')


const ProblemSchema = new mongoose.Schema({
  problemContent: String,
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
/*   answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  }, */
  user: Object,
});

module.exports = mongoose.model("Problems", ProblemSchema);