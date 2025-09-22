<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";

const Procurement = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Procurement Module</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/suppliers" className="border p-6 rounded shadow hover:bg-gray-100">
          <h2 className="font-semibold">Supplier Management</h2>
          <p>Manage supplier details.</p>
        </Link>
        <Link to="/requisition" className="border p-6 rounded shadow hover:bg-gray-100">
          <h2 className="font-semibold">Purchase Requisition</h2>
          <p>Request for materials or services.</p>
        </Link>
        <Link to="/purchase-orders" className="border p-6 rounded shadow hover:bg-gray-100">
          <h2 className="font-semibold">Purchase Orders</h2>
          <p>Create and track purchase orders.</p>
        </Link>
        <Link to="/invoices" className="border p-6 rounded shadow hover:bg-gray-100">
          <h2 className="font-semibold">Invoices</h2>
          <p>View and manage invoices.</p>
        </Link>
      </div>
    </div>
  );
};

export default Procurement;
=======
import React from 'react'

const Procurement = () => {
  return (
      <div>Procurement Page</div>
  )
}

export default Procurement;
>>>>>>> module_1
