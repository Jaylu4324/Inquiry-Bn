const mongoose = require('mongoose')
const joi =require('joi')

const events=mongoose.Schema({
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

const eventValidation = joi.object({
    // StartDate:joi.date().required(),
Course:joi.string().required(),
BatchTime:joi.date().required(),
Days:joi.array().min(1).required(),
TypeOfEvent:joi.string().required(),
TypeOfPayment:joi.string().required(),
Amount:joi.number().required()
})

const model = mongoose.model("events",events)
module.exports={model , eventValidation}