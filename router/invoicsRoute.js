const express = require('express')
const route = express.Router()
const { addInvoice, updateinvoice, deletinvoice, displayInvoice,pdfmail} = require('../controller/invoiceContrller')
route.post('/addinfo', addInvoice)
route.post('/Update', updateinvoice)
route.post('/Delete', deletinvoice)
route.get('/Display', displayInvoice)
route.post('/pdf',pdfmail)



module.exports = route