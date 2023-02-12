const express = require("express");
const router = express.Router();
//const mongodb = require('mongodb');

const blogDB = require("../models/blog");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await blogDB
      .create({
        blogContent: req.body.blogContent,
        imgUrl: req.body.imgUrl,
        
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Blog added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding blog",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await blogDB
      .aggregate([
        {
          
        
          $lookup: {
            from: "bloglikes", //collection to join
            localField: "_id", //field from input document
            foreignField: "blogId",
            as: "All_bloglikes", //output array field
          },
        },{
          $lookup:{
            from: "blogcomments", //collection to join
            localField: "_id", //field from input document
            foreignField: "blogId",
            as: "All_blogcomments", //output array field
          },
         
        }
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the answer details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

/* router.get('/',(req,res)=>{
  blogDB.find((err,data)=>{
    if(err){
      return res.status(500).send(err)
    }else{
      return res.status(200).send(data)
    }
  })
}) */


router.post('/delete', function(req, res) {
  blogDB.findByIdAndDelete((req.body.id), 
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
          console.log("Data Deleted!");
      }
  });  
});





module.exports = router;