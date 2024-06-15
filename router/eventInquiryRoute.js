const express = require('express')
const route = express.Router()

const { addEventInquiry,
    updateEventinquiry,
    deletEventinquiry,
    displayConfirmEventInquiry,
    displayAllEventInquiry,
    displayOnGoingEventInquiry,
    displayRejectEventInquiry,
    RejectEventInquiry,
    ConfirmEventInquiry,
    eventIsAdded,
    getISAddeddata,
    hardelet } = require('../controller/eventInquiryController')

route.post('/addInquiry', addEventInquiry)
route.post('/Update', updateEventinquiry)
route.delete('/hardDelete', hardelet)
route.delete('/Delete', deletEventinquiry)
route.get('/Display', displayAllEventInquiry)
route.get('/OnGoing', displayOnGoingEventInquiry)
route.get('/Reject', displayRejectEventInquiry)
route.get('/Confirm', displayConfirmEventInquiry)
route.post('/RejectedInquiry', RejectEventInquiry)
route.post('/ConfimInquiry', ConfirmEventInquiry)
route.post('/isAdded',eventIsAdded)
route.get('/getisAdded',getISAddeddata)





module.exports = route