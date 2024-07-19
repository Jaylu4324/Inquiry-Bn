const mongoose=require("mongoose")
const Models=mongoose.Schema({
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addCorseBatch"
    },
    Astudent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RagularbatchSchema"
    },
    StudentArray:{
        type:Array
    }

})
const BatchCompletedModel=mongoose.model("BatchCompletedModel",Models)
module.exports={BatchCompletedModel}