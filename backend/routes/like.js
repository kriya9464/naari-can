const express = require("express");
const router = express.Router();

const likeDB = require("../models/like");

router.post("/", async (req, res) => {
  try {
    await likeDB
      .create({
        answerId: req.body.answerId,
        //questionId: req.body.questionId,
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






module.exports = router;