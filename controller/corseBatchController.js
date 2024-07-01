const model = require("../model/corseBatchShcema")
const {CourseInquirymodel} = require("../model/corseinquiryshcema");


const addBatch = (req, res) => {
    console.log(req.body);
    let { EventId, StuName } = req.body;
    let course11 = req.query.course;
  
    const data = new model({
      EventId,
      StuName,
      isCompleted: false
    });
  
    StuName.forEach(ele => {
      CourseInquirymodel.findOne({ _id: ele._id })
        .then(cp => {
          if (cp) {
            let index = cp.Testarr.findIndex(ele1 => ele1.Course === course11);
            console.log("index ", index, "cp", cp);
            if (index !== -1) {
              cp.Testarr[index].isAdded = true;
              CourseInquirymodel.updateOne({ _id: ele._id }, cp)
                .then(() => {
                  console.log("\n\n\n\nchanged new  ", cp);
                })
                .catch(er => {
                  console.log(er);
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  
    data.save()
      .then(data1 => {
        res.send({ msg: "Batch Added", data1 });
      })
      .catch(err => {
        console.error('Error:', err);
        res.send({ err });
      });
  };
  










  const updateBatch = (req, res) => {
    model.findOne({ _id: req.query.id })
      .then(prevdata => {
        if (prevdata && prevdata.StuName.length > 0) {
          let ids = prevdata.StuName.map(ele => ele._id);
          return CourseInquirymodel.updateMany({ _id: { $in: ids } }, { $set: { 'Testarr.$[elem].isAdded': false } }, { arrayFilters: [{ 'elem.Course': req.query.course }] });
        }
      })
      .then(() => {
        let { StuName, EventId } = req.body;
        let course11 = req.query.course;
  
        if (StuName.length > 0) {
          return model.updateOne({ _id: req.query.id }, { StuName, EventId })
            .then(() => {
              StuName.forEach(ele => {
                CourseInquirymodel.findOne({ _id: ele._id })
                  .then(cp => {
                    if (cp) {
                      let index = cp.Testarr.findIndex(ele1 => ele1.Course === course11);
                      console.log("index ", index, "cp", cp);
                      if (index !== -1) {
                        cp.Testarr[index].isAdded = true;
                        CourseInquirymodel.updateOne({ _id: ele._id }, cp)
                          .then(() => {
                            console.log("\n\n\n\nchanged new  ", cp);
                          })
                          .catch(er => {
                            console.log(er);
                          });
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
              res.send({ msg: "reg Data set successfully" });
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
    const course11 = req.query.course;
  
    model.findByIdAndDelete(batchId)
      .then(deletedBatch => {
        if (deletedBatch) {
          const studentIds = deletedBatch.StuName.map(student => student._id);
  
          // Update each student's CourseInquirymodel document
          const updatePromises = studentIds.map(studentId => {
            return CourseInquirymodel.findOne({ _id: studentId })
              .then(cp => {
                if (cp) {
                  let index = cp.Testarr.findIndex(ele1 => ele1.Course === course11);
                  if (index !== -1) {
                    cp.Testarr[index].isAdded = false;
                    return CourseInquirymodel.updateOne({ _id: studentId }, cp);
                  }
                }
              });
          });
  
          // Execute updates sequentially
          return updatePromises.reduce((promiseChain, currentPromise) => {
            return promiseChain.then(() => currentPromise);
          }, Promise.resolve())
            .then(() => {
              res.send({ msg: "Batch deleted and isAdded flag set to false for associated students" });
            })
            .catch(err => {
              console.error('Error updating students:', err);
              res.status(500).send({ error: "Error updating students" });
            });
        } else {
          res.status(404).send({ error: "Batch not found" });
        }
      })
      .catch(err => {
        console.error('Error deleting batch:', err);
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
