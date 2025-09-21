import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Procurement from "./pages/Dashboard/Procurement";
import Suppliers from "./pages/Procurement/Suppliers";
import Requisition from "./pages/Procurement/Requisition";
import PurchaseOrders from "./pages/Procurement/PurchaseOrders";
import Invoices from "./pages/Procurement/Invoices";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Procurement menu */}
        <Route path="/procurement" element={<Procurement />} />

        {/* Sub-modules */}
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/requisition" element={<Requisition />} />
        <Route path="/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </Router>
  );
}

export default App;
