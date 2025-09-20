import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Procurement from "./pages/Dashboard/Procurement";
import ProcurementLayout from "./components/layouts/ProcurementLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Exclusive layout for Procurement module */}
        <Route
          path="/procurement"
          element={
            <ProcurementLayout>
              <Procurement />
            </ProcurementLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;