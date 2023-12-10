const express = require("express");
const router = express.Router();
const reponseController = require("../../ecoride/controllers/reponsecontroller");

router.post("/addReponse", reponseController.addReponse);
router.get("/showReponses", reponseController.showReponses);
router.get("/getbyid/:id", reponseController.getbyid);
router.delete("/deleteReponse/:id", reponseController.deleteReponse);
router.post("/updateReponse/:id", reponseController.updateReponse);
module.exports = router;
