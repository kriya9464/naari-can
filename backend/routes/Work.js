const express = require("express");
const router = express.Router();
//const mongodb = require('mongodb');

const workDB = require("../models/work");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await workDB
      .create({
        jobDescription: req.body.jobDescription,
        pay: req.body.pay,
        address: req.body.address,
        contactNum:req.body.contactNum,
        email: req.body.email,
        
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


router.get('/',(req,res)=>{
    workDB.find((err,data)=>{
      if(err){
        return res.status(500).send(err)
      }else{
        return res.status(200).send(data)
      }
    })
  })


  router.post('/delete', function(req, res) {
    workDB.findByIdAndDelete((req.body.id), 
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