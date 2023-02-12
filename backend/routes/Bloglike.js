const express = require("express");
const router = express.Router();

const blog_likeDB = require("../models/bloglike");

router.post("/", async (req, res) => {
  try {
    await blog_likeDB
      .create({
        blogId: req.body.blogId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "like added successfully",
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
  blog_likeDB.findByIdAndDelete((req.body.id), 
function(err, data) {
    if(err){
        console.log(err);
    }
    else{
        res.send(data);
        console.log("unlike");
    }
});  
});




module.exports = router;