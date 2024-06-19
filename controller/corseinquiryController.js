const {model1} = require('../model/corseinquiryshcema')

const addInquiry = (req, res) => {
    let { FullName,
        Contact,
        Email,
        Date,
        Description,
        CollageName,
        Course,
        parentId,
        Interaction,
        FollowUp } = req.body

    const data = new model({
        parentId,
        FullName,
        Contact,
        Email,
        Date,
        Description,
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
        parentId,
        Contact,
        Email,
        Date,
        Description,
        CollageName,
        Status,
        Course,
        Interaction,
        FollowUp } = req.body

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

        model.updateOne({ _id: req.query.id }, {...req.body,parentId})
            .then((data) => {
                res.send({ msg: "Inquiry Updated", data })
            })
            .catch((err) => {
                res.send({ err })
            })
    // }
}


const deletinquiry = (req, res) => {
    model.find({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.isDeleted=true

        model.updateOne({ _id: req.query.id }, obj).then((dataup) => {
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

    model.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Inquiry DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}
const displayInquiry = (req, res) => {
    model.find().then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const displayOnGoingInquiry = (req, res) => {
    model.find({ onGoing: true,isDeleted:false ,parentId:req.query.id}).then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const displayRejectInquiry = (req, res) => {
    model.find({ Reject: true,isDeleted:false ,parentId:req.query.id }).then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}


const displayConfirmInquiry = (req, res) => {
    model.find({ Confirm: true ,isDeleted:false ,parentId:req.query.id}).then((data) => {
        res.send({ msg: "display Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const RejectInquiry = (req, res) => {
    model.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.onGoing = false
        obj.Confirm = false
        obj.Reject = true

        model.updateOne({ _id: req.query.id }, obj).then((dataup) => {
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
    model.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.onGoing = false
        obj.Confirm = true
        obj.Reject = false

        model.updateOne({ _id: req.query.id }, obj).then((dataup) => {
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
module.exports = { addInquiry, updateinquiry, deletinquiry, displayOnGoingInquiry, displayInquiry, displayRejectInquiry, displayConfirmInquiry, RejectInquiry, ConfirmInquiry }