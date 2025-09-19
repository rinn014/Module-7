import React, { useState } from "react";

function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");

  const addInvoice = () => {
    if (!invoiceNumber || !supplier || !amount) return;
    const newInvoice = {
      id: invoices.length + 1,
      invoiceNumber,
      supplier,
      amount,
      status: "Unpaid",
      created: new Date().toLocaleDateString(),
    };
    setInvoices([...invoices, newInvoice]);
    setInvoiceNumber("");
    setSupplier("");
    setAmount("");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Invoice Management</h1>
        <p className="text-gray-600">Track and manage supplier invoices.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Invoice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Total Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={addInvoice}
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-400 transition"
          >
            Add Invoice
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Invoices List</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Invoice #</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{invoice.id}</td>
                <td className="p-3">{invoice.invoiceNumber}</td>
                <td className="p-3">{invoice.supplier}</td>
                <td className="p-3">₱{parseFloat(invoice.amount).toLocaleString()}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "Unpaid"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="p-3">{invoice.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No invoices recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default InvoicePage;