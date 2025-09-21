// src/pages/Procurement/Suppliers.jsx
import React, { useState } from "react";
import ProcurementLayout from "../../components/layouts/ProcurementLayout";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    product: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuppliers([...suppliers, formData]);
    setFormData({ name: "", contact: "", product: "", rating: "" });
  };

  return (
    <ProcurementLayout>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Supplier Management</h2>

        {/* Supplier Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Info"
            className="border p-2 rounded w-full"
            required
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
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            className="border p-2 rounded w-full"
          />
          <button type="submit" className="border px-4 py-2 rounded">
            Add Supplier
          </button>
        </form>

        {/* Supplier Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Product/Service</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index}>
                <td className="border p-2">{supplier.name}</td>
                <td className="border p-2">{supplier.contact}</td>
                <td className="border p-2">{supplier.product}</td>
                <td className="border p-2">{supplier.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProcurementLayout>
  );
};

export default Suppliers;
