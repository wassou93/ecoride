const express = require("express");
const router = express.Router();
const validate = require("../middl/validate");
const { json } = require("body-parser");

const typecontroller = require("../controllers/typecontroller");
const type = require("../models/type");

router.get('/', function(req, res, next) 
{  
     res.send('Hello , Test');  
});

router.get('/type', (req, res, next) => 
{ 
    res.render("Type"); 
})

//____________________Type__________________________

router.post('/addT', typecontroller.addT);
router.delete('/deleteT/:id', typecontroller.deleteT);
router.put('/updateT/:id', typecontroller.updateT);
router.get('/showT', typecontroller.showT);
router.get('/findT/:id',  typecontroller.findT);
router.get('/findTO/:name',  typecontroller.findTO);

//___________________Socket__________________________

router.get("/type", (req, res, next) => {
    res.render("Type");
});

module.exports = router;