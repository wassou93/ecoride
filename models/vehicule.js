var mongo=require("mongoose");   

const Schema = mongo.Schema;  
const Vehicule = new Schema({    
        name_conducteur:String,           
        marque:String, 
        modele:String,
        matricule:Number,
        prix:Number,
        diponibilite:Boolean,
    }); 
    module.exports=mongo.model("vehicule",Vehicule)  