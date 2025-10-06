const express = require('express');
const router = express.Router();
const FinanceController = require('../controllers/finance.controller');

// Endpoint to receive invoice data from Procurement
router.post('/recordInvoice', FinanceController.recordInvoice);

// Endpoint to get invoices
router.get('/invoices', FinanceController.getInvoices);

module.exports = router;