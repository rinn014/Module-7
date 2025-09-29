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

const App = () => {
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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
