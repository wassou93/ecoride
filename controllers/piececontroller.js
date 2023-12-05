const Piece = require("../models/pieces");




//_________________________________________________________________1:First _Part (Piece-Crud)_______________________________________________________________________________


// Function to add a new Piece
async function addP(req, res, next) {
    try {
        const piece = new Piece(req.body);
        await piece.save();
        res.status(200).send("Piece add");
    } catch (err) {
        console.log(err);
    }
}

// Function to delete a Piece
async function deleteP(req, res, next) {
    try {
        const data = await Piece.findByIdAndDelete(req.params.id);
        res.send("removed");
    } catch (err) {
        // Handle errors here
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


// Function to update a Piece
async function updateP(req, res, next) {
    try {
        const data = await Piece.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {}
}


// Function to get all  the Pieces
async function showP(req, res, next) {
    try {
        const data = await Piece.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

// Function to find a Piece by ID
async function findP(req, res, next) {
    try {
        const data = await Piece.findById(req.params.id);
        res.send(data);
    } catch (err) {}
}


// Function to find a Piece by Name
async function findPN(req, res, next) {
    try {
        const data = await Piece.findOne(req.params);
        res.send(data);
    } catch (err) {}
}



//____________________________________________________________________2: seconde Part (Socket)______________________________________________________________________________________




//__________________________________________________________________________________________________________________________________________________________________________________

module.exports = {
    addP,
    deleteP,
    updateP,
    showP,
    findP,
    findPN,



};