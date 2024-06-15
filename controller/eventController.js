const model = require('../model/eventShcema')



const addevent = (req, res) => {
    let {
        StartDate,
        EndtDate,
        Course,
        BatchTime,
        TypeOfEvent,
        Amount,
        TypeOfPayment,
        Days } = req.body


    const eventdata = new model({
        StartDate,
        EndtDate,
        Course,
        BatchTime,
        TypeOfEvent,
        Days,
        Amount,
        TypeOfPayment,
        IsCompleted: false
    })

    eventdata.save().then((data) => {
        res.send({ msg: "Event data added", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const updateevent = (req, res) => {



    model.updateOne({ _id: req.query.id }, req.body)
        .then((data) => {
            res.send({ msg: "Event Updated", data })
        })
        .catch((err) => {
            res.send({ err })
        })

}

const deleteevent = (req, res) => {
    model.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Event DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}

const getAllData = (req, res) => {
    model.find({ IsCompleted: false }).then((data) => {
        res.send({ msg: "All Data", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

const eventComleted = (req, res) => {
    model.findOne({ _id: req.query.id }).then((data) => {
        let obj = JSON.parse(JSON.stringify(data))
        obj.IsCompleted = true

        model.updateOne({ _id: req.query.id }, obj).then((data1) => {
            res.send({ msg: "event Comleted" })
        })
            .catch((err2) => {
                res.send({ err2 })
            })

    })
        .catch((err) => {
            res.send({ err })
        })
}

const getComletedevent = (req, res) => {
    model.find({ IsCompleted: true }).then((data) => {
        res.send({ msg: "All Comleted Event", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}


const getAllevent = (req, res) => {
    model.find({ TypeOfEvent: "event" })
        .then((data) => {
            res.send({ msg: "All event", data })
        })
        .catch((err) => {
            res.send({ err })
        })
}

const getAllWorkshop = (req, res) => {
    model.find({ TypeOfEvent: "Workshop" })
        .then((data) => {
            res.send({ msg: "All Workshop", data })
        })
        .catch((err) => {
            res.send({ err })
        })
}

module.exports = { addevent, updateevent, deleteevent, getAllData, eventComleted, getComletedevent, getAllevent, getAllWorkshop }