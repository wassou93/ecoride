const Reponse = require("../../ecoride/models/reponse");
async function addReponse(req, res, next) {
  try {
    console.log("body :" + JSON.stringify(req.body));
    const reponse = new Reponse(req.body);
    await reponse.save();
    res.send("Reponse added");
  } catch (err) {
    console.log(err);
  }
}

async function showReponses(req, res, next) {
  try {
    const data = await Reponse.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}
async function getbyid(req, res, next) {
  try {
    const data = await Reponse.findById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
}

async function updateReponse(req, res, next) {
  try {
    await Reponse.findByIdAndUpdate(req.params.id, req.body);
    res.send("Reponse updated");
  } catch (err) {
    console.log(err);
  }
}

async function deleteReponse(req, res, next) {
  try {
    await Reponse.findByIdAndDelete(req.params.id);
    res.send("Reponse deleted");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addReponse,
  showReponses,
  updateReponse,
  deleteReponse,
  getbyid
};
