const { Types } = require("mongoose");
const offre = require("../models/offre");
const Offre = require("../models/offre");


//________________________________________________________________Offre-Crud_______________________________________________________________________________


// Fonction ajout une nouvelle offre

async function add(req, res, next) 
{
    try 
    {
        const nouvelleOffre = new Offre(req.body);
        await nouvelleOffre.save();
        res.status(200).send("Offre ajouté");
    } 
    catch (err) 
    {
        console.log(err);
    }
}

// Fonction suppression offre

async function deleteOffre(req, res, next) 
{
    try 
    {
        const data = await offre.findByIdAndDelete(req.params.id);
        res.send("offre supprimé");
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Fonction modification offre

async function update(req, res, next) 
{
    try 
    {
        const data = await Offre.findByIdAndUpdate(req.params.id, req.body);
        res.send("Offre modifié !");
    } 
    catch (err) {}
}

// Fonction affiche offre
async function show(req, res, next) 
{
    try 
    {
        const data = await Offre.find();
        res.json(data);
    } 
    catch (err) 
    {
        console.log(err);
    }
}

// Fonction recherche offre avec ID
async function findUser(req, res, next) 
{
    try 
    {
        const data = await Offre.findById(req.params.id);
        res.send(data);
    } 
    catch (err) {}
}

// Fonction recherche offre par nom 
async function findUserName(req, res, next) 
{
    try 
    {
        const data = await  Offre.findOne(req.params);
        res.send(data);
    } 
    catch (err) {}
}

//________________________Socket_______________________


// Affiche Socket pour Offre
/*const affichesocketOffre = async (data) => {
    // Votre logique pour gérer la socket Offre
    return "Affiche Socket pour Offre : " + data;
};*/



const affichesocketOffre = async (data) => {
    try {
        const offreDetails = await Offre.findById(data.id);
        return offreDetails;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'offre :", error);
        throw error; // Propagez l'erreur pour la gérer ailleurs si nécessaire
    }
};


// Affiche Socket pour Type
const affichesocketType = async (data) => {
    // Votre logique pour gérer la socket Type
    return "Affiche Socket pour Type : " + data;
};


module.exports = { add,
                   deleteOffre,
                   update, 
                   show, 
                   findUser, 
                   findUserName, 
                   affichesocketOffre,
                   affichesocketType 
                };