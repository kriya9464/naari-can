const mongoose = require('mongoose')


const WorkSchema = new mongoose.Schema({
  jobDescription: String,
  pay:String,
  address: String,
  contactNum: String,
  email:String,
  
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

module.exports = mongoose.model("Works", WorkSchema);