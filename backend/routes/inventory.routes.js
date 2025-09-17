const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");

// Inventory CRUD
router.post("/add", inventoryController.addItem);          // Create new item
router.put("/update/:id", inventoryController.updateItem); // Update item
router.get("/get-items", inventoryController.getAllItems);          // Get all items
router.get("/get-item/:id", inventoryController.getItemById);       // Get item by ID
router.delete("/delete-item/:id", inventoryController.deleteItem);     // Delete item

module.exports = router;
