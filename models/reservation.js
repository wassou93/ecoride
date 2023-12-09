var mongo=require("mongoose");   

const Schema = mongo.Schema;    
const Reservation = new Schema({              
        date_debut:Date,
        date_fin:Date,
        lieu_depart:String,
        lieu_destination:String,
        nbr_place:Number,
        prix:Number,
        vehicules: [{ type: Schema.Types.ObjectId, ref: 'Vehicule' }]
        
    }); 
    module.exports=mongo.model("reservation",Reservation)  