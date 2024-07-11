const {CourseInquirymodel} = require('../model/corseinquiryshcema')

const addInquiry = (req, res) => {
    let { FullName,
        Contact,
        Email,
        Date,
        Description,
        CollageName,
        Course,
        
        Interaction,
        FollowUp } = req.body
        let Testarr=Course&&Course.map((ele)=>{
            return{Course:ele,
                isAdded:false
            }
        })
        console.log(Testarr)

    const data = new CourseInquirymodel({
        
        FullName,
        Contact,
        Email,
        Date,
        Description,
        Testarr,
        CollageName,
        onGoing: true,
        Reject: false,
        Confirm: false,
        isDeleted: false,
        Course,
        Interaction,
        FollowUp,
        isAdded:false
    })

    // let {error, value}=validation.validate({})
    // if(error){
        // res.send({error})
    // }else{

        data.save().then((data1) => {
            res.send({ mag: "Inquiry Added", data1 })
        })
            .catch((err) => {
                res.send({ err })
            })
    }
// }

const updateinquiry = (req, res) => {
    let { FullName,
        
        Contact,
        Email,
        Date,
        Description,
        CollageName,
        Status,
        Course,
        Interaction,
        FollowUp } = req.body

        let Testarr=Course&&Course.map((ele)=>{
            return{Course:ele,
                isAdded:false
            }
        })

    // let {error, value}=validation.validate({FullName,
    //     Contact,
    //     Email,
    //     Date,
    //     Description,
    //     CollageName,
    //     Status,
    //     Course,
    //     Interaction,
    //     FollowUp})
    // if(error){
    //     res.send({error})
    // }else{

    CourseInquirymodel.updateOne({ _id: req.query.id }, {...req.body,Testarr})
            .then((data) => {
                res.send({ msg: "Inquiry Updated", data })
            })
            .catch((err) => {
                res.send({ err })
            })
    // }
}


const deletinquiry = (req, res) => {
    CourseInquirymodel.find({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.isDeleted=true

        CourseInquirymodel.updateOne({ _id: req.query.id }, obj).then((dataup) => {
            res.send({ msg: "Inquiry Soft Deleted" })
        })
            .catch((err1) => {
                res.send({ err1 })
            })
    })
        .catch((err) => {
            res.send({ err })
        })
    
}
const hardelet=(req,res)=>{

    CourseInquirymodel.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Inquiry DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}
const displayInquiry = (req, res) => {
    CourseInquirymodel.find().then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const displayOnGoingInquiry = (req, res) => {
    CourseInquirymodel.find({ onGoing: true,isDeleted:false }).then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const displayRejectInquiry = (req, res) => {
    CourseInquirymodel.find({ Reject: true,isDeleted:false  }).then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}


const displayConfirmInquiry = (req, res) => {
    CourseInquirymodel.find({ Confirm: true ,isDeleted:false }).then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const RejectInquiry = (req, res) => {
    CourseInquirymodel.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.onGoing = false
        obj.Confirm = false
        obj.Reject = true

        CourseInquirymodel.updateOne({ _id: req.query.id }, obj).then((dataup) => {
            res.send({ msg: "Inquiry Rejected" })
        })
            .catch((err1) => {
                res.send({ err1 })
            })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const ConfirmInquiry = (req, res) => {
    CourseInquirymodel.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.onGoing = false
        obj.Confirm = true
        obj.Reject = false

        CourseInquirymodel.updateOne({ _id: req.query.id }, obj).then((dataup) => {
            res.send({ msg: "Inquiry confirm" })
        })
            .catch((err1) => {
                res.send({ err1 })
            })
    })
        .catch((err) => {
            res.send({ err })
        })
}
const getISAddeddata = (req, res) => {
    let Course = req.query.Course;

    CourseInquirymodel.find({
        Confirm: true,
        isDeleted: false,
        Testarr: {
            $elemMatch: {
                Course: Course,
                isAdded: false
            }
        }
    })
    .then((data) => {
        res.send({ msg: "allIsAdded", data });
    })
    .catch((err) => {
        res.send({ err });
    });
};

const fillterbyDate = (req, res) => {
    let key = req.query.key
    let sortby = req.query.sortby
    

   
    
        CourseInquirymodel.find().sort({ [key]: parseInt(sortby) })
            .then((data) => {
                res.send({ data, msg: "else fillter" })
            })
            .catch((err) => {
                res.send({ err })
            })

    
}


const filterByMonth = async (req, res) => {
    let {  month, sort } = req.query
    

    
        try {
            const januaryData = await CourseInquirymodel.find({
                $expr: {
                    $eq: [{ $month: "$Date" }, month]
                }
            }).sort({Date:sort});
            res.json(januaryData);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    
};



const confirmsearch=async(req,res)=>{
    let {FullName} = req.query
    const populatedata =await CourseInquirymodel.find({Confirm: true ,isDeleted:false})

 if (populatedata.length>0) {
    
     const filterdata= populatedata.filter((ele)=>{
       return ele.FullName.toLowerCase() == FullName.toLowerCase()
      })
      res.send({filterdata})
 }
 }


 const onGoingsearch=async(req,res)=>{
    let {FullName} = req.query
    
    const populatedata =await CourseInquirymodel.find({onGoing: true,isDeleted:false})
    if (populatedata.length>0) {
        
        const filterdata= populatedata.filter((ele)=>{
          return ele.FullName.toLowerCase() == FullName.toLowerCase()
         })
         res.send({filterdata})
    }
 }


 const rejectsearch=async(req,res)=>{
    let {FullName} = req.query
    const populatedata =await CourseInquirymodel.find({Reject: true,isDeleted:false })
 if(populatedata.length>0){

     const filterdata= populatedata.filter((ele)=>{
       return ele.FullName.toLowerCase() == FullName.toLowerCase()
      })
      res.send({filterdata})
 }
 }




module.exports = { addInquiry, updateinquiry, deletinquiry,rejectsearch,confirmsearch,onGoingsearch, displayOnGoingInquiry, displayInquiry, displayRejectInquiry, displayConfirmInquiry, RejectInquiry, ConfirmInquiry,getISAddeddata ,fillterbyDate,filterByMonth}