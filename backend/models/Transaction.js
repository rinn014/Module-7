const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  type: { type: String, enum: ["stock-in", "stock-out"], required: true },
  quantity: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
  remarks: String,
  expiryDate: Date
});

module.exports = mongoose.model("Transaction", TransactionSchema);
