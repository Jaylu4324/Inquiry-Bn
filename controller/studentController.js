const { stuModel } = require('../model/studentShcema')

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
        Rfees: Tfees,
        course,
        Date,
        btime,
        Parentcontact,
        days,
        Tfees,
        Pfees: 0
    })

    stuData.save().then((data) => {
        res.send({ msg: "Student Data Added", data })
    })
        .catch((err) => {
            res.send({ err })
        })

}

const updateStu = (req, res) => {



    stuModel.updateOne({ _id: req.query.id }, {...req.body,CourseId:req.body.CourseId._id})
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
    stuModel.find({ CourseId: req.query.id }).then((data) => {
        res.send({ msg: "All student", data })
    })
        .catch((err) => {
            res.send({ err })
        })
}
const Alldata = (req, res) => {
    stuModel.find().then((data) => {
        res.send({ data })
    }).catch((err) => {
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

const fillterbyDate = (req, res) => {
    let key = req.query.key
    let sortby = req.query.sortby
    let courseid = req.query.courseid

    if (!courseid) {

        stuModel.find().sort({ [key]: parseInt(sortby) })
            .then((data) => {
                res.send({ data, msg: " is fillter" })
            })
            .catch((err) => {
                res.send({ err })
            })
    } else {
        stuModel.find({ CourseId: courseid }).sort({ [key]: parseInt(sortby) })
            .then((data) => {
                res.send({ data, msg: "else fillter" })
            })
            .catch((err) => {
                res.send({ err })
            })

    }
}


const filterByMonth = async (req, res) => {
    let { perentId, month, sort } = req.query
    sort=parseInt(sort)
    if (!perentId) {

        try {
            const januaryData = await stuModel.find({
                $expr: {
                    $eq: [{ $month: "$Date" }, month]
                }
            }).sort({Date:sort});
            res.json(januaryData);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    else {
        try {
            const januaryData = await stuModel.find({
                $expr: {
                    $eq: [{ $month: "$Date" }, month]
                }
                , CourseId: perentId
            }).sort({Date:sort});
            res.json(januaryData);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

const search=(req,res)=>{
    
     stuModel.find({Name:req.query.Name}).then((data)=>{

         res.send({data})
     })
     .catch((err)=>{
        res.send({err})
     })
 
 }
module.exports = { addStudent, updateStu,search, deleteStu, getAllStu, fillterbyDate, Alldata, filterByMonth }