import { useState, useEffect } from "react";

function Requisition() {
  // ✅ State para sa requisitions
  const [requisitions, setRequisitions] = useState([]);

  // ✅ State para sa form
  const [form, setForm] = useState({
    requester: "",
    items: [], // array of { itemId, quantity }
  });

  const [newItemId, setNewItemId] = useState(""); // pang add ng bagong item
  const [newQuantity, setNewQuantity] = useState(""); 
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch requisitions sa backend
  useEffect(() => {
    fetch("http://localhost:5000/api/requisitions/getRequisition")
      .then(res => res.json())
      .then(data => setRequisitions(data))
      .catch(err => console.error("Error fetching requisitions:", err));
  }, []);

  // ✅ Add requisition (or update kung nag e-edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      requester: form.requester,
      items: form.items,
      status: "pending", // default
    };

    try {
      if (editingId) {
        // UPDATE
        const res = await fetch(
          `http://localhost:5000/api/requisitions/updateRequisition/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const updated = await res.json();
        if (!res.ok) return alert("Error: " + updated.error);

        setRequisitions(requisitions.map(r => (r._id === editingId ? updated : r)));
        setEditingId(null);
      } else {
        // CREATE
        const res = await fetch("http://localhost:5000/api/requisitions/addRequisition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newReq = await res.json();
        if (!res.ok) return alert("Error: " + newReq.error);

        setRequisitions([...requisitions, newReq]);
      }

      // Reset form
      setForm({ requester: "", items: [] });
      setNewItemId("");
      setNewQuantity("");
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong. Check server logs.");
    }
  };

  // ✅ Add item sa form bago isubmit
  const handleAddItem = () => {
    if (newItemId.trim() !== "" && newQuantity > 0) {
      setForm({
        ...form,
        items: [...form.items, { itemId: newItemId.trim(), quantity: Number(newQuantity) }],
      });
      setNewItemId("");
      setNewQuantity("");
    } else {
      alert("Please enter valid Item ID and Quantity.");
    }
  };

  // ✅ Remove item sa form bago isubmit
  const handleRemoveItem = (index) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  // ✅ Edit requisition
  const handleEdit = (req) => {
    setForm({
      requester: req.requester,
      items: req.items,
    });
    setEditingId(req._id);
  };

  // ✅ Delete requisition
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this requisition?")) return;

    await fetch(`http://localhost:5000/api/requisitions/deleteRequisition/${id}`, {
      method: "DELETE",
    });

    setRequisitions(requisitions.filter(r => r._id !== id));
  };

  // ✅ Update status (Approve or Reject)
  const handleStatusChange = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/requisitions/updateRequisition/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    if (!res.ok) return alert("Error: " + updated.error);

    setRequisitions(requisitions.map(r => (r._id === id ? updated : r)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purchase Requisition</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#f9f9f9",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          marginBottom: "20px",
          maxWidth: "600px",
        }}
      >
        <label>Requester</label>
        <input
          value={form.requester}
          onChange={(e) => setForm({ ...form, requester: e.target.value })}
          placeholder="Requester name"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Add Item</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            value={newItemId}
            onChange={(e) => setNewItemId(e.target.value)}
            placeholder="Item ID"
            style={{ flex: 2, padding: "8px" }}
          />
          <input
            type="number"
            min="1"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            placeholder="Qty"
            style={{ flex: 1, padding: "8px" }}
          />
          <button type="button" onClick={handleAddItem}>+ Add</button>
        </div>

        {/* Show items before submit */}
        <ul>
          {form.items.map((it, i) => (
            <li key={i}>
              {it.itemId} — {it.quantity}{" "}
              <button type="button" onClick={() => handleRemoveItem(i)}>x</button>
            </li>
          ))}
        </ul>

        <button type="submit" style={{ marginTop: "10px" }}>
          {editingId ? "Update Requisition" : "Add Requisition"}
        </button>
      </form>

      {/* LIST */}
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Requester</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.map((r) => (
            <tr key={r._id}>
              <td>{r.requester}</td>
              <td>
                {r.items.map((it, i) => (
                  <div key={i}>
                    {it.itemId} — {it.quantity}
                  </div>
                ))}
              </td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Edit</button>
                <button onClick={() => handleDelete(r._id)}>Delete</button>
                <button onClick={() => handleStatusChange(r._id, "approved")}>Approve</button>
                <button onClick={() => handleStatusChange(r._id, "rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requisition;
