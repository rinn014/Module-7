import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Procurement from "./pages/Dashboard/Procurement";
import Suppliers from "./pages/Procurement/Suppliers";
import Requisition from "./pages/Procurement/Requisition";
import PurchaseOrders from "./pages/Procurement/PurchaseOrders";
import Invoices from "./pages/Procurement/Invoices";

import Inventory from "./pages/Dashboard/Inventory";
import Transaction from "./pages/Dashboard/Transaction";
import Warehouse from "./pages/Dashboard/Warehouse";

import Finance from "./pages/Finance/FinanceHead";
import Payroll from "./pages/Finance/EmployeePayroll";
import Supplier from "./pages/Finance/SupplierReport";
import Customer from "./pages/Finance/CustomerReport";
import Report from "./pages/Finance/FinanceReport";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/procurement/suppliers" element={<Suppliers />} />
          <Route path="/procurement/requisition" element={<Requisition />} />
          <Route path="/procurement/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/procurement/invoices" element={<Invoices />} />

          <Route path="/finance/general-finance" element={<Finance />} />
          <Route path="/finance/employee-payroll" element={<Payroll />} />
          <Route path="/finance/supplier-report" element={<Supplier />} />
          <Route path="/finance/customer-report" element={<Customer/>} />
          <Route path="/finance/finance-report" element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;