const express = require('express')
const route = express.Router()
const { addBatch, updateBatch, deleteBatch, displayBatch ,completedBatch,displayCompletedBatch} = require('../controller/eventbatchConroller')

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
 
route.post('/addbatch', addBatch)
route.post('/Update', updateBatch)
route.delete('/Delete', deleteBatch)
route.get('/Display', displayBatch)
route.post('/isCompleted',completedBatch)
route.get('/displaycompleted',displayCompletedBatch)



module.exports = route