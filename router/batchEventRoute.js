const express=require('express')
const route = express.Router()
const {addBatchEvent,updatBatchEvent,deleteBatchEvent,getAllData,postiscompleted,getiscompleted}=require('../controller/batchEventController')


route.post('/addBevent', addBatchEvent)
route.post('/UpdateBevent', updatBatchEvent)
route.delete('/DeleteBevent', deleteBatchEvent)
route.get('/DisplayBevent', getAllData)
route.post('/completedBevent',postiscompleted)
route.get('/displaycompletedBevent',getiscompleted)


module.exports=route