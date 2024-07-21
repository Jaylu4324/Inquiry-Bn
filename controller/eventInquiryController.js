const { eventInquiryModel, EinquiryValidation } = require('../model/eventInquiryShcema');

const addEventInquiry = async (req, res) => {
    try {
        let {
            FullName,
            eventId,
            Contact,
            Email,
            Date,
            Description,
            CollageName,
            Interaction,
            FollowUp
        } = req.body;

        const { error, value } = EinquiryValidation.validate({
            FullName,
            Contact,
            Email,
            Date,
            Description,
            CollageName,
            Interaction,
            FollowUp
        });

        if (error) {
            return res.status(400).json({ isSuccess: false, error: error.details[0].message });
        }

        const data = new eventInquiryModel({
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
            isAdded: false,
            Interaction,
            FollowUp
        });

        const savedData = await data.save();
        res.status(201).json({ isSuccess: true, msg: "Event Inquiry Added", data: savedData });
    } catch (err) {
        res.status(500).json({ isSuccess: false, err: err.message });
    }
};

const updateEventinquiry = async (req, res) => {
    try {
        let {
            FullName,
            Contact,
            eventId,
            Email,
            Date,
            Description,
            CollageName,
            Interaction,
            FollowUp
        } = req.body;

        const { error, value } = EinquiryValidation.validate({
            FullName,
            Contact,
            Email,
            Date,
            Description,
            CollageName,
            Interaction,
            FollowUp
        });

        if (error) {
            return res.status(400).json({ isSuccess: false, error: error.details[0].message });
        }

        const updatedData = await eventInquiryModel.updateOne(
            { _id: req.query.id },
            { ...req.body, eventId: eventId._id }
        );

        res.status(200).json({ isSuccess: true, msg: "Event Inquiry Updated", data: updatedData });
    } catch (err) {
        res.status(500).json({ isSuccess: false, err: err.message });
    }
};

const deletEventinquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.findOne({ _id: req.query.id });
        if (!data) {
            return res.status(404).json({ msg: "Event Inquiry not found" });
        }

        data.isDeleted = true;

        const updatedData = await eventInquiryModel.updateOne({ _id: req.query.id }, data);
        res.status(200).json({ msg: "Event Inquiry Soft Deleted", data: updatedData });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const hardelet = async (req, res) => {
    try {
        const data = await eventInquiryModel.deleteOne({ _id: req.query.id });
        res.status(200).json({ msg: "Inquiry Deleted", data });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const displayAllEventInquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.find({ eventId: req.query.id });
        res.status(200).json({ msg: "Display All Event Inquiries", data });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const displayOnGoingEventInquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.find({ onGoing: true, isDeleted: false, eventId: req.query.id });
        res.status(200).json({ msg: "Display Ongoing Event Inquiries", data });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const displayRejectEventInquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.find({ Reject: true, isDeleted: false, eventId: req.query.id });
        res.status(200).json({ msg: "Display Rejected Event Inquiries", data });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const displayConfirmEventInquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.find({ Confirm: true, isDeleted: false, eventId: req.query.id });
        res.status(200).json({ msg: "Display Confirmed Event Inquiries", data });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const RejectEventInquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.findOne({ _id: req.query.id });
        if (!data) {
            return res.status(404).json({ msg: "Event Inquiry not found" });
        }

        data.onGoing = false;
        data.Confirm = false;
        data.Reject = true;

        const updatedData = await eventInquiryModel.updateOne({ _id: req.query.id }, data);
        res.status(200).json({ msg: "Event Inquiry Rejected", data: updatedData });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const ConfirmEventInquiry = async (req, res) => {
    try {
        const data = await eventInquiryModel.findOne({ _id: req.query.id });
        if (!data) {
            return res.status(404).json({ msg: "Event Inquiry not found" });
        }

        data.onGoing = false;
        data.Confirm = true;
        data.Reject = false;

        const updatedData = await eventInquiryModel.updateOne({ _id: req.query.id }, data);
        res.status(200).json({ msg: "Event Inquiry Confirmed", data: updatedData });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const eventIsAdded = async (req, res) => {
    try {
        const data = await eventInquiryModel.findOne({ _id: req.query.id });
        if (!data) {
            return res.status(404).json({ msg: "Event Inquiry not found" });
        }

        data.isAdded = !data.isAdded;

        const updatedData = await eventInquiryModel.updateOne({ _id: req.query.id }, data);
        res.status(200).json({ msg: "isAdded status toggled", isAdded: updatedData.isAdded });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const getISAddeddata = async (req, res) => {
    try {
        const data = await eventInquiryModel.find({
            Confirm: true,
            isAdded: false,
            isDeleted: false,
            eventId: req.query.id
        });
        res.status(200).json({ msg: "All IsAdded Data", data });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const sortBykey = async (req, res) => {
    try {
        let { eventId, key, sortBy, type } = req.query;
        let sortData;

        if (!eventId) {
            sortData = await eventInquiryModel.find({ [type]: true }).sort({ [key]: parseInt(sortBy) });
        } else {
            sortData = await eventInquiryModel.find({ eventId, [type]: true }).sort({ [key]: parseInt(sortBy) });
        }

        res.status(200).json({ sortData });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const filterByMonth = async (req, res) => {
    try {
        let { month, sortby, type } = req.query;

        const filterData = await eventInquiryModel.find({
            [type]: true,
            $expr: { $eq: [{ $month: "$Date" }, parseInt(month)] }
        }).sort({ Date: parseInt(sortby) });

        res.status(200).json(filterData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const commonSearch = async (req, res) => {
    try {
        let { FullName, type } = req.query;
        const populatedata = await eventInquiryModel.find({ [type]: true, isDeleted: false });

        const filterdata = populatedata.filter(ele => ele.FullName && ele.FullName.toLowerCase() === FullName.toLowerCase());
        res.status(200).json({ filterdata });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

const Alldata = async (req, res) => {
    try {
        let { key } = req.query;
        const allData = await eventInquiryModel.find({ [key]: true });
        res.status(200).json({ allData });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

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
    hardelet,
    sortBykey,
    filterByMonth,
    commonSearch,
    Alldata
};
