const express = require('express')
const route = express.Router()
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
 
route.post('/stuadd', addStudent)
route.post('/UpdateStu', updateStu)
route.delete('/deleteStu', deleteStu)
route.get('/allStuden', getAllStu)
route.get('/fillter', fillterbyDate)
route.get("/Alldata",Alldata)
route.get("/filtermonth",filterByMonth)
route.get("/stusearch",search)
route.get("/InvoiceGet",InvoiceGet)

module.exports = route


