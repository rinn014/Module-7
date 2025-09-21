import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Procurement from "./pages/Dashboard/Procurement";
import Requisition from "./pages/Procurement/Requisition";
import Suppliers from "./pages/Procurement/Suppliers";
import PurchaseOrders from "./pages/Procurement/PurchaseOrders";
import Invoices from "./pages/Procurement/Invoices";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/procurement" element={<Procurement />} />
        <Route path="/procurement/requisition" element={<Requisition />} />
        <Route path="/procurement/suppliers" element={<Suppliers />} />
        <Route path="/procurement/purchase-orders" element={<PurchaseOrders />} />
         <Route path="/procurement/invoices" element={<Invoices />} />
      </Routes>
    </Router>
  );
}

export default App;
