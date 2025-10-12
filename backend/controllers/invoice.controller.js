const Invoice = require("../models/Invoice");
const PurchaseOrder = require("../models/PurchaseOrder");

//Create Invoice (Goods Receipt equivalent)
exports.createInvoice = async (req, res) => {
  try {
    const { poId, receivedItems, receivedBy, condition, notes } = req.body;

    const newInvoice = new Invoice({
      poId,
      receivedItems,
      receivedBy,
      condition,
      notes,
    });

    await newInvoice.save();

    // Update PO status when invoice (receipt) is created
    await PurchaseOrder.findByIdAndUpdate(poId, { status: "delivered" });

    res.status(201).json(newInvoice);
  } catch (err) {
    console.error("Create Invoice Error:", err);
    res.status(500).json({ error: err.message });
  }
};

//Get all Invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("poId", "poNumber totalAmount status")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete Invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Invoice not found" });
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

