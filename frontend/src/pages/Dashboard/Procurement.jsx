// src/pages/Dashboard/Procurement.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProcurementLayout from "../../components/layouts/ProcurementLayout"; // ✅ import layout

const Procurement = () => {
  return (
    <ProcurementLayout>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Procurement Module</h2>
        <p className="mb-6 text-gray-600">Choose a function to manage:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Link
            to="/procurement/requisition"
            className="border p-6 rounded shadow-sm hover:shadow-md transition block"
          >
            <h3 className="font-semibold text-lg mb-2">Purchase Requisition</h3>
            <p className="text-gray-600 text-sm">
              Initiates internal requests for materials or services.
            </p>
          </Link>

          <Link
            to="/procurement/suppliers"
            className="border p-6 rounded shadow-sm hover:shadow-md transition block"
          >
            <h3 className="font-semibold text-lg mb-2">Supplier Management</h3>
            <p className="text-gray-600 text-sm">
              Maintains supplier info and evaluates performance.
            </p>
          </Link>

          <Link
            to="/procurement/purchase-orders"
            className="border p-6 rounded shadow-sm hover:shadow-md transition block"
          >
            <h3 className="font-semibold text-lg mb-2">Purchase Orders</h3>
            <p className="text-gray-600 text-sm">
              Handles creation and monitoring of purchase orders.
            </p>
          </Link>

          <Link
            to="/procurement/invoices"
            className="border p-6 rounded shadow-sm hover:shadow-md transition block"
          >
            <h3 className="font-semibold text-lg mb-2">Invoices</h3>
            <p className="text-gray-600 text-sm">
              View and manage invoices with validation.
            </p>
          </Link>
        </div>
      </div>
    </ProcurementLayout>
  );
};

export default Procurement;
