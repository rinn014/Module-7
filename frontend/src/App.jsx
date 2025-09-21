import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Procurement from "./pages/Dashboard/Procurement";
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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
