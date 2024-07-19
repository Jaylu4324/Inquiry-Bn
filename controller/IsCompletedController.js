const { BatchCompletedModel } = require("../model/BatchCompleted");

const Update = async (req, res) => {
  try {
    let UpdateId = req.query.UpdateId;
    let { Studentid, Date, Cetificate } = req.body;
    console.log(req.body, req.query);

    let copy = await BatchCompletedModel.findOne({ _id: UpdateId });
    if (!copy) {
      return res.status(404).send({ msg: "Batch not found" });
    }

    console.log(copy);
    let cp = JSON.parse(JSON.stringify(copy));
    let index = cp.StudentArray.findIndex((ele) => ele._id == Studentid);
    if (index === -1) {
      return res.status(404).send({ msg: "Student not found" });
    }

    cp.StudentArray[index].Date = Date;
    cp.StudentArray[index].Cetificate = Cetificate;

    const updateData = await BatchCompletedModel.updateOne({ _id: UpdateId }, cp);

    if (updateData.nModified === 0) {
      return res.status(400).send({ msg: "No changes made" });
    }

    res.status(201).send({ msg: "Data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error", error: error.message });
  }
}

const getAllData = async (req, res) => {
  try {
    let data = await BatchCompletedModel.find().populate("CourseId").populate("Astudent");
    res.status(201).send({ data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error", error: error.message });
  }
}

module.exports = { Update, getAllData };
