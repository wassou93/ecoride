const Reclamation = require("../model/reclamation");
async function addReclamation(req, res, next) {
  try {
    console.log("body :" + JSON.stringify(req.body));
    const reclamation = new Reclamation(req.body);
    await reclamation.save();
    res.send("Reclamation added");
  } catch (err) {
    console.log(err);
    }
}

async function showReclamations(req, res, next) {
  try {
    const data = await Reclamation.find();
    res.json(data);
  } catch (err) {
    console.log(err);
     }
}
async function getbyid(req, res, next) {
  try {
    const data = await Reclamation.findById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}

async function updateReclamation(req, res, next) {
  try {
    await Reclamation.findByIdAndUpdate(req.params.id, req.body);
    res.send("Reclamation updated");
  } catch (err) {
    console.log(err);
  }
}

async function deleteReclamation(req, res, next) {
  try {
    await Reclamation.findByIdAndDelete(req.params.id);
    res.send("Reclamation deleted");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addReclamation,
  showReclamations,
  updateReclamation,
  deleteReclamation,
  getbyid,
};
