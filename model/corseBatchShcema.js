const mongoose = require('mongoose')

const RagularbatchSchema = mongoose.Schema({
    EventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addCorseBatch'
    },
    
    StuName:{
        type:Array
    },
    isCompleted:{
        type:Boolean
    }
})

module.exports=mongoose.model('RagularbatchSchema',RagularbatchSchema)