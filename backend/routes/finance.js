const express = require('express');
const router = express.Router();
const FinanceController = require('../controllers/finance.controller');

router.get('/inventory-transactions', FinanceController.getInventoryTransactions);
router.post('/inventory-transaction', FinanceController.handleInventoryTransaction);
router.get('/invoices', FinanceController.getInvoices);
router.post('/recordInvoice', FinanceController.recordInvoice);

module.exports = router;