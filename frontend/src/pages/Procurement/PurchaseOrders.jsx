// src/pages/Procurement/PurchaseOrders.jsx
import React, { useState } from "react";
import ProcurementLayout from "../../components/layouts/ProcurementLayout";

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    poNumber: "",
    supplier: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders, formData]);
    setFormData({ poNumber: "", supplier: "", status: "Pending" });
  };

  return (
    <ProcurementLayout>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Purchase Orders</h2>

        {/* Purchase Order Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="poNumber"
            value={formData.poNumber}
            onChange={handleChange}
            placeholder="PO Number"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Supplier"
            className="border p-2 rounded w-full"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option>Pending</option>
            <option>Sent</option>
            <option>Confirmed</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button type="submit" className="border px-4 py-2 rounded">
            Add PO
          </button>
        </form>

        {/* Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">PO Number</th>
              <th className="border p-2">Supplier</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="border p-2">{order.poNumber}</td>
                <td className="border p-2">{order.supplier}</td>
                <td className="border p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProcurementLayout>
  );
};

export default PurchaseOrders;
