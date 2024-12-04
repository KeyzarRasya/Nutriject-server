const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    userId:String,
    carbs:Number,
    fat:{
        type:Number,
        default:0
    },
    protein:{
        type:Number,
        default:0
    },
    salt:{
        type:Number,
        default:0
    },
    sugar:{
        type:Number,
        default:0
    },
    waterRequirement:{
        type:Number,
        default:0
    },
    tanggal:String
})

const Model = mongoose.model("Report", reportSchema);

module.exports = Model;