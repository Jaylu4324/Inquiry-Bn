const express=require('express')
const route = express.Router()
const {addBatchEvent,updatBatchEvent,allcourse,deleteBatchEvent,getAllData,postiscompleted,getiscompleted}=require('../controller/addCorseController')

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

route.post('/addBevent', addBatchEvent)
route.post('/UpdateBevent', updatBatchEvent)
route.delete('/DeleteBevent', deleteBatchEvent)
route.get('/DisplayBevent', getAllData)
route.post('/completedBevent',postiscompleted)
route.get('/displaycompletedBevent',getiscompleted)
route.get('/allcourse',allcourse)


module.exports=route