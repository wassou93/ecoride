const express = require("express");
const router = express.Router();
const validate = require("../middl/validate");
const { json } = require("body-parser");
const offrecontroller = require("../controllers/offrecontroller");
const typecontroller = require("../controllers/typecontroller");
const offre = require("../models/offre");
router.get('/', function(req, res, next) 
{  
     res.send('Hello , Test');  
});
router.get('/offre', (req, res, next) => 
{ 
    res.render("Offre"); 
})
//_________________Offre__________________________

router.post('/add', validate, offrecontroller.add);
router.delete('/delete/:id', offrecontroller.deleteOffre);
router.put('/update/:id', offrecontroller.update);
router.get('/show', offrecontroller.show);
router.get('/find/:id', offrecontroller.findUser);
router.get('/findName/:name',  offrecontroller.findUserName); 

//_________________Type____________________________

router.post('/addT', typecontroller.addT);
router.delete('/deleteT/:id', typecontroller.deleteT);
router.put('/updateT/:id', typecontroller.updateT);
router.get('/showT', typecontroller.showT);
router.get('/findT/:id',  typecontroller.findT);
router.get('/findTO/:name',  typecontroller.findTO);

//_________________Socket___________________________

router.get("/offre", (req, res, next) => {
    res.render("Offre");
});

module.exports = router;