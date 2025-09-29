import { useState, useEffect } from "react";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [form, setForm] = useState({
    purchaseOrderId: "",
    supplierId: "",
    invoiceNumber: "",
    items: [],
    remarks: "",
  });

  // ✅ Fetch purchase orders for dropdown
  useEffect(() => {
    fetch("http://localhost:8000/api/purchase-orders/getPurchaseOrder")
      .then((res) => res.json())
      .then((data) => setPurchaseOrders(data))
      .catch((err) => console.error("Error fetching POs:", err));
  }, []);

  // ✅ Fetch invoices
  useEffect(() => {
    fetch("http://localhost:8000/api/invoices/getInvoice")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error("Error fetching invoices:", err));
  }, []);

  // ✅ Handle PO selection → auto-fill supplier & items
  const handleSelectPO = (poId) => {
    const po = purchaseOrders.find((p) => p._id === poId);
    if (po) {
      setForm({
        ...form,
        purchaseOrderId: po._id,
        supplierId: po.supplierId._id,
        items: po.items,
      });
    }
  };

  // ✅ Create invoice
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        purchaseOrderId: form.purchaseOrderId,
        supplierId: form.supplierId,
        invoiceNumber: form.invoiceNumber,
        items: form.items.map((i) => ({
          itemId: i.itemId,
          quantity: i.quantity,
          unitPrice: i.price,
        })),
        remarks: form.remarks,
      };

      const res = await fetch("http://localhost:8000/api/invoices/addInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const newInvoice = await res.json();
      if (!res.ok) return alert("Error: " + newInvoice.error);

      setInvoices([...invoices, newInvoice.invoice || newInvoice]); // invoice may be wrapped
      setForm({
        purchaseOrderId: "",
        supplierId: "",
        invoiceNumber: "",
        items: [],
        remarks: "",
      });
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong. Check server logs.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoices</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          background: "#f9f9f9",
          maxWidth: "600px",
        }}
      >
        <label>Purchase Order</label>
        <select
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={form.purchaseOrderId}
          onChange={(e) => handleSelectPO(e.target.value)}
          required
        >
          <option value="">-- Select Purchase Order --</option>
          {purchaseOrders.map((po) => (
            <option key={po._id} value={po._id}>
              {po._id} - {po.supplierId?.name}
            </option>
          ))}
        </select>

        <label>Invoice Number</label>
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={form.invoiceNumber}
          onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
          required
        />

        <label>Remarks</label>
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        />

        {/* Show items preview */}
        {form.items.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <h4>Items from PO:</h4>
            <ul>
              {form.items.map((i, idx) => (
                <li key={idx}>
                  Item: {i.itemId} | Qty: {i.quantity} | Price: {i.price}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" style={{ padding: "8px 15px" }}>
          Create Invoice
        </button>
      </form>

      {/* LIST */}
      <table
        border="1"
        cellPadding="8"
        style={{
          marginTop: "15px",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Invoice #</th>
            <th>Supplier</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.supplierId?.name || "N/A"}</td>
              <td>{inv.totalAmount}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;
