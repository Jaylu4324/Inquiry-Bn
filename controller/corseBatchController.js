const model = require("../model/corseBatchShcema")
const {CourseInquirymodel} = require("../model/corseinquiryshcema");



const addBatch = async (req, res) => {
    console.log(req.body);
    let { EventId, StuName } = req.body;

    const data = new model({
        EventId,
        StuName,
        isCompleted: false
    });

    try {
        const data1 = await data.save();
        console.log("Saved batch:", data1);

        // Create an array of student IDs to filter the CourseInquirymodel
        let arr = StuName.map(ele => ele._id);

        // Fetch the documents that need to be updated
        const students = await CourseInquirymodel.find({ _id: { $in: arr } });

        // Update the 'flag' array for each student
        const updatePromises = students.map(student => {
            let shouldSave = false; // Flag to check if we need to save the document
            student.flag.forEach(flag => {
                StuName.forEach(stu => {
                    if (stu._id.equals(student._id) && stu.Course.includes(flag.Course) && !flag.isAdded) {
                        flag.isAdded = true;
                        shouldSave = true; // Mark that this student needs to be saved
                    }
                });
            });
            return shouldSave ? student.save() : Promise.resolve(); // Save only if there are changes
        });

        // Await all updates
        const updateResults = await Promise.all(updatePromises);
        console.log(`${updateResults.filter(res => res).length} documents were updated.`);

        res.send({ msg: "Batch Added", data1 });
    } catch (err) {
        console.error('Error:', err);
        res.send({ err });
    }
};

module.exports = { addBatch };


const updateBatch = (req, res) => {
    model.findOne({ _id: req.query.id })
        .then(prevdata => {
            if (prevdata && prevdata.StuName.length > 0) {
                let ids = prevdata.StuName.map(ele => ele._id);
                return CourseInquirymodel.updateMany({ _id: { $in: ids } }, { $set: { isAdded: false } });
            }
        })
        .then(() => {
            let { StuName, EventId } = req.body;
            
            if (StuName.length > 0) {
                return model.updateOne({ _id: req.query.id }, { StuName, EventId })
                    .then(() => {
                        let id1 = StuName.map(ele => ele._id);
                        return CourseInquirymodel.updateMany({ _id: { $in: id1 } }, { $set: { isAdded: true } });
                    })
                    .then(() => {
                        res.send({ msg: " reg Data set successfully" });
                    });
            } else {
                return model.updateOne({ _id: req.query.id }, { StuName, EventId })
                    .then(() => {
                        res.send({ msg: "Please provide some data" });
                    });
            }
        })
        .catch(err => {
            console.error('Error:', err);
            res.send({ err });
        });
};

const deleteBatch = (req, res) => {
    const batchId = req.query.id;
    model.findByIdAndDelete(batchId)
        .then(deletedBatch => {
            if (deletedBatch) {
                const studentIds = deletedBatch.StuName.map(student => student._id);
                return CourseInquirymodel.updateMany({ _id: { $in: studentIds } }, { $set: { isAdded: false } })
                    .then(() => {
                        res.send({ msg: "reg Batch Deleted and isAdded flag set to false for associated students" });
                    });
            } else {
                res.status(404).send({ error: "Batch not found" });
            }
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).send({ error: "Error deleting batch" });
        });
};

const displayBatch = (req, res) => {
    model.find({EventId:req.query.id}).populate('EventId')
        .then(data => {
            res.send({ msg: "Display reg Batch", data });
        })
        .catch(err => {
            console.error('Error:', err);
            res.send({ err });
        });
};

const completedBatch = (req, res) => {
    model.findOne({ _id: req.query.id })
        .then(data => {
            if (data) {
                let obj = JSON.parse(JSON.stringify(data));
                obj.isCompleted = true;
                return model.updateOne({ _id: req.query.id }, obj)
                    .then(() => {
                        res.send({ msg: "isCompleted flag set", isCompleted: obj.isCompleted });
                    });
            } else {
                res.status(404).send({ error: "Batch not found" });
            }
        })
        .catch(err => {
            console.error('Error:', err);
            res.send({ err });
        });
};

const displayCompletedBatch = (req, res) => {
    model.find({ isCompleted: true })
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            console.error('Error:', err);
            res.send({ err });
        });
};

module.exports = { addBatch, updateBatch, deleteBatch, displayBatch, completedBatch, displayCompletedBatch };
