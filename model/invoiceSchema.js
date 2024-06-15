// const { string, date } = require('joi')

const mongoose = require('mongoose')

const Invoice = mongoose.Schema({
    stuName:{
        type:String
    },
    invoiceDate:{
        type:Date
    },
    Course:{
        type:String
    },
    Amount:{
        type:Number
    },
    TypeOfPayment:{
        type:String
    },
    Description:{
        type:String
    },
    Remaining:{
        type:Number
    },
    Total:{
        type:Number
    }
})




module.exports=mongoose.model('Invoice',Invoice)