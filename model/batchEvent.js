const mongoose = require('mongoose')

const Batchevents=mongoose.Schema({
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


module.exports=mongoose.model("Batchevents",Batchevents)