const FinanceInvoice = require("../models/FinanceInvoice"); // Create this model

exports.recordInvoice = async (req, res) => {
  try {
    const { invoiceNumber, totalAmount, supplierId, dateIssued, purchaseOrderId, items, status } = req.body;
    // Save invoice data to Finance DB
    const financeInvoice = new FinanceInvoice({
      invoiceNumber,
      totalAmount,
      supplierId,
      dateIssued,
      purchaseOrderId,
      items,
      status
    });
    await financeInvoice.save();
    res.status(201).json({ message: 'Invoice recorded in Finance.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await FinanceInvoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};