const Requisition = require("../models/Requisition");
const { validateRequisition } = require("../utils/validation");

// Create a new purchase requisition
exports.createRequisition = async (req, res) => {
  try {
    const { error, value } = validateRequisition(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const requisition = new Requisition(value);
    await requisition.save();

    res.status(201).json(requisition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all requisitions
exports.getRequisitions = async (req, res) => {
  try {
    const requisitions = await Requisition.find().populate("items.itemId", "name sku");
    res.json(requisitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get requisition by ID
exports.getRequisitionById = async (req, res) => {
  try {
    const requisition = await Requisition.findById(req.params.id).populate("items.itemId", "name sku");
    if (!requisition) return res.status(404).json({ error: "Requisition not found" });
    res.json(requisition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update requisition (e.g., approval or rejection)
exports.updateRequisition = async (req, res) => {
  try {
    const { error, value } = validateRequisition(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await Requisition.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updated) return res.status(404).json({ error: "Requisition not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete requisition
exports.deleteRequisition = async (req, res) => {
  try {
    const deleted = await Requisition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Requisition not found" });

    res.json({ message: "Requisition deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
