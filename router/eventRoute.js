const express = require('express')
const route = express.Router()
const { addevent, updateevent, deleteevent, getAllData ,eventComleted,getComletedevent,getAllevent,getAllWorkshop} = require('../controller/eventController')

route.post('/addevent', addevent)
route.post('/Updateevent', updateevent)
route.delete('/Deleteevent', deleteevent)
route.get('/Displayevent', getAllData)
route.post('/Completed',eventComleted)
route.get('/Completedevent',getComletedevent)
route.get('/Allevent',getAllevent)
route.get('/AllWorkshop',getAllWorkshop)


module.exports = route