const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse.controller");

// Warehouse Management
router.post("/addWarehouse", warehouseController.addWarehouse);         // Create warehouse
router.post("/assignItem", warehouseController.assignItem);        // Assign item to warehouse
router.post("/transferItem", warehouseController.transferItem);    // Transfer between warehouses

module.exports = router;
