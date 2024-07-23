const express = require('express')
const route = express.Router()
const { addInvoice, updateinvoice, deletinvoice,search,courseInvoice, displayInvoice,pdfmail,fillterbyDate,filterByMonth} = require('../controller/invoiceContrller')

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
 
route.post('/addinfo', addInvoice)
route.post('/Update', updateinvoice)
route.post('/Delete', deletinvoice)
route.get('/Display', displayInvoice)
route.post('/pdf',pdfmail)
route.get('/filterinvocedate', fillterbyDate)
route.get('/fillterinvocemonth', filterByMonth)
route.get('/searchinstu', search)
route.get('/courseIn', courseInvoice)



module.exports = route