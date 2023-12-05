const fournisseur = require("../models/fournisseur");
const Fournisseur = require("../models/fournisseur");
const Piece = require("../models/pieces");




//_________________________________________________________________1:First _Part (Fournisseur-Crud)_______________________________________________________________________________


// Function to add a new Fournisseur
async function add(req, res, next) {
    try {
        const fournisseur = new Fournisseur(req.body);
        await fournisseur.save();
        res.status(200).send("Fournisseur add");
    } catch (err) {
        console.log(err);
    }
}


// Function to delete a Fournisseur
async function deleteUser(req, res, next) {
    try {
        const data = await fournisseur.findByIdAndDelete(req.params.id);
        res.send("removed");
    } catch (err) {
        // Handle errors here
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Function to update a Fournisseur
async function update(req, res, next) {
    try {
        const data = await Fournisseur.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {}
}



// Function to get all  the Fournisseurs
async function show(req, res, next) {
    try {
        const data = await Fournisseur.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}


// Function to find a Fournisseur by ID
async function findUser(req, res, next) {
    try {
        const data = await fournisseur.findById(req.params.id);
        res.send(data);
    } catch (err) {}
}


// Function to find a Fournisseur by name
async function findUserName(req, res, next) {
    try {
        const data = await fournisseur.findOne(req.params);
        res.send(data);
    } catch (err) {}
}






//_________________________________________________________________2:Second_Part (Socket)_________________________________________________________________________________________



// Inside the affichesocket function
async function affichesocket(data) {
    const { entityType, id } = data;

    try {
        let result;

        // Check if id is provided, if not, fetch all data
        if (!id) {
            result = await fetchAllDetails(entityType);
        } else if (entityType.toLowerCase() === 'fournisseur') {
            result = await fetchFournisseurDetails(id);
        } else if (entityType.toLowerCase() === 'pieces') {
            result = await fetchPiecesDetails(id);
        } else {
            throw new Error('Invalid entityType');
        }

        return result;
    } catch (error) {
        console.error('Error in affichesocket:', error);
        throw error; // Propagate the error to handle it on the client side
    }
}

// Fetch all details for the given entityType
async function fetchAllDetails(entityType) {
    try {
        let result;

        if (entityType.toLowerCase() === 'fournisseur') {
            result = await Fournisseur.find();
        } else if (entityType.toLowerCase() === 'pieces') {
            result = await Piece.find();
        } else {
            throw new Error('Invalid entityType');
        }

        return { data: result }; // Wrap the result in an object
    } catch (error) {
        console.error('Error in fetchAllDetails:', error);
        throw error; // Propagate the error to handle it on the client side
    }
}

// Fetch Fournisseur details by ID
async function fetchFournisseurDetails(id) {
    return await Fournisseur.findById(id);
}

// Fetch Pieces details by ID
async function fetchPiecesDetails(id) {
    return await Piece.findById(id);
}



//________________________________________________________________________________________________________________________________________________________________________________




module.exports = {
    add,
    deleteUser,
    update,
    show,
    findUser,
    findUserName,
    affichesocket


};