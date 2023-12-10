const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reclamation = new Schema({
  
  titre: String,
  description: String,
  date: { type: Date, default: Date.now },
  statut: { type: String, enum: ["En attente", "En cours", "Résolue"], default: "En attente" },
  priorite: { type: String, enum: ["Basse", "Moyenne", "Haute"], default: "Moyenne" },
 
});


module.exports = mongo.model("reclamation", Reclamation);