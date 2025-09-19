import React, { useState } from "react";

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const addSupplier = () => {
    if (!name || !contact || !email) return;
    const newSupplier = {
      id: suppliers.length + 1,
      name,
      contact,
      email,
      status: "Active",
      created: new Date().toLocaleDateString(),
    };
    setSuppliers([...suppliers, newSupplier]);
    setName("");
    setContact("");
    setEmail("");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Supplier Management</h1>
        <p className="text-gray-600">Maintain and manage supplier information.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Supplier</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Supplier Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <button
            onClick={addSupplier}
            className="bg-yellow-500 text-gray-900 font-semibold rounded-lg px-4 py-2 hover:bg-yellow-400 transition"
          >
            Add Supplier
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Suppliers List</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{supplier.id}</td>
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.contact}</td>
                <td className="p-3">{supplier.email}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {supplier.status}
                  </span>
                </td>
                <td className="p-3">{supplier.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {suppliers.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No suppliers added yet.</p>
        )}
      </div>
    </div>
  );
}

export default SupplierPage;
