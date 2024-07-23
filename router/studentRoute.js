const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')

const { addStudent, updateStu,InvoiceGet, deleteStu,search, getAllStu ,fillterbyDate,Alldata,filterByMonth} = require('../controller/studentController')

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

route.post('/stuadd',isAuth, addStudent)
route.post('/UpdateStu',isAuth, updateStu)
route.delete('/deleteStu',isAuth, deleteStu)
route.get('/allStuden',isAuth, getAllStu)
route.get('/fillter',isAuth, fillterbyDate)
route.get("/Alldata",isAuth,Alldata)
route.get("/filtermonth",isAuth,filterByMonth)
route.get("/stusearch",isAuth,search)
route.get("/InvoiceGet",isAuth,InvoiceGet)

module.exports = route


