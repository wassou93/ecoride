// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the classroom
const fournisseur = new Schema({
    // Fournisseur Name
    FName: String,

})
module.exports = mongo.model("Fournisseur", fournisseur);