const express = require('express')
const route = express.Router()
const { addStudent, updateStu, deleteStu, getAllStu } = require('../controller/studentController')


route.post('/stuadd', addStudent)
route.post('/UpdateStu', updateStu)
route.delete('/deleteStu', deleteStu)
route.get('/allStuden', getAllStu)


module.exports = route