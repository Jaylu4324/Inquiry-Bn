const {stuModel} = require('../model/studentShcema')

const addStudent = (req, res) => {
    let { Name,
        CourseId,
        Contact,
        Email,
        CollegeName,
        AcademicCourse,
        course,
        Date,
        Rfees,
        btime,
        Parentcontact,
        days,
        Tfees,
        
Pfees
    } = req.body


    const stuData = new stuModel({
        Name,
        Contact,
        CourseId,
        Email,
        CollegeName,
        AcademicCourse,
        Rfees,
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



    stuModel.updateOne({ _id: req.query.id }, req.body)
        .then((data) => {
            res.send({ msg: "Student Updated", data })
        })
        .catch((err) => {
            res.send({ err })
        })

}

const deleteStu = (req, res) => {
    stuModel.deleteOne({ _id: req.query.id })
        .then((data) => {
            res.send({ msg: "Student DEleted" })
        })
        .catch((err) => {
            res.send({ err })
        })
}

const getAllStu = (req, res) => {
    stuModel.find().then((data) => {
        res.send({ msg: "All student", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}

module.exports = { addStudent, updateStu, deleteStu, getAllStu }