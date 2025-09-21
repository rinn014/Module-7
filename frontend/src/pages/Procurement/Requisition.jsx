import React, { useState } from "react";

const Requisition = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    purpose: "",
    requestedBy: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = { ...formData, status: "Pending" };
    setRequisitions([...requisitions, newReq]);
    setFormData({ item: "", quantity: "", purpose: "", requestedBy: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Purchase Requisition</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
            placeholder="Item Name"
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
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose of Request"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="requestedBy"
            value={formData.requestedBy}
            onChange={handleChange}
            placeholder="Requested By"
            className="border p-2 rounded w-full"
            required
          />
          <div className="flex justify-end">
            <button type="submit" className="border px-4 py-2 rounded hover:bg-gray-100">
              Submit
            </button>
          </div>
        </form>

        {/* Requisition List */}
        <h2 className="text-lg font-semibold mb-3">Requisition List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Item</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Requested By</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.map((req, index) => (
              <tr key={index}>
                <td className="border p-2">{req.item}</td>
                <td className="border p-2">{req.quantity}</td>
                <td className="border p-2">{req.purpose}</td>
                <td className="border p-2">{req.requestedBy}</td>
                <td className="border p-2">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requisition;
