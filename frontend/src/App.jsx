import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Procurement from "./pages/Dashboard/Procurement";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/procurement" element={<Procurement />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
