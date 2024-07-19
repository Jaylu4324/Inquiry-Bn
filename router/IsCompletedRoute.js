const express = require('express')
const route = express.Router()
const { Update,getAllData} = require('../controller/IsCompletedController')
route.post('/UpdateISC', Update)
route.get("/getAllData",getAllData)




module.exports = route