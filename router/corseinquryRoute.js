const express = require('express')
const route = express.Router()

const { addInquiry, fillterbyDate,filterByMonth,search,onGoingsearch,rejectsearch,confirmsearch,updateinquiry, deletinquiry, displayInquiry, displayOnGoingInquiry,getISAddeddata, displayRejectInquiry, displayConfirmInquiry, RejectInquiry, ConfirmInquiry} = require('../controller/corseinquiryController')

route.post('/addInquiry', addInquiry)
route.post('/Update', updateinquiry)
route.delete('/Delete', deletinquiry)
route.get('/Display', displayInquiry)
route.get('/OnGoing', displayOnGoingInquiry)
route.get('/Reject', displayRejectInquiry)
route.get('/Confirm', displayConfirmInquiry)
route.post('/RejectedInquiry',RejectInquiry)
route.get("/getisAdded",getISAddeddata)
route.post('/ConfimInquiry',ConfirmInquiry)
route.get("/coursefillbydate",fillterbyDate)
route.get("/coursefillbymonth",filterByMonth)
route.get("/searchstu",search)
route.get("/onGoingsearchstu",onGoingsearch)
route.get("/rejectsearchstu",rejectsearch)
route.get("/confirmsearchstu",confirmsearch)







module.exports = route