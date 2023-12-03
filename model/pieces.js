// Importing the mongoose module
var mongo = require("mongoose");

// Defining the Schema class
const Schema = mongo.Schema;

// Creating a new Schema for the classroom
const pieces = new Schema({

    // Piece Name
    PName: String,

    // The Fourniseuur ID of the classroom
    FID: String,

    // Etat Stock
    Stock: Number,
})
module.exports = mongo.model("Pieces", pieces);