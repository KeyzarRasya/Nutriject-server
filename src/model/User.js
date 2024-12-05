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

    BMR:{
        type:Number,
        default:0
    },
    TDEE:{
        type:Number,
        default:0
    },
    carbsMax:{
        type:Number,
        default:0
    },
    carbsMin:{
        type:Number,
        default:0
    },
    fatMax:{
        type:Number,
        default:0
    },
    fatMin:{
        type:Number,
        default:0
    },
    proteinMax:{
        type:Number,
        default:0
    },
    proteinMin:{
        type:Number,
        default:0
    },
    saltMax:{
        type:Number,
        default:0
    },
    saltMin:{
        type:Number,
        default:0
    },
    sugarMax:{
        type:Number,
        default:0
    },
    sugarMin:{
        type:Number,
        default:0
    },
    waterRequirement:{
        type:Number,
        default:0
    },

})

const Model = mongoose.model('User', userSchema)

module.exports = Model;