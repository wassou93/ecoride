// Import bibliothèque mongoose
var mongo = require("mongoose");

// Déclaration Schema
const Schema = mongo.Schema;

//Création nouvelle Schema pour offre
const offre = new Schema({

    nom: String,
    description: String,
    prix: Number,
})
module.exports = mongo.model("Offre", offre);