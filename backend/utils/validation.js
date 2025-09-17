const Joi = require("joi");

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
        transactionType: Joi.string().valid("stock-in", "stock-out").required(),
        quantity: Joi.number().integer().positive().required(),
        date: Joi.date().default(Date.now),
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

// Export all validators
module.exports = {
    validateInventoryItem,
    validateTransaction,
    validateWarehouse,
    validateWarehouseTransfer,
};
