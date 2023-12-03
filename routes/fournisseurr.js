const express = require("express");
const router = express.Router();
//
const fournisseurcontroller = require("../controllers/fournisseurcontroller");
const piececontroller = require("../controllers/piececontroller");
const validate = require("../middl/validate");

const { json } = require("body-parser");

router.get('/', function(req, res, next) {
    res.send('Hello , Test  ');
});

router.get('/fournisseur', (req, res, next) => {
    res.render("Fournisseur");
})

//_________________Fournisseur___________________________________

router.post('/add', validate, fournisseurcontroller.add);
router.delete('/delete/:id', fournisseurcontroller.deleteUser);
router.put('/update/:id', fournisseurcontroller.update);
router.get('/show', fournisseurcontroller.show);
router.get('/find/:id', fournisseurcontroller.findUser);
router.get('/findName/:name', fournisseurcontroller.findUserName);

//_________________Pieces________________________________________

router.post('/addP', piececontroller.addP);
router.delete('/deleteP/:id', piececontroller.deleteP);
router.put('/updateP/:id', piececontroller.updateP);
router.get('/showP', piececontroller.showP);
router.get('/findP/:id', piececontroller.findP);
router.get('/findPN/:name', piececontroller.findPN);

//_________________Socket________________________________________

//router.put();


router.get("/pieces", (req, res, next) => {
    res.render("Pieces");
});
module.exports = router;