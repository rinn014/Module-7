import React from "react";

const Suppliers = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Supplier Management</h2>
      <p className="mb-6 text-gray-600">Manage supplier details and performance.</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Supplier Name</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">ABC Tires</td>
            <td className="border p-2">0917-123-4567</td>
            <td className="border p-2">★★★★☆</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;
