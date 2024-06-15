let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://krunalmistry7545:krunal2909@cluster0.ea22c9l.mongodb.net/?retryWrites=true&w=majority')

.then(()=>console.log('database connected'))
.catch((err)=>console.log(err))