const express=require('express')
const route = express.Router()
const {addBatchEvent,updatBatchEvent,allcourse,deleteBatchEvent,getAllData,postiscompleted,getiscompleted}=require('../controller/addCorseController')


route.post('/addBevent', addBatchEvent)
route.post('/UpdateBevent', updatBatchEvent)
route.delete('/DeleteBevent', deleteBatchEvent)
route.get('/DisplayBevent', getAllData)
route.post('/completedBevent',postiscompleted)
route.get('/displaycompletedBevent',getiscompleted)
route.get('/allcourse',allcourse)


module.exports=route