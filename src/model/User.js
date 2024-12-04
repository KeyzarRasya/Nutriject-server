const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    gender:String,
    height:Number,
    weight:Number,
    activity:String,
    BMR:Number,
    TDEE:Number,
    carbsMax:Number,
    carbsMin:Number,
    fatMax:Number,
    fatMin:Number,
    proteinMax:Number,
    proteinMin:Number,
    saltMax:Number,
    saltMin:Number,
    sugarMax:Number,
    sugarMin:Number,
    waterRequirement:Number,

})

const Model = mongoose.model('User', userSchema)

module.exports = Model;