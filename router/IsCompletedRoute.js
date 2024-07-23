const express = require('express')
const route = express.Router()
const { Update,getAllData} = require('../controller/IsCompletedController')
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
 
route.post('/UpdateISC', Update)
route.get("/getAllData",getAllData)




module.exports = route