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
