import React, { useState, useEffect } from "react";
import axios from "axios";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    product: "",
    rating: "",
    contracts: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch suppliers on load
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/procurement/suppliers/getSupplier");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE
        await axios.put(`http://localhost:5000/api/procurement/suppliers/updateSupplier/${editingId}`, {
          name: formData.name,
          contactInfo: {
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
          },
          productCatalog: [formData.product],
          rating: formData.rating,
          contracts: formData.contracts,
        });
        setEditingId(null);
      } else {
        // CREATE
        await axios.post("http://localhost:5000/api/procurement/suppliers/addSupplier", {
          name: formData.name,
          contactInfo: {
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
          },
          productCatalog: [formData.product],
          rating: formData.rating,
          contracts: formData.contracts,
        });
      }

      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        product: "",
        rating: "",
        contracts: "",
      });

      fetchSuppliers();
    } catch (err) {
      console.error("Error saving supplier:", err);
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier._id);
    setFormData({
      name: supplier.name,
      phone: supplier.contactInfo?.phone || "",
      email: supplier.contactInfo?.email || "",
      address: supplier.contactInfo?.address || "",
      product: supplier.productCatalog?.[0] || "",
      rating: supplier.rating || "",
      contracts: supplier.contracts || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/procurement/suppliers/deleteSupplier/${id}`);
      fetchSuppliers();
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-6xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Supplier Management</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Supplier Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Product/Service"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            className="border p-2 rounded w-full"
            min="1"
            max="5"
          />
          <input
            type="text"
            name="contracts"
            value={formData.contracts}
            onChange={handleChange}
            placeholder="Contracts/Terms"
            className="border p-2 rounded w-full col-span-2"
          />
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              {editingId ? "Update Supplier" : "Add Supplier"}
            </button>
          </div>
        </form>

        {/* Supplier List */}
        <h2 className="text-lg font-semibold mb-3">Supplier List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Contracts</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id}>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.contactInfo?.phone}</td>
                <td className="border p-2">{s.contactInfo?.email}</td>
                <td className="border p-2">{s.contactInfo?.address}</td>
                <td className="border p-2">{s.productCatalog?.join(", ")}</td>
                <td className="border p-2">{s.rating}</td>
                <td className="border p-2">{s.contracts}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="px-3 py-1 border rounded bg-yellow-100 hover:bg-yellow-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-3 py-1 border rounded bg-red-100 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
