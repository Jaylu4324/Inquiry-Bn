const express = require('express')
const route = express.Router()

const { addInquiry, updateinquiry, deletinquiry, displayInquiry, displayOnGoingInquiry, displayRejectInquiry, displayConfirmInquiry, RejectInquiry, ConfirmInquiry} = require('../controller/inquiryController')

route.post('/addInquiry', addInquiry)
route.post('/Update', updateinquiry)
route.delete('/Delete', deletinquiry)
route.get('/Display', displayInquiry)
route.get('/OnGoing', displayOnGoingInquiry)
route.get('/Reject', displayRejectInquiry)
route.get('/Confirm', displayConfirmInquiry)
route.post('/RejectedInquiry',RejectInquiry)
route.post('/ConfimInquiry',ConfirmInquiry)






module.exports = route