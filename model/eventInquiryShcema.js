const mongoose = require('mongoose')

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

module.exports=mongoose.model('eventInquiry',eventInquiry)