const Joi = require("joi");

/* ================================
   MODULE 1 (Inventory)
================================ */

// Inventory Validation
const validateInventoryItem = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    sku: Joi.string().alphanum().min(3).max(20).required(),
    description: Joi.string().allow("", null),
    category: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
  });
  return schema.validate(data);
};

// Transaction Validation
const validateTransaction = (data) => {
  const schema = Joi.object({
    itemId: Joi.string().hex().length(24).required(), // MongoDB ObjectId
    type: Joi.string().valid("stock-in", "stock-out").required(),
    quantity: Joi.number().integer().positive().required(),
    remarks: Joi.string().allow("", null),
    expiryDate: Joi.date().allow(null),
    purchaseOrderId: Joi.string().hex().length(24).allow(null), // link to Module 3
  });
  return schema.validate(data);
};

// Warehouse Validation
const validateWarehouse = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(200).required(),
  });
  return schema.validate(data);
};

const validateWarehouseTransfer = (data) => {
  const schema = Joi.object({
    itemId: Joi.string().hex().length(24).required(),
    fromWarehouse: Joi.string().required(),
    toWarehouse: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
  });
  return schema.validate(data);
};

/* ================================
   MODULE 3 (Procurement)
================================ */

// Supplier Validation
const validateSupplier = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    contactInfo: Joi.string().allow("", null),
    rating: Joi.number().min(0).max(5).default(0),
    contractTerms: Joi.string().allow("", null),
  });
  return schema.validate(data);
};

// Purchase Requisition Validation
const validateRequisition = (data) => {
  const schema = Joi.object({
    itemId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().min(1).required(),
    requestedBy: Joi.string().required(),
    status: Joi.string()
      .valid("pending", "approved", "rejected")
      .default("pending"),
  });
  return schema.validate(data);
};

// Purchase Order Validation
const validatePurchaseOrder = (data) => {
  const schema = Joi.object({
    requisitionId: Joi.string().hex().length(24).required(),
    supplierId: Joi.string().hex().length(24).required(),
    orderDate: Joi.date().default(Date.now),
    status: Joi.string()
      .valid("sent", "confirmed", "delivered", "cancelled")
      .default("sent"),
  });
  return schema.validate(data);
};

// Invoice Validation
const validateInvoice = (data) => {
  const schema = Joi.object({
    purchaseOrderId: Joi.string().hex().length(24).required(),
    invoiceNumber: Joi.string().required(),
    amount: Joi.number().positive().required(),
    invoiceDate: Joi.date().default(Date.now),
    status: Joi.string().valid("pending", "paid", "cancelled").default("pending"),
  });
  return schema.validate(data);
};

module.exports = {
  // Module 1
  validateInventoryItem,
  validateTransaction,
  validateWarehouse,
  validateWarehouseTransfer,
  // Module 3
  validateSupplier,
  validateRequisition,
  validatePurchaseOrder,
  validateInvoice,
};
