const express = require("express");
const router = express.Router();
const reclamationController = require("../../ecoride/controllers/reclamationController");

router.post("/addReclamation", reclamationController.addReclamation);
router.get("/showReclamations", reclamationController.showReclamations);
router.get("/getbyid/:id", reclamationController.getbyid);
router.delete("/deleteReclamation/:id", reclamationController.deleteReclamation);
router.post("/updateReclamation/:id", reclamationController.updateReclamation);
module.exports = router;
