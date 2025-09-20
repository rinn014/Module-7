import React from "react";

const PurchaseOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Purchase Orders</h2>
      <p className="mb-6 text-gray-600">Track and manage purchase orders.</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">PO Number</th>
            <th className="border p-2">Supplier</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">PO-001</td>
            <td className="border p-2">ABC Tires</td>
            <td className="border p-2">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrders;
