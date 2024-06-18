
const mongoose = require('mongoose')
// const joi = require('joi')

const corseInquiry = mongoose.Schema({
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addCorseBatch'
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
    Course: {
        type: Array
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
    }

})

// const validation = joi.object({
//     FullName: joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     Contact: joi.number()
//         .required(),

//     Email: joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//         .required(),

//     Date: joi.date().required(),

//     Description: joi.string()
//         .required(),
    

//     CollageName: joi.string()
//         .required(),

//     Course: joi.array()
//         .required(),

//     Interaction: joi.string()
//         .required(),

//     FollowUp: joi.string()
//         .required(),
// })

const model = mongoose.model('corseInquiry', corseInquiry)
module.exports = {  model }