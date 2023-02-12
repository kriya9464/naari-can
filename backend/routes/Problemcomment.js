const express = require("express");
const router = express.Router();

const problem_commentDB = require("../models/problemcomment");

router.post("/", async (req, res) => {
  try {
    await problem_commentDB
      .create({
        comment:req.body.comment,
        problemId: req.body.problemId,
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
    problem_commentDB.findByIdAndDelete((req.body.id), 
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