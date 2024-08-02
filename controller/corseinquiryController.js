const { CourseInquirymodel, validation } = require('../model/corseinquiryshcema');

const addInquiry = async (req, res) => {
    try {
        let { FullName, Contact, Email, Date, CollageName, Course,FollowUp, Interaction,Description} = req.body;

        let { error, value } = validation.validate({ FullName, Contact, Email, Date, CollageName, Course,FollowUp, Interaction,Description});
        if (error) {
            return res.status(400).send({ error });
        }

        let Testarr = Course && Course.map((ele) => ({
            Course: ele,
            isAdded: false, 
        }));
        console.log(Testarr);

        let stuAddedArr = Course && Course.map((ele) => ({
            Course: ele,
            isStuAdded: false, 
        }));

        const data = new CourseInquirymodel({
            FullName,
            Contact,
            Email,
            Date,
            Description,
            Testarr,
            stuAddedArr,
            CollageName,
            onGoing: true,
            Reject: false,
            Confirm: false,
            isDeleted: false,
            Course,
            Interaction,
            FollowUp,
            isAdded: false
        });

        const data1 = await data.save();
        res.status(201).send({ msg: "Inquiry Added", data1 });
    } catch (err) {
        res.status(500).send({ err });
    }
};



const updateinquiry = async (req, res) => {
    try {
        let { FullName, Contact, Email, Date, Description, CollageName, Course, Interaction, FollowUp } = req.body;

        let Testarr = Course && Course.map((ele) => ({
            Course: ele,
            isAdded: false
        }));

        let stuAddedArr = Course && Course.map((ele) => ({
            Course: ele,
            isStuAdded: false, 
        }));

        let { error, value } = validation.validate({ FullName, Contact, Email, Date, CollageName, Course,FollowUp, Interaction,Description});
        if (error) {
            return res.status(400).send({ error });
        }

        const data = await CourseInquirymodel.updateOne({ _id: req.query.id }, { ...req.body, Testarr,stuAddedArr });
        res.status(200).send({ msg: "Inquiry Updated", data });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const deletinquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.find({ _id: req.query.id });
        let obj = JSON.parse(JSON.stringify(data[0]));
        obj.isDeleted = true;

        await CourseInquirymodel.updateOne({ _id: req.query.id }, obj);
        res.status(200).send({ msg: "Inquiry Soft Deleted" });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const hardelet = async (req, res) => {
    try {
        await CourseInquirymodel.deleteOne({ _id: req.query.id });
        res.status(200).send({ msg: "Inquiry Deleted" });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const displayInquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.find();
        res.status(200).send({ msg: "Display Inquiry", data });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const displayOnGoingInquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.find({ onGoing: true, isDeleted: false });
        res.status(200).send({ msg: "Display Ongoing Inquiry", data });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const displayRejectInquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.find({ Reject: true, isDeleted: false });
        res.status(200).send({ msg: "Display Rejected Inquiry", data });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const displayConfirmInquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.find({ Confirm: true, isDeleted: false });
        res.status(200).send({ msg: "Display Confirmed Inquiry", data });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const RejectInquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.findOne({ _id: req.query.id });
        let obj = JSON.parse(JSON.stringify(data));
        obj.onGoing = false;
        obj.Confirm = false;
        obj.Reject = true;

        await CourseInquirymodel.updateOne({ _id: req.query.id }, obj);
        res.status(200).send({ msg: "Inquiry Rejected" });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const ConfirmInquiry = async (req, res) => {
    try {
        const data = await CourseInquirymodel.findOne({ _id: req.query.id });
        let obj = JSON.parse(JSON.stringify(data));
        obj.onGoing = false;
        obj.Confirm = true;
        obj.Reject = false;

        await CourseInquirymodel.updateOne({ _id: req.query.id }, obj);
        res.status(200).send({ msg: "Inquiry Confirmed" });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const getISAddeddata = async (req, res) => {
    try {
        let Course = req.query.Course;

        const data = await CourseInquirymodel.find({
            Confirm: true,
            isDeleted: false,
            Testarr: {
                $elemMatch: {
                    Course: Course,
                    isAdded: false
                }
            }
        });
        res.status(200).send({ msg: "allIsAdded", data });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const fillterbyDate = async (req, res) => {
    try {
        let key = req.query.key;
        let sortby = req.query.sortby;
        let type = req.query.type;

        const data = await CourseInquirymodel.find({ [type]: true }).sort({ [key]: parseInt(sortby) });
        res.status(200).send({ data, msg: "Filtered by Date" });
    } catch (err) {
        res.status(500).send({ err });
    }
};

const filterByMonth = async (req, res) => {
    try {
        let { month, sort, type } = req.query;

        const data = await CourseInquirymodel.find({
            [type]: true,
            $expr: {
                $eq: [{ $month: "$Date" }, parseInt(month)]
            }
        }).sort({ Date: parseInt(sort) });
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
const commonSearch = async (req, res) => {
    try {
        let { FullName, type } = req.query;
        if(FullName){
            FullName=FullName.trim()
        }
        const filter = {
            [type]: true,
            isDeleted: false,
            FullName: { $regex: new RegExp(FullName, 'i') }
        };

        const populatedata = await CourseInquirymodel.find(filter);

        res.status(200).send({ filterdata: populatedata });
    } catch (err) {
        res.status(500).send({ err });
    }
};
  
const Alldata = async (req, res) => {
    try {
        let { key } = req.query;
        const allData = await CourseInquirymodel.find({ [key]: true });
        res.status(200).send({ allData });
    } catch (err) {
        res.status(500).send({ err });
    }
};


const studentAddDropdown = async (req, res) => {
    try {
        
        const Course = req.query.Course 

       
        console.log("Query Parameters:", req.query);
        
        const data = await CourseInquirymodel.find({
            Confirm: true,
            isDeleted: false,
           
            stuAddedArr: {
                $elemMatch: {
                    Course: Course,
                    isStuAdded: false
                }
            }
        });

       
        

        res.status(200).send({ msg: "Documents found", data });
    } catch (err) {
        console.error('Error in studentAddDropdown API:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};



module.exports = { addInquiry, updateinquiry, deletinquiry, studentAddDropdown,commonSearch, displayOnGoingInquiry, displayInquiry, displayRejectInquiry, displayConfirmInquiry, RejectInquiry, ConfirmInquiry, getISAddeddata, fillterbyDate, filterByMonth, Alldata };
