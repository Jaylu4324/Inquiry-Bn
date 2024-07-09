const express = require('express')
const route = express.Router()
const { addInvoice, updateinvoice, deletinvoice,search,courseInvoice, displayInvoice,pdfmail,fillterbyDate,filterByMonth} = require('../controller/invoiceContrller')
route.post('/addinfo', addInvoice)
route.post('/Update', updateinvoice)
route.post('/Delete', deletinvoice)
route.get('/Display', displayInvoice)
route.post('/pdf',pdfmail)
route.get('/filterinvocedate', fillterbyDate)
route.get('/fillterinvocemonth', filterByMonth)
route.get('/searchinstu', search)
route.get('/courseIn', courseInvoice)



module.exports = route