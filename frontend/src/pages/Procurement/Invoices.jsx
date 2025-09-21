// src/pages/Procurement/Invoices.jsx
import React, { useState } from "react";
import ProcurementLayout from "../../components/layouts/ProcurementLayout";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    invoiceNo: "",
    poNumber: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvoices([...invoices, formData]);
    setFormData({ invoiceNo: "", poNumber: "", status: "Pending" });
  };

  return (
    <ProcurementLayout>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Invoices</h2>

        {/* Invoice Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="invoiceNo"
            value={formData.invoiceNo}
            onChange={handleChange}
            placeholder="Invoice Number"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="poNumber"
            value={formData.poNumber}
            onChange={handleChange}
            placeholder="PO Number"
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
            <option>Matched</option>
            <option>Mismatched</option>
          </select>
          <button type="submit" className="border px-4 py-2 rounded">
            Add Invoice
          </button>
        </form>

        {/* Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Invoice No.</th>
              <th className="border p-2">PO Number</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="border p-2">{invoice.invoiceNo}</td>
                <td className="border p-2">{invoice.poNumber}</td>
                <td className="border p-2">{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProcurementLayout>
  );
};

export default Invoices;
