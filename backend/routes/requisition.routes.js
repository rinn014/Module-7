const express = require("express");
const router = express.Router();
const requisitionController = require("../controllers/requisition.controller");

// CRUD
router.post("/addRequisition", requisitionController.createRequisition);
router.get("/getRequisition", requisitionController.getRequisitions);
router.get("/getRequisition/:id", requisitionController.getRequisitionById);
// approve/reject requisition
router.put("/updateRequisition/:id/status", requisitionController.updateRequisition);
router.delete("/deleteRequisition/:id", requisitionController.deleteRequisition);

module.exports = router;