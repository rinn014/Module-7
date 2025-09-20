import React, { useState } from "react";

const Requisition = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    justification: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = { ...formData, status: "Pending" };
    setRequisitions([...requisitions, newReq]);
    setFormData({ item: "", quantity: "", justification: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Purchase Requisition</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
        <textarea
          name="justification"
          value={formData.justification}
          onChange={handleChange}
          placeholder="Justification"
          className="border p-2 rounded w-full"
          required
        ></textarea>
        <button type="submit" className="border px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Justification</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.map((req, index) => (
            <tr key={index}>
              <td className="border p-2">{req.item}</td>
              <td className="border p-2">{req.quantity}</td>
              <td className="border p-2">{req.justification}</td>
              <td className="border p-2">{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requisition;
