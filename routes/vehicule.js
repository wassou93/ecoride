const express=require("express");
const router=express.Router();
const vehiculecontroller = require("../controllers/vehiculecontroller");


router.post('/addvehicule',vehiculecontroller.add);
router.get('/show',vehiculecontroller.show);
router.put('/update/:id',vehiculecontroller.updated);
router.delete('/delete/:id',vehiculecontroller.deleted);

module.exports=router;