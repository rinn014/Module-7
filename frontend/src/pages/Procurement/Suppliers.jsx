import React, { useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Supplier Management</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
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
            required
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
            required
          />
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Add Supplier
            </button>
          </div>
        </form>

        {/* Supplier List */}
        <h2 className="text-lg font-semibold mb-3">Supplier List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Product/Service</th>
              <th className="border p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s, index) => (
              <tr key={index}>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.contact}</td>
                <td className="border p-2">{s.product}</td>
                <td className="border p-2">{s.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
