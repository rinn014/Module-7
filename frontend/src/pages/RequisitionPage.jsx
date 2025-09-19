import React, { useState } from "react";

function RequisitionPage() {
  const [requisitions, setRequisitions] = useState([]);
  const [requester, setRequester] = useState("");
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");

  const addRequisition = () => {
    if (!requester || !itemId || !quantity) return;
    const newReq = {
      id: requisitions.length + 1,
      requester,
      status: "Pending",
      items: `${itemId} x${quantity}`,
      created: new Date().toLocaleDateString(),
    };
    setRequisitions([...requisitions, newReq]);
    setRequester("");
    setItemId("");
    setQuantity("");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Requisition Management</h1>
        <p className="text-gray-600">Create and manage requisitions efficiently.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">New Requisition</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Requester"
            value={requester}
            onChange={(e) => setRequester(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <input
            type="text"
            placeholder="Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <button
            onClick={addRequisition}
            className="bg-yellow-500 text-gray-900 font-semibold rounded-lg px-4 py-2 hover:bg-yellow-400 transition"
          >
            Add Requisition
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Requisitions List</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Requester</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{req.id}</td>
                <td className="p-3">{req.requester}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                    {req.status}
                  </span>
                </td>
                <td className="p-3">{req.items}</td>
                <td className="p-3">{req.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {requisitions.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No requisitions added yet.</p>
        )}
      </div>
    </div>
  );
}

export default RequisitionPage;