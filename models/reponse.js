const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reponse = new Schema({
    contenu: String,
  date: { type: Date, default: Date.now },
    
});
module.exports = mongoose.model("reponse", Reponse);