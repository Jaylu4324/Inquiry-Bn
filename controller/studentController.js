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
        
        btime,
        Parentcontact,
        days,
        Tfees,
        

    } = req.body


    const stuData = new stuModel({
        Name,
        Contact,
        CourseId,
        Email,
        CollegeName,
        AcademicCourse,
        Rfees:Tfees,    
        course,
        Date,
        btime,
        Parentcontact,
        days,
        Tfees,
Pfees:0
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
    stuModel.find({CourseId:req.query.id}).then((data) => {
        res.send({ msg: "All student", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}
const InvoiceGet = (req, res) => {
    // Extract the course ID from the request query parameters
    const courseId = req.query.id;

    // Define the query to find students with the given course ID and Rfess not equal to 0
    stuModel.find({ CourseId: courseId, Rfess: { $ne: 0 } }, (err, students) => {
        if (err) {
            // Handle error
            return res.status(500).send({ error: 'Database query failed' });
        }
        // Send the retrieved students as the response
        res.status(200).send(students);
    });
};

const fillterbyDate=(req,res)=>{
    stuModel.find().sort({Date:-1})
    .then((data)=>{
        res.send({data,msg:"fillter"})
    })
    .catch((err)=>{
        res.send({err})
    })
}


module.exports = { addStudent, updateStu, deleteStu, getAllStu ,fillterbyDate}