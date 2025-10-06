import React, { useEffect, useState } from 'react';

export default function SupplierReport() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/finance/invoices')
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className='justify-items-center m-5'>Supplier Report</h1>
      <nav className="flex gap-6 mb-5 text-blue-700 justify-center">
        {/* ...existing nav... */}
      </nav>
      <table className="table-auto w-full border border-gray-400 border-collapse [&_*]:border [&_*]:border-gray-400 [&_*]:px-4 [&_*]:py-2">
        <thead className="bg-gray-100">
          <tr>
            <th>Invoice #</th>
            <th>Supplier</th>
            <th>Total Amount</th>
            <th>Date Issued</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.supplierId}</td>
              <td>{inv.totalAmount}</td>
              <td>{new Date(inv.dateIssued).toLocaleDateString()}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}