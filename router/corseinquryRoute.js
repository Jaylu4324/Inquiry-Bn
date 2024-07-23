const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')

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
route.post('/addInquiry',isAuth, addInquiry)
route.post('/Update',isAuth, updateinquiry)
route.delete('/Delete',isAuth, deletinquiry)
route.get('/Display',isAuth, displayInquiry)
route.get('/OnGoing',isAuth, displayOnGoingInquiry)
route.get('/Reject',isAuth, displayRejectInquiry)
route.get('/Confirm',isAuth, displayConfirmInquiry)
route.post('/RejectedInquiry',isAuth,RejectInquiry)
route.get("/getisAdded",isAuth,getISAddeddata)
route.post('/ConfimInquiry',isAuth,ConfirmInquiry)
route.get("/coursefillbydate",isAuth,fillterbyDate)
route.get("/coursefillbymonth",isAuth,filterByMonth)
route.get("/commansearchstu",isAuth,commonSearch)
route.get("/Alldata",isAuth,Alldata)









module.exports = route