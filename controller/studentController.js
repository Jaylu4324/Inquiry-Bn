const model = require('../model/studentShcema')

const addStudent = (req, res) => {
    let { Name,
        Contact,
        Email,
        CollegeName,
        AcademicCourse,
        course,
        Date,
        btime,
        Parentcontact,
        days,
        Tfees,
Pfees
    } = req.body


    const stuData = new model({
        Name,
        Contact,
        Email,
        CollegeName,
        AcademicCourse,
        course,
        Date,
        btime,
        Parentcontact,
        days,
        Tfees,
Pfees
    })

    stuData.save().then((data) => {
        res.send({ msg: "Student Data Added", data })
    })
        .catch((err) => {
            res.send({ err })
        })

}

const updateStu = (req, res) => {



    model.updateOne({ _id: req.query.id }, req.body)
        .then((data) => {
            res.send({ msg: "Student Updated", data })
        })
        .catch((err) => {
            res.send({ err })
        })

}

const deleteStu = (req, res) => {
    model.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Student DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}

const getAllStu = (req, res) => {
    model.find().then((data) => {
        res.send({ msg: "All student", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

module.exports = { addStudent, updateStu, deleteStu, getAllStu }