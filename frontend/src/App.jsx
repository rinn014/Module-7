import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Procurement from "./pages/Dashboard/Procurement";
import Requisition from "./pages/Procurement/Requisition";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/procurement" element={<Procurement />} />
        <Route path="/procurement/requisition" element={<Requisition />} />
      </Routes>
    </Router>
  );
}

export default App;
