// const { string, date } = require('joi')
const mongoose = require('mongoose')
const joi =require('joi')

const Invoice = mongoose.Schema({

    stuId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    invoiceId:{
        type:String
    },
  
    invoiceDate:{
        type:Date
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
    isDeleted:{
        type:Boolean
    }
    
})

const InvoiceValidation = joi.object({

invoiceDate:joi.date().required(),

Amount:joi.number().required(),
TypeOfPayment:joi.string().required(),
Description:joi.string().required(),
    
})


module.exports=mongoose.model('Invoice',Invoice)