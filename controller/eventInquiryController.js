const model = require('../model/eventInquiryShcema')

const addEventInquiry = (req, res) => {

    let { FullName,
        eventId,
        Contact,
        Email,
        Date,
        Description,
        CollageName,
        Interaction,
        FollowUp } = req.body

    const data = new model({
        eventId,
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
        isAdded:false,
        Interaction,
        FollowUp
    })



    data.save().then((data1) => {
        res.send({ mag: "Event Inquiry Added", data1 })
    })
        .catch((err) => {
            res.send({ err })
        })
}


const updateEventinquiry = (req, res) => {



    model.updateOne({ _id: req.query.id }, req.body)
        .then((data) => {
            res.send({ msg: "Event Inquiry Updated", data })
        })
        .catch((err) => {
            res.send({ err })
        })

}


const deletEventinquiry = (req, res) => {
    model.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.isDeleted = true

        model.updateOne({ _id: req.query.id }, obj).then((dataup) => {
            res.send({ msg: "Event Inquiry Soft Deleted" })
        })
            .catch((err1) => {
                res.send({ err1 })
            })
    })
        .catch((err) => {
            res.send({ err })
        })

}
const hardelet = (req, res) => {

    model.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Inquiry DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}
const displayAllEventInquiry = (req, res) => {

    model.find({eventId:req.query.id}).then((data) => {
        res.send({ msg: "display all Event Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const displayOnGoingEventInquiry = (req, res) => {
    model.find({ onGoing: true, isDeleted: false,eventId:req.query.id}).then((data) => {
        res.send({ msg: "display OnGoing Event Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const displayRejectEventInquiry = (req, res) => {
    model.find({ Reject: true, isDeleted: false,eventId:req.query.id }).then((data) => {
        res.send({ msg: "display Reject Event Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}


const displayConfirmEventInquiry = (req, res) => {
    model.find({ Confirm: true, isDeleted: false,eventId:req.query.id }).then((data) => {
        res.send({ msg: "display Comfirm Event Inquiry", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const RejectEventInquiry = (req, res) => {
    model.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.onGoing = false
        obj.Confirm = false
        obj.Reject = true

        model.updateOne({ _id: req.query.id }, obj).then((dataup) => {
            res.send({ msg: "Event Inquiry Rejected" })
        })
            .catch((err1) => {
                res.send({ err1 })
            })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const ConfirmEventInquiry = (req, res) => {
    model.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.onGoing = false
        obj.Confirm = true
        obj.Reject = false

        model.updateOne({ _id: req.query.id }, obj).then((dataup) => {
            res.send({ msg: "Event Inquiry confirm" })
        })
            .catch((err1) => {
                res.send({ err1 })
            })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const eventIsAdded = (req,res) =>{
    model.findOne({_id:req.query.id}).then((data)=>{
        let obj=JSON.parse(JSON.stringify(data))
        obj.isAdded=!obj.isAdded

        model.updateOne({_id:req.query.id},obj).then((udata)=>{
            res.send({mas:"isAdded",ud:udata.isAdded})
        })
        .catch((err)=>{
            res.send({err})
        })
    }).catch((e)=>{
        res.send({e})
    })
}

const getISAddeddata =(req,res) =>{
    model.find({Confirm:true,isAdded:false,isDeleted:false,eventId:req.query.id}).then((data)=>{
        res.send({msg:"allIsAdded",data})
    }).catch((err)=>{
        res.send({err})
    })
}
module.exports = {
    addEventInquiry,
    updateEventinquiry,
    deletEventinquiry,
    displayConfirmEventInquiry,
    displayAllEventInquiry,
    displayOnGoingEventInquiry,
    displayRejectEventInquiry,
    RejectEventInquiry,
    ConfirmEventInquiry,
    eventIsAdded,
    getISAddeddata,
    hardelet
}