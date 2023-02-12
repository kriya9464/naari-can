const mongoose = require('mongoose')


const url="mongodb://kriya:cMLej5HJsfIM5Ou9@ac-jj04mlk-shard-00-00.ktdaqzi.mongodb.net:27017,ac-jj04mlk-shard-00-01.ktdaqzi.mongodb.net:27017,ac-jj04mlk-shard-00-02.ktdaqzi.mongodb.net:27017/?ssl=true&replicaSet=atlas-30l0z9-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports.connect = ()=>{
    mongoose.connect(url)
}