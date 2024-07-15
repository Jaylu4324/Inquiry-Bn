
const mongoose = require('mongoose')


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
    course:{
        type:String
    },
    Date:{
        type:Date
    },
    btime:{
        type:Date
    },
    Parentcontact:{
        type:Number
    },
    days:{
        type:Array
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
})



const stuModel =mongoose.model('student',student)
module.exports={stuModel}