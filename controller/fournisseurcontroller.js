const fournisseur = require("../model/fournisseur");
const Fournisseur = require("../model/fournisseur");

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






//________________________________________________________________________________________________________________________________________________________________________________




module.exports = {
    add,
    deleteUser,
    update,
    show,
    findUser,
    findUserName


};