const mongoose = require('mongoose')
const  joi = require('joi')


const eventInquiry = mongoose.Schema({
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'events'
    },
    FullName: {
        type: String
    },
    Contact: {
        type: Number
    },
    Email: {
        type: String
    },
    Date: {
        type: Date
    },
    Description: {
        type: String
    },
    CollageName: {
        type: String
    },
    onGoing: {
        type: Boolean
    },
    Reject: {
        type: Boolean
    },
    Confirm: {
        type: Boolean
    },
    Interaction: {
        type: String
    },
    FollowUp: {
        type: String
    },
    isDeleted: {
        type: Boolean
    },
    isAdded: {
        type: Boolean
    }
})

const EinquiryValidation = joi.object({
    FullName:joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    Contect:joi.number().required(),

    Email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

Date:joi.date().required(),
Description:joi.string().required(),
CollageName:joi.string().required(),
Interaction:joi.string().required(),
FollowUp:joi.string().required()
})

const model=mongoose.model('eventInquiry',eventInquiry)
module.exports={model,EinquiryValidation}