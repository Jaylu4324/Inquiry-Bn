
const mongoose = require('mongoose')


const student  = mongoose.Schema({
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
        type:Array
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