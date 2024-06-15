const mongoose = require('mongoose')

const EventbatchSchema = mongoose.Schema({
    EventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'events'
    },
    
    StuName:{
        type:Array
    },
    isCompleted:{
        type:Boolean
    }
})

module.exports=mongoose.model('EventbatchSchema',EventbatchSchema)