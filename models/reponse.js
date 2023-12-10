const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reponse = new Schema({
    contenu: String,
  date: { type: Date, default: Date.now },
    
});
module.exports = mongo.model("reponse", Reponse);