// const { string, date } = require('joi')
const mongoose = require('mongoose')
const joi =require('joi')

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

const InvoiceValidation = joi.object({
    stuName:joi.string().alphanum()
    .min(3)
    .max(30)
    .required(),
invoiceDate:joi.date().required(),
Course:joi.string().required(),
Amount:joi.number().required(),
TypeOfPayment:joi.string().required(),
Description:joi.string().required(),
    
})


module.exports=mongoose.model('Invoice',Invoice)