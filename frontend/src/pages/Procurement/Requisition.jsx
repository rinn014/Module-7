import React, { useState } from "react";
import ProcurementLayout from "../../components/layouts/ProcurementLayout";

const Requisition = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = { ...formData, status: "Pending" };
    setRequisitions([...requisitions, newReq]);
    setFormData({ item: "", quantity: "", description: "" });
  };

  return (
    <ProcurementLayout>
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
  <input
    type="text"
    name="purpose"
    value={formData.purpose || ""}
    onChange={handleChange}
    placeholder="Purpose (optional)"
    className="border p-2 rounded w-full"
  />
  <button type="submit" className="border px-4 py-2 rounded">
    Submit
  </button>
</form>


        {/* Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.map((req, index) => (
              <tr key={index}>
                <td className="border p-2">{req.item}</td>
                <td className="border p-2">{req.quantity}</td>
                <td className="border p-2">{req.purpose}</td>
                <td className="border p-2">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProcurementLayout>
  );
};

export default Requisition;
