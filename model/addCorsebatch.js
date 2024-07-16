const mongoose = require('mongoose')
const joi = require('joi')

const addCorseBatch=mongoose.Schema({
    StartDate:{
        type:Date
    },
   
    Course:{
        type:String
    },
    batchName:{
        type:String
    },
    BatchTime:{
        type:Date
    },
    Days:{
        type:Array
    },
  
  
    IsCompleted:{
        type:Boolean
    }
})

const validation = joi.object({
    StartDate:joi.date().required(),
Course:joi.string().required(),
BatchTime:joi.date().required(),
Days:joi.array().required(),
batchName:joi.string().required()
})

const AddCourseModel = mongoose.model("addCorseBatch",addCorseBatch)
module.exports={validation,AddCourseModel}