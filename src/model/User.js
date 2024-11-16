const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    gender:String,
    heigh:Number,
    weight:Number,
    activity:String
})

const Model = mongoose.model('User', userSchema)

module.exports = Model;