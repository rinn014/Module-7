import React, { useState } from "react";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    poNumber: "",
    deliveryReceipt: "",
    invoiceNumber: "",
    notes: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoices([...invoices, formData]);
    setFormData({
      poNumber: "",
      deliveryReceipt: "",
      invoiceNumber: "",
      notes: "",
      status: "Pending",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Invoices</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
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
            name="deliveryReceipt"
            value={formData.deliveryReceipt}
            onChange={handleChange}
            placeholder="Delivery Receipt Number"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="Invoice Number"
            className="border p-2 rounded w-full"
            required
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Verification Notes / Remarks"
            className="border p-2 rounded w-full"
          ></textarea>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option>Pending</option>
            <option>Matched</option>
            <option>Mismatch</option>
          </select>
          <div className="flex justify-end">
            <button type="submit" className="border px-4 py-2 rounded hover:bg-gray-100">
              Save Invoice
            </button>
          </div>
        </form>

        {/* Invoice List */}
        <h2 className="text-lg font-semibold mb-3">Invoice List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">PO Number</th>
              <th className="border p-2">Delivery Receipt</th>
              <th className="border p-2">Invoice Number</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, index) => (
              <tr key={index}>
                <td className="border p-2">{inv.poNumber}</td>
                <td className="border p-2">{inv.deliveryReceipt}</td>
                <td className="border p-2">{inv.invoiceNumber}</td>
                <td className="border p-2">{inv.notes}</td>
                <td className="border p-2">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
