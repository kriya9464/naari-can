const express = require("express");
const router = express.Router();
//const mongodb = require('mongodb');

const problemDB = require("../models/problem");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await problemDB
      .create({
        problemContent: req.body.problemContent,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "post added successfully",
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
      message: "Error while adding post",
    });
  }
});


router.get("/", async (req, res) => {
    try {
      await problemDB
        .aggregate([
          {
            $lookup: {
              from: "problemlikes", //collection to join
              localField: "_id", //field from input document
              foreignField: "problemId",
              as: "All_problemlikes", //output array field
            },
          },
          {
            $lookup: {
              from: "problemcomments", //collection to join
              localField: "_id", //field from input document
              foreignField: "problemId",
              as: "All_problemcomments", //output array field
            },
          },
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
    problemDB.find((err,data)=>{
      if(err){
        return res.status(500).send(err)
      }else{
        return res.status(200).send(data)
      }
    })
  }) */


  router.post('/delete', function(req, res) {
    problemDB.findByIdAndDelete((req.body.id), 
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


