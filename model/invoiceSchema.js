// const { string, date } = require('joi')
const mongoose = require('mongoose')
const joi =require('joi')

const Invoice = mongoose.Schema({

    stuId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addCorseBatch'
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
    stuId: joi.string().required(),
    courseId: joi.string().required(),


invoiceDate:joi.date().required(),

Amount:joi.number().required(),
TypeOfPayment:joi.string().required(),

   
})


const invoiceModel=mongoose.model('Invoice',Invoice)
module.exports={InvoiceValidation,invoiceModel}