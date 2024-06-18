const {model,EventBatchVAlidation} = require("../model/eventBatch");
const model1 = require("../model/eventInquiryShcema");

const addBatch = (req, res) => {
    let { EventId, StuName } = req.body;
    
    const data = new model({
        EventId,
        StuName,
        isCompleted: false
    });

    const { error, value } = EventBatchVAlidation.validate({  });

    if(error){
        res.status(400).JSON({ isSuccess: false, error })
        
    }
else{

    data.save()
        .then((data1) => {
            let arr = StuName.map(ele => ele._id);
            const filter = { _id: { $in: arr } };
            const update = { $set: { isAdded: true } };
    
            return model1.updateMany(filter, update)
                .then(result => {
                    console.log(`${result.modifiedCount} documents were updated.`);
                    res.status(201).JSON({isSuccess: true, msg: "Batch Added", data1 });
                });
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).JSON({isSuccess: false, err });
        });
}

};

const updateBatch = (req, res) => {
let {StuName} = req.body

const { error, value } = EventBatchVAlidation.validate({ StuName  });


    model.findOne({ _id: req.query.id })
        .then(prevdata => {
            if (prevdata && prevdata.StuName.length > 0) {
                let ids = prevdata.StuName.map(ele => ele._id);
                return model1.updateMany({ _id: { $in: ids } }, { $set: { isAdded: false } });
            }
        })
        .then(() => {
            let { StuName, EventId } = req.body;
            
            if (StuName.length > 0) {
                return model.updateOne({ _id: req.query.id }, { StuName, EventId })
                    .then(() => {
                        let id1 = StuName.map(ele => ele._id);
                        return model1.updateMany({ _id: { $in: id1 } }, { $set: { isAdded: true } });
                    })
                    .then(() => {
                        res.send({ msg: "Data set successfully" });
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
                return model1.updateMany({ _id: { $in: studentIds } }, { $set: { isAdded: false } })
                    .then(() => {
                        res.send({ msg: "Batch Deleted and isAdded flag set to false for associated students" });
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
            res.send({ msg: "Display Batch", data });
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
