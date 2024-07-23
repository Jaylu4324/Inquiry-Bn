const express = require('express')
const route = express.Router()

const { addInquiry, fillterbyDate,filterByMonth,commonSearch,updateinquiry, deletinquiry, displayInquiry, displayOnGoingInquiry,getISAddeddata, displayRejectInquiry, displayConfirmInquiry, RejectInquiry, ConfirmInquiry,Alldata} = require('../controller/corseinquiryController')
const isAuth=(req,res,next)=>{
    let token = req.headers.authorization.split(' ')[1]
    console.log(req.headers)
    try{
     let chek =jwt.verify(token,'TechNishal')
    if (chek) {
     next()
    }
    else{
     res.send({msg:'jwt not found'})
    }
   
    }
    catch(err){
     res.send({err:err})
    }
    
 }
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
route.get("/commansearchstu",commonSearch)
route.get("/Alldata",Alldata)









module.exports = route