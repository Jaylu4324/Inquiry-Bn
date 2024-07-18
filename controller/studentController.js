const { stuModel,studitailsValidation } = require('../model/studentShcema');
const { AddCourseModel } = require('../model/addCorsebatch');

const addStudent = async (req, res) => {
  try {
    let { 
      Name, CourseId, Contact, Email, CollegeName, AcademicCourse, Date, 
      baseString,  Parentcontact, Tfees 
    } = req.body;

    const {error,value}=studitailsValidation.validate({
       CourseId,Name, Contact,Parentcontact,Tfees , Email, CollegeName, AcademicCourse, Date, 
         baseString
    })
    if (error) {
      res.status(404).send({ error });
        
    }

    else{
      
    
    const stuData = new stuModel({
      Name, Contact, CourseId, Email, CollegeName, AcademicCourse, 
      Rfees: parseInt(Tfees), Date,  Parentcontact, 
      Pfees: 0, Tfees: parseInt(Tfees), baseString
    });

    


    const data = await stuData.save();
    res.status(201).json({ msg: "Student Data Added", data });
  } 
  
}
  catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }

};

const updateStu = async (req, res) => {
  try {

    let { 
      Name, CourseId, Contact, Email, CollegeName, AcademicCourse, Date, 
      baseString,  Parentcontact, Tfees 
    } = req.body;
console.log("-->",CourseId)
    const {error,value}=studitailsValidation.validate({
      CourseId:CourseId._id,Name, Contact,Parentcontact,Tfees , Email, CollegeName, AcademicCourse, Date, 
        baseString
   })
   if (error) {
     res.status(404).send({ error });
       
   }
   else{

    const data = await stuModel.updateOne({ _id: req.query.id }, { ...req.body, CourseId:CourseId._id});
    res.status(200).json({ msg: "Student Updated", data });
  } 
}
  catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }
};

const deleteStu = async (req, res) => {
  try {
    await stuModel.deleteOne({ _id: req.query.id });
    res.status(200).json({ msg: "Student Deleted" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }
};

const getAllStu = async (req, res) => {
  try {
    const data = await stuModel.find({ CourseId: req.query.id }).populate("CourseId");
    res.status(200).json({ msg: "All student", data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }
};

const Alldata = async (req, res) => {
  try {
    const data = await stuModel.find().populate("CourseId");
    res.status(200).json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }
};

const InvoiceGet = async (req, res) => {
  try {
    const courseId = req.query.id;
    const students = await stuModel.find({ CourseId: courseId, Rfees: { $ne: 0 } });
    res.status(200).json(students);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
};

const fillterbyDate = async (req, res) => {
  try {
    let { key, sortby, courseid } = req.query;
    sortby = parseInt(sortby);

    let data;
    if (!courseid) {
      data = await stuModel.find().sort({ [key]: sortby });
    } else {
      data = await stuModel.find({ CourseId: courseid }).sort({ [key]: sortby });
    }

    res.status(200).json({ data, msg: "Filtered" });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }
};

const filterByMonth = async (req, res) => {
  try {
    let { perentId, month, sort } = req.query;
    sort = parseInt(sort);

    let data;
    if (!perentId) {
      data = await stuModel.find({
        $expr: {
          $eq: [{ $month: "$Date" }, month]
        }
      }).sort({ Date: sort });
    } else {
      data = await stuModel.find({
        $expr: {
          $eq: [{ $month: "$Date" }, month]
        },
        CourseId: perentId
      }).sort({ Date: sort });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const data = await stuModel.find({  }).populate("CourseId");
   let data1= data.filter((ele)=>(ele.Name.toLowerCase()==req.query.Name.toLowerCase()))
   
    res.status(200).json({ data:data1 });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ err });
  }
};

module.exports = { addStudent, updateStu, search, deleteStu, getAllStu, fillterbyDate, Alldata, filterByMonth, InvoiceGet };
