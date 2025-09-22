import { useState, useEffect } from "react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    rating: 0,
    contractTerms: "",
    productCatalog: []
  });
  const [newProduct, setNewProduct] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ common input style
  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  // Fetch suppliers
  useEffect(() => {
    fetch("http://localhost:5000/api/suppliers/getSupplier")
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error("Error fetching suppliers:", err));
  }, []);

  // Add / Update supplier
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      contactInfo: `${form.phone} | ${form.email} | ${form.address}`,
      rating: Number(form.rating) || 0,
      contractTerms: form.contractTerms,
      productCatalog: form.productCatalog
    };

    try {
      if (editingId) {
        const res = await fetch(
          `http://localhost:5000/api/suppliers/updateSupplier/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const updated = await res.json();
        if (!res.ok) return alert("Error: " + updated.error);
        setSuppliers(suppliers.map(s => (s._id === editingId ? updated : s)));
        setEditingId(null);
      } else {
        const res = await fetch("http://localhost:5000/api/suppliers/addSupplier", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newSupplier = await res.json();
        if (!res.ok) return alert("Error: " + newSupplier.error);
        setSuppliers([...suppliers, newSupplier]);
      }

      // Reset form
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        rating: 0,
        contractTerms: "",
        productCatalog: []
      });
      setNewProduct("");
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong. Check server logs.");
    }
  };

  // Edit supplier
  const handleEdit = (supplier) => {
    const [phone = "", email = "", address = ""] =
      supplier.contactInfo?.split(" | ") || [];
    setForm({
      name: supplier.name,
      phone,
      email,
      address,
      rating: supplier.rating || 0,
      contractTerms: supplier.contractTerms || "",
      productCatalog: supplier.productCatalog || []
    });
    setEditingId(supplier._id);
  };

  // Delete supplier
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    await fetch(`http://localhost:5000/api/suppliers/deleteSupplier/${id}`, {
      method: "DELETE",
    });
    setSuppliers(suppliers.filter(s => s._id !== id));
  };

  // Add product to catalog
  const handleAddProduct = () => {
    if (newProduct.trim() !== "") {
      setForm({
        ...form,
        productCatalog: [...form.productCatalog, newProduct.trim()],
      });
      setNewProduct("");
    }
  };

  // Remove product from catalog
  const handleRemoveProduct = (product) => {
    setForm({
      ...form,
      productCatalog: form.productCatalog.filter((p) => p !== product),
    });
  };

  // Filter suppliers by search
  const filteredSuppliers = suppliers.filter((s) => {
    const query = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.productCatalog?.some((p) => p.toLowerCase().includes(query))
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Supplier Management</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
          maxWidth: "800px",
          background: "#f9f9f9",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "6px",
        }}
      >
        {/* Left column */}
        <div>
          <label>Supplier Name</label>
          <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

          <label>Phone</label>
          <input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <label>Email</label>
          <input style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <label>Address</label>
          <input style={inputStyle} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>

        {/* Right column */}
        <div>
          <label>Rating (0-5)</label>
          <input style={inputStyle} type="number" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />

          <label>Contract Terms</label>
          <input style={inputStyle} value={form.contractTerms} onChange={(e) => setForm({ ...form, contractTerms: e.target.value })} />

          <label>Products</label>
          <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
            <input style={{ ...inputStyle, marginBottom: 0 }} value={newProduct} onChange={(e) => setNewProduct(e.target.value)} placeholder="Add product" />
            <button type="button" onClick={handleAddProduct}>+ Add</button>
          </div>

          <ul style={{ paddingLeft: "18px" }}>
            {form.productCatalog.map((p, i) => (
              <li key={i}>
                {p}{" "}
                <button type="button" onClick={() => handleRemoveProduct(p)}>x</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit button */}
        <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            {editingId ? "Update Supplier" : "Add Supplier"}
          </button>
        </div>
        </form>

      {/* SEARCH */}
      <input
        style={inputStyle}
        placeholder="Search by name or product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      <table border="1" cellPadding="8" style={{ marginTop: "15px", width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Supplier Name</th>
            <th>Products</th>
            <th>Contact Info</th>
            <th>Rating</th>
            <th>Contract Terms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.productCatalog?.length > 0 ? s.productCatalog.join(", ") : "No products"}</td>
              <td>{s.contactInfo}</td>
              <td>{s.rating}</td>
              <td>{s.contractTerms}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
