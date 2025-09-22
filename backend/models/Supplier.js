const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: true }, // simple string for phone/email/address
    productCatalog: [String], // list of products/items they supply
    rating: { type: Number, min: 0, max: 5, default: 0 }, // performance rating
    contractTerms: { type: String }, // payment/delivery terms
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", SupplierSchema);
