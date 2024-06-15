const express = require('express')
const route = express.Router()
const { addBatch, updateBatch, deleteBatch, displayBatch ,completedBatch,displayCompletedBatch} = require('../controller/regBatchController')
route.post('/addbatch', addBatch)
route.post('/Update', updateBatch)
route.delete('/Delete', deleteBatch)
route.get('/Display', displayBatch)
route.post('/isCompleted',completedBatch)
route.get('/displaycompleted',displayCompletedBatch)



module.exports = route