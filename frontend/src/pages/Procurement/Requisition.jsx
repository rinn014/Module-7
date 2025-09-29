import { useState, useEffect } from "react";

function Requisition() {
  const [requisitions, setRequisitions] = useState([]);
  const [form, setForm] = useState({
    requester: "",
    items: [{ itemId: "", quantity: 1 }],
  });

  // Fetch requisitions
  useEffect(() => {
    fetch("http://localhost:8000/api/requisitions/getRequisition")
      .then(res => res.json())
      .then(data => setRequisitions(data))
      .catch(err => console.error(err));
  }, []);

  // Add requisition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/requisitions/addRequisition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newReq = await res.json();
      if (!res.ok) return alert("Error: " + newReq.error);
      setRequisitions([...requisitions, newReq]);
      setForm({ requester: "", items: [{ itemId: "", quantity: 1 }] });
    } catch (err) {
      console.error(err);
    }
  };

  // Approve / Reject requisition
  const handleUpdateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:8000/api/requisitions/updateRequisition/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setRequisitions(requisitions.map(r => r._id === id ? updated : r));
  };

  // Delete requisition
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/requisitions/deleteRequisition/${id}`, { method: "DELETE" });
    setRequisitions(requisitions.filter(r => r._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purchase Requisition</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Requester"
          value={form.requester}
          onChange={(e) => setForm({ ...form, requester: e.target.value })}
          required
        />
        <input
          placeholder="Item ID"
          value={form.items[0].itemId}
          onChange={(e) => setForm({ ...form, items: [{ ...form.items[0], itemId: e.target.value }] })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.items[0].quantity}
          onChange={(e) => setForm({ ...form, items: [{ ...form.items[0], quantity: Number(e.target.value) }] })}
          required
        />
        <button type="submit">Add Requisition</button>
      </form>

      {/* LIST */}
      <table border="1" cellPadding="8" style={{ marginTop: "15px", width: "100%", borderCollapse: "collapse" }}>
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
              <td>{r.items.map(i => `${i.itemId} (x${i.quantity})`).join(", ")}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "pending" && (
                  <>
                    <button onClick={() => handleUpdateStatus(r._id, "approved")}>Approve</button>
                    <button onClick={() => handleUpdateStatus(r._id, "rejected")}>Reject</button>
                  </>
                )}
                <button onClick={() => handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requisition;
