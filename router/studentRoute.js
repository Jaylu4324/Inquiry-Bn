const express = require('express')
const route = express.Router()
const { addStudent, updateStu, deleteStu, getAllStu ,fillterbyDate,Alldata} = require('../controller/studentController')


route.post('/stuadd', addStudent)
route.post('/UpdateStu', updateStu)
route.delete('/deleteStu', deleteStu)
route.get('/allStuden', getAllStu)
route.get('/fillter', fillterbyDate)
route.get("/Alldata",Alldata)


module.exports = route


