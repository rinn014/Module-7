const express = require("express");
const router = express.Router();
const poController = require("../controllers/purchaseOrder.controller");

// CRUD
router.post("/addPurchaseOrder", poController.createPurchaseOrder);
router.get("/getPurchaseOrder", poController.getPurchaseOrders);
router.get("/getPurchaseOrder/:id", poController.getPurchaseOrderById);

// update status (e.g. delivered, cancelled)
router.put("/updatePurchaseOrder/:id/status", poController.updatePurchaseOrderStatus);  
router.delete("/deletePurchaseOrder/:id", poController.deletePurchaseOrder);

module.exports = router;