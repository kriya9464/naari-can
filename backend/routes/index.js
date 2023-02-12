const express = require('express')
const router = express.Router()

 const blogRouter = require('./Blog')
const workRouter = require('./Work')
const problemRouter = require('./Problem')
const bloglikeRouter = require('./Bloglike')
const problemlikeRouter = require('./Problemlike')
const blogcommentRouter = require('./Blogcomment')
const problemcommentRouter = require('./Problemcomment')
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const likeRouter = require('./like');

router.get('/',(req,res)=>{
    res.send("this api is reserved for womenEmpower")
})

 router.use('/blogs', blogRouter)
router.use('/works', workRouter)
router.use('/problems', problemRouter)
router.use('/bloglikes', bloglikeRouter)
router.use('/problemlikes', problemlikeRouter)
router.use('/blogcomments', blogcommentRouter)
router.use('/problemcomments', problemcommentRouter)
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/likes",likeRouter);
module.exports = router