
const Reservation=require("../models/reservation");

async function add(req,res,next){
    try {
        console.log(req.body)
        const reservation=new Reservation(req.body);
        await reservation.save();
        res.status(200).json({ message: 'Successfully added reservation' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to add reservation' });
    }
}


async function show(req,res,next){
    try {
        const data=await Reservation.find();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}


async function updated(req,res,next){
    try {
        await Reservation.findByIdAndUpdate(req.params.id,req.body);
        res.send("Reservation updated successfully ");
    }catch(err){
        console.log(err);
    }
}


async function deleted(req,res,next){
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.send("Reservation deleted successfully ");
    }catch(err){
        console.log(err);
    }
}
module.exports={add,show,updated, deleted};