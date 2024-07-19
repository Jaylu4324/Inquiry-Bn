const { BatchCompletedModel } = require("../model/BatchCompleted");

const Update=async(req,res)=>{

    let UpdateId=req.query.UpdateId;
    let {Studentid,Date,Cetificate}=req.body
console.log(req.body,req.query)
BatchCompletedModel.findOne({_id:req.query.UpdateId}).then(async(copy)=>{
        console.log(copy)
    let cp=JSON.parse(JSON.stringify(copy))
    let index=cp.StudentArray.findIndex((ele)=>(ele._id==Studentid))
    cp.StudentArray[index].Date=Date
    cp.StudentArray[index].Cetificate=Cetificate



   const updateData=await  BatchCompletedModel.updateOne({_id:UpdateId},cp)
})
   res.send({msg:"data updated"})
}

const getAllData=async(req,res)=>{
let data=await     BatchCompletedModel.find().populate("CourseId").populate("Astudent")
res.send({data})
}

module.exports={Update,getAllData}