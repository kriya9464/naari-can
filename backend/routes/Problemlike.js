const express = require("express");
const router = express.Router();

const problem_likeDB = require("../models/problemlike");

router.post("/", async (req, res) => {
  try {
    await problem_likeDB
      .create({
        problemId: req.body.problemId,
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
  problem_likeDB.findByIdAndDelete((req.body.id), 
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