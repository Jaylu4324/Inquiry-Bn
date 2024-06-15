const mongoose = require('mongoose')

const seminar = mongoose.Schema({
    College: {
        type: String
    },
    StartDate: {
        type: Date
    },
    EndtDate: {
        type: Date
    },
    Course: {
        type: String
    },
    SeminarTime: {
        type: Date
    },
    Days: {
        type: Array
    },
    IsCompleted: {
        type: Boolean
    }
})


module.exports = mongoose.model("seminar", seminar)