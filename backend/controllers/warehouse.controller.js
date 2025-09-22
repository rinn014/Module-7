const Warehouse = require("../models/Warehouse");
const Inventory = require("../models/Inventory");
const { validateWarehouse, validateWarehouseTransfer } = require("../utils/validation");

// Add new warehouse
exports.addWarehouse = async (req, res) => {
  const { error } = validateWarehouse(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    res.status(201).json({ message: "Warehouse added successfully", warehouse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all warehouses
exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find()
      .populate("items.itemId", "name sku category quantity");
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get warehouse by ID
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id)
      .populate("items.itemId", "name sku category quantity");
    if (!warehouse) return res.status(404).json({ error: "Warehouse not found" });
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign item to warehouse
exports.assignItem = async (req, res) => {
  try {
    const { warehouseId, itemId, quantity, zone } = req.body;

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) return res.status(404).json({ error: "Warehouse not found" });

    const item = await Inventory.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    warehouse.items.push({ itemId, quantity, zone });
    await warehouse.save();

    item.quantity += quantity;
    await item.save();

    res.json({ message: "Item assigned to warehouse", warehouse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Transfer item between warehouses
exports.transferItem = async (req, res) => {
  const { error } = validateWarehouseTransfer(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const { fromWarehouseId, toWarehouseId, itemId, quantity } = req.body;

    const fromWarehouse = await Warehouse.findById(fromWarehouseId);
    const toWarehouse = await Warehouse.findById(toWarehouseId);

    if (!fromWarehouse || !toWarehouse) {
      return res.status(404).json({ error: "One or both warehouses not found" });
    }

    // Deduct from source
    const fromItem = fromWarehouse.items.find(i => i.itemId.toString() === itemId);
    if (!fromItem || fromItem.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock in source warehouse" });
    }
    fromItem.quantity -= quantity;

    // Add to destination
    const toItem = toWarehouse.items.find(i => i.itemId.toString() === itemId);
    if (toItem) {
      toItem.quantity += quantity;
    } else {
      toWarehouse.items.push({ itemId, quantity });
    }

    await fromWarehouse.save();
    await toWarehouse.save();

    res.json({ message: "Item transferred successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete warehouse
exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ error: "Warehouse not found" });

    // Prevent deletion if warehouse still has items
    if (warehouse.items.length > 0) {
      return res.status(400).json({ error: "Cannot delete warehouse with assigned items" });
    }

    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
