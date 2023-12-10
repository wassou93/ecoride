// Import bibliothèque mongoose
var mongo = require("mongoose");

// Déclaration Schema
const Schema = mongo.Schema;

//Création nouvelle Schema pour type
const type = new Schema({

    type_offre: String,

})
module.exports = mongo.model("Type", type);