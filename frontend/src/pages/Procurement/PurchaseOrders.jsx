import React, { useState } from "react";

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    supplier: "",
    item: "",
    quantity: "",
    poDate: "",
    deliveryDate: "",
    status: "Sent",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders, formData]);
    setFormData({
      supplier: "",
      item: "",
      quantity: "",
      poDate: "",
      deliveryDate: "",
      status: "Sent",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Purchase Orders</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Supplier Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            placeholder="Item"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="poDate"
            value={formData.poDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option>Sent</option>
            <option>Confirmed</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <div className="flex justify-end">
            <button type="submit" className="border px-4 py-2 rounded hover:bg-gray-100">
              Create PO
            </button>
          </div>
        </form>

        {/* PO List */}
        <h2 className="text-lg font-semibold mb-3">Purchase Order List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Supplier</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">PO Date</th>
              <th className="border p-2">Delivery Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="border p-2">{order.supplier}</td>
                <td className="border p-2">{order.item}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">{order.poDate}</td>
                <td className="border p-2">{order.deliveryDate}</td>
                <td className="border p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrders;
