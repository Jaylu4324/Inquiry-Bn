
const mongoose = require('mongoose')
const joi = require('joi')

const student  = mongoose.Schema({
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addCorseBatch"

    },
    Name:{
        type:String
    },
    Contact:{
        type:Number
    },
    Email:{
        type:String
    },
    CollegeName:{
        type:String
    },
    AcademicCourse:{
        type:String
    },
    Date:{
        type:Date
    },
   
    Parentcontact:{
        type:Number
    },
    Tfees:{
        type:Number
    },
    Pfees:{
        type:Number
    },
    Rfees:{
        type:Number
    },
    baseString:{
        type:String
    }
})

const studitailsValidation = joi.object({
    CourseId:joi.string().required(),
    Name:joi.string().required(),
    Contact:joi.number().required(),
    Email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    CollegeName:joi.string().required(),
    AcademicCourse:joi.string().required(),
    Date:joi.date().required(),
    Parentcontact:joi.number().required(),
    Tfees:joi.number().required(),
    baseString:joi.string().required(),



})

const stuModel =mongoose.model('student',student)
module.exports={stuModel,studitailsValidation}