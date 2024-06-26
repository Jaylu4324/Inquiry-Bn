const {AddCourseModel,validation} = require('../model/addCorsebatch')

const addBatchEvent = (req, res) => {
    let {
        StartDate,
        EndtDate,
        Course,
        BatchTime,
        Amount,
        TypeOfPayment,
        Days } = req.body


    const eventdata = new AddCourseModel({
        StartDate,
        EndtDate,
        Course,
        BatchTime,
        Days,
        Amount,
        TypeOfPayment,
        IsCompleted: false
    })

    eventdata.save().then((data) => {
        res.send({ msg: "Event Batch  added", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const updatBatchEvent = (req, res) => {



    AddCourseModel.updateOne({ _id: req.query.id }, req.body)
        .then((data) => {
            res.send({ msg: "Event batch Updated", data })
        })
        .catch((err) => {
            res.send({ err })
        })

}

const deleteBatchEvent = (req, res) => {
    AddCourseModel.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Event batch DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}

const getAllData = (req, res) => {
    AddCourseModel.find({ IsCompleted: false }).then((data) => {
        res.send({ msg: "All Data", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const postiscompleted= async (req,res)=>{
try{

const getid=req.query.id
const getiscomp= await AddCourseModel.findByIdAndUpdate(getid,{IsCompleted:true},{new:true})
res.status(200).json({msg:'batch event completed',getiscomp})

}
catch(err){
    console.log(err)
res.status(400).json({err:'error in completing'})


}
}
const getiscompleted= async(req,res)=>{

try{
const getcompleted= await AddCourseModel.find({IsCompleted:true})
res.status(200).json({msg:'display completed data',getcompleted})
}
catch(err){


    console.log(err)
res.status(400).json({err:'error in displaying complted data'})


}

}
module.exports={addBatchEvent,updatBatchEvent,deleteBatchEvent,getAllData,postiscompleted,getiscompleted}