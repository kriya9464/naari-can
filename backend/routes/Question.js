const express = require("express");
const router = express.Router();
//const mongodb = require('mongodb');

const questionDB = require("../models/Question");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        questionCategory: req.body.questionCategory,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
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
      message: "Error while adding question",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers", //collection to join
            localField: "_id", //field from input document
            foreignField: "questionId",
            as: "allAnswers", //output array field
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
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});


router.post('/delete', function(req, res) {
  questionDB.findByIdAndDelete((req.body.id), 
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


/* router.get('/delete/:id',(req, res) =>{
  questionDB.remove({_id:id},(err,data)=>{
    if(err){
      return res.status(500).send(err)
    }else{
      return res.status(200).send(data)
    }
  }) 
   
}); */

/* router.get('/delete?id=_id',(req, res) =>{
  questionDB.findByIdAndDelete(req.params._id,(err,data)=>{
    if(err){
      return res.status(500).send(err)
    }else{
      return res.status(200).send(data)
    }
  }) 
   
}); */


module.exports = router;