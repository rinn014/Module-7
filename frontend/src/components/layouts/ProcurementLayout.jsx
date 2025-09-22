// frontend/src/components/layouts/ProcurementLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProcurementLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ padding: "16px", borderBottom: "1px solid #ddd", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
        Procurement Module
      </header>

      {/* Navigation */}
      <nav style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "12px", borderBottom: "1px solid #ddd", background: "#f9f9f9" }}>
        <Link to="/procurement/suppliers">Suppliers</Link>
        <Link to="/procurement/requisitions">Requisitions</Link>
        <Link to="/procurement/purchase-orders">Purchase Orders</Link>
        <Link to="/procurement/invoices">Invoices</Link>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
};

export default ProcurementLayout;
