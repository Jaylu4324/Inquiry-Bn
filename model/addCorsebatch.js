const mongoose = require('mongoose')
// const joi = require('joi')

const addCorseBatch=mongoose.Schema({
    StartDate:{
        type:Date
    },
    EndtDate:{
        type:Date
    },
    Course:{
        type:String
    },
    BatchTime:{
        type:Date
    },
    Days:{
        type:Array
    },
    TypeOfEvent:{
        type:String
    },
    TypeOfPayment:{
        type:String
    },
    Amount:{
        type:Number
    },
    IsCompleted:{
        type:Boolean
    }
})

// const validation = joi.object({
//     StartDate=joi.date().required(),
// Course=joi.string().required(),
// BatchTime
// Days
// TypeOfEvent
// TypeOfPayment
// Amount
// })

module.exports=mongoose.model("addCorseBatch",addCorseBatch)