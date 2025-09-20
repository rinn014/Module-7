import React from "react";

const Invoices = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
      <p className="mb-6 text-gray-600">View and validate invoices.</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Invoice No.</th>
            <th className="border p-2">PO No.</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">INV-1001</td>
            <td className="border p-2">PO-001</td>
            <td className="border p-2">Matched</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
