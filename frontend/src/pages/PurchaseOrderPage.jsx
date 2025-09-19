import React, { useState } from "react";

function PurchaseOrderPage() {
  const [orders, setOrders] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const addOrder = () => {
    if (!supplier || !item || !quantity) return;
    const newOrder = {
      id: orders.length + 1,
      supplier,
      item,
      quantity,
      status: "Pending",
      created: new Date().toLocaleDateString(),
    };
    setOrders([...orders, newOrder]);
    setSupplier("");
    setItem("");
    setQuantity("");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Purchase Order Management</h1>
        <p className="text-gray-600">Manage purchase orders issued to suppliers.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Purchase Order</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={addOrder}
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-400 transition"
          >
            Add Order
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Purchase Orders List</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.supplier}</td>
                <td className="p-3">{order.item}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No purchase orders created yet.</p>
        )}
      </div>
    </div>
  );
}

export default PurchaseOrderPage;