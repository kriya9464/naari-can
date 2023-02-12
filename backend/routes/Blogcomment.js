const express = require("express");
const router = express.Router();

const blog_commentDB = require("../models/blogcomment");

router.post("/", async (req, res) => {
  try {
    await blog_commentDB
      .create({
        comment:req.body.comment,
        blogId: req.body.blogId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "comment added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding like",
    });
  }
});

router.post('/delete', function(req, res) {
    blog_commentDB.findByIdAndDelete((req.body.id), 
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
          console.log("comment Deleted!");
      }
  });  
});


module.exports = router;