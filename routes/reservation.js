const express=require("express");
const router=express.Router();
const Reservationcontroller = require("../controllers/reservationcontroller");


router.post('/addreservation',Reservationcontroller.add);
router.get('/show',Reservationcontroller.show);
router.put('/update/:id',Reservationcontroller.updated);
router.delete('/delete/:id',Reservationcontroller.deleted);

router.get('/pagereservation',async (req,res,next)=>{  
    res.render("reservation");
   })
module.exports=router;