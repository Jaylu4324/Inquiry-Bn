const mongoose=require("mongoose")
const Models=mongoose.Schema({
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"events"
    },
    Astudent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EventbatchSchema"
    },
    StudentArray:{
        type:Array
    }

})
const EventCompletedModel=mongoose.model("EventCompletedModel",Models)
module.exports={EventCompletedModel}