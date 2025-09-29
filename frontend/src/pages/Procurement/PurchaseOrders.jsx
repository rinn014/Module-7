import { useState, useEffect } from "react";

function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [form, setForm] = useState({
    requisitionId: "",
    supplierId: "",
    items: [{ itemId: "", quantity: 1, price: 0 }],
    status: "draft",
  });

  // Fetch purchase orders
  useEffect(() => {
    fetch("http://localhost:8000/api/purchase-orders/getPurchaseOrder")
      .then((res) => res.json())
      .then((data) => setPurchaseOrders(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle add
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8000/api/purchase-orders/addPurchaseOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const newPO = await res.json();
      if (!res.ok) return alert("Error: " + newPO.error);

      setPurchaseOrders([...purchaseOrders, newPO]);
      setForm({
        requisitionId: "",
        supplierId: "",
        items: [{ itemId: "", quantity: 1, price: 0 }],
        status: "draft",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Update status
  const handleUpdateStatus = async (id, status) => {
    const res = await fetch(
      `http://localhost:8000/api/purchase-orders/updatePurchaseOrder/${id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    const updated = await res.json();
    setPurchaseOrders(
      purchaseOrders.map((po) => (po._id === id ? updated : po))
    );
  };

  // Delete PO
  const handleDelete = async (id) => {
    await fetch(
      `http://localhost:8000/api/purchase-orders/deletePurchaseOrder/${id}`,
      { method: "DELETE" }
    );
    setPurchaseOrders(purchaseOrders.filter((po) => po._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purchase Order Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Requisition ID"
          value={form.requisitionId}
          onChange={(e) => setForm({ ...form, requisitionId: e.target.value })}
          required
        />
        <input
          placeholder="Supplier ID"
          value={form.supplierId}
          onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
          required
        />
        <input
          placeholder="Item ID"
          value={form.items[0].itemId}
          onChange={(e) =>
            setForm({
              ...form,
              items: [{ ...form.items[0], itemId: e.target.value }],
            })
          }
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.items[0].quantity}
          onChange={(e) =>
            setForm({
              ...form,
              items: [{ ...form.items[0], quantity: Number(e.target.value) }],
            })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.items[0].price}
          onChange={(e) =>
            setForm({
              ...form,
              items: [{ ...form.items[0], price: Number(e.target.value) }],
            })
          }
          required
        />
        <button type="submit">Add Purchase Order</button>
      </form>

      {/* LIST */}
      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: "15px", width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Requisition ID</th>
            <th>Supplier ID</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po) => (
            <tr key={po._id}>
              <td>{po.requisitionId}</td>
              <td>{po.supplierId}</td>
              <td>
                {po.items
                  .map(
                    (i) =>
                      `${i.itemId} (x${i.quantity} @ ₱${i.price?.toFixed(2)})`
                  )
                  .join(", ")}
              </td>
              <td>{po.status}</td>
              <td>
                {po.status === "draft" && (
                  <>
                    <button onClick={() => handleUpdateStatus(po._id, "sent")}>
                      Send
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(po._id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {po.status === "sent" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(po._id, "confirmed")}
                    >
                      Confirm
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(po._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseOrders;
