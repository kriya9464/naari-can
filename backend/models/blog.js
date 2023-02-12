const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
  blogContent: String,
  imgUrl:String,
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

module.exports = mongoose.model("Blogs", BlogSchema);