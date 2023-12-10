const Type = require("../models/type");

//________________________________________________________________Type-Crud_______________________________________________________________________________

// Fonction ajout une nouveau type

async function addT(req, res, next) 
{
    try 
    {
        const nouveauType = new Type(req.body);
        await nouveauType.save();
        res.status(200).send("Type ajouté");
    } 
    catch (err) 
    {
        console.log(err);
    }
}

// Fonction suppression type d'offre

async function deleteT(req, res, next) 
{
    try 
    {
        const data = await Type.findByIdAndDelete(req.params.id);
        res.send("type d'offre supprimé");
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Fonction modification type d'offre

async function updateT(req, res, next) 
{
    try 
    {
        const data = await Type.findByIdAndUpdate(req.params.id, req.body);
        res.send("Type d'offre modifié !");
    } 
    catch (err) {}
}

// Fonction affiche type d'offre
async function showT(req, res, next) 
{
    try 
    {
        const data = await Type.find();
        res.json(data);
    } 
    catch (err) 
    {
        console.log(err);
    }
}

// Fonction recherche type d'offre avec ID
async function findT(req, res, next) 
{
    try 
    {
        const data = await Type.findById(req.params.id);
        res.send(data);
    } 
    catch (err) {}
}

// Fonction recherche  type d'offre par nom 
async function findTO(req, res, next) 
{
    try 
    {
        const data = await  Type.findOne(req.params);
        res.send(data);
    } 
    catch (err) {}
}


module.exports = { addT, deleteT,updateT, showT,findT,findTO};