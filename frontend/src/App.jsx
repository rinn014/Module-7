import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RequisitionPage from "./pages/RequisitionPage";
import SupplierPage from "./pages/SupplierPage";
import PurchaseOrderPage from "./pages/PurchaseOrderPage";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold tracking-wide">Procurement</h2>
            <p className="text-sm text-gray-400">ERP Module 3</p>
          </div>
          <nav className="flex-1 p-6 space-y-4">
            <NavLink
              to="/requisitions"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-yellow-500 text-gray-900" : "hover:bg-gray-700"
                }`
              }
            >
              Requisitions
            </NavLink>
            <NavLink
              to="/suppliers"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-yellow-500 text-gray-900" : "hover:bg-gray-700"
                }`
              }
            >
              Suppliers
            </NavLink>
            <NavLink
              to="/purchase-orders"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-yellow-500 text-gray-900" : "hover:bg-gray-700"
                }`
              }
            >
              Purchase Orders
            </NavLink>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-yellow-500 text-gray-900" : "hover:bg-gray-700"
                }`
              }
            >
              Invoices
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/requisitions" element={<RequisitionPage />} />
            <Route path="/suppliers" element={<SupplierPage />} />
            <Route path="/purchase-orders" element={<PurchaseOrderPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;