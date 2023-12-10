
const Vehicule=require("../models/vehicule");

async function add(req,res,next){
    try {
        console.log(req.body)
        const vehicule=new Vehicule(req.body);
        await vehicule.save();
        res.status(200).json({ message: 'Successfully added vehicule' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to add vehicule' });
    }
}


async function show(req,res,next){
    try {
        const data=await Vehicule.find();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}


async function updated(req,res,next){
    try {
        await Vehicule.findByIdAndUpdate(req.params.id,req.body);
        res.send("Vehicule updated successfully ");
    }catch(err){
        console.log(err);
    }
}


async function deleted(req,res,next){
    try {
        await Vehicule.findByIdAndDelete(req.params.id);
        res.send("Vehicule deleted successfully ");
    }catch(err){
        console.log(err);
    }
}
module.exports={add,show,updated, deleted};