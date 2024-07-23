const express = require('express')
const route = express.Router()
const { addevent, updateevent, deleteevent, getAllData ,eventComleted,getComletedevent,getAllevent,getAllWorkshop} = require('../controller/eventController')
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
 
route.post('/addevent', addevent)
route.post('/Updateevent', updateevent)
route.delete('/Deleteevent', deleteevent)
route.get('/Displayevent', getAllData)
route.post('/Completed',eventComleted)
route.get('/Completedevent',getComletedevent)
route.get('/Allevent',getAllevent)
route.get('/AllWorkshop',getAllWorkshop)


module.exports = route