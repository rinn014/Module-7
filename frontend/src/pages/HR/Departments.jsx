import React, { useState } from "react";

export default function Departments({ data, setData }) {
  const [dept, setDept] = useState({ name: "", description: "", head: "" });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date or name
  const [selected, setSelected] = useState(null); // for details modal

  // Add Department
  const addDepartment = () => {
    if (!dept.name) return;
    const newDept = { id: Date.now(), ...dept };
    setData({ ...data, departments: [...data.departments, newDept] });
    setDept({ name: "", description: "", head: "" });
  };

  // Delete Department
  const deleteDepartment = (id) => {
    setData({
      ...data,
      departments: data.departments.filter((d) => d.id !== id),
    });
  };

  // Edit Department
  const startEdit = (d) => {
    setEditing(d.id);
    setDept({
      name: d.name,
      description: d.description || "",
      head: d.head || "",
    });
  };

  const saveEdit = () => {
    setData({
      ...data,
      departments: data.departments.map((d) =>
        d.id === editing ? { ...d, ...dept } : d
      ),
    });
    setEditing(null);
    setDept({ name: "", description: "", head: "" });
  };

  // Filter & Sort
  const filtered = data.departments
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.id - a.id; // newest first
    });

  // Count employees per department
  const getEmployeeCount = (deptId) => {
    return data.employees
      ? data.employees.filter((emp) => emp.departmentId === deptId).length
      : 0;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>

      {/* Search & Sort */}
      <div className="flex space-x-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search department..."
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="date">Newest</option>
          <option value="name">A-Z</option>
        </select>
      </div>

      {/* Add / Edit Form */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          className="border p-2 rounded"
          value={dept.name}
          onChange={(e) => setDept({ ...dept, name: e.target.value })}
          placeholder="Department Name"
        />
        <input
          className="border p-2 rounded"
          value={dept.description}
          onChange={(e) => setDept({ ...dept, description: e.target.value })}
          placeholder="Description"
        />
        <input
          className="border p-2 rounded"
          value={dept.head}
          onChange={(e) => setDept({ ...dept, head: e.target.value })}
          placeholder="Head of Department"
        />
      </div>
      <div className="mb-6">
        {editing ? (
          <button
            onClick={saveEdit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={addDepartment}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Department
          </button>
        )}
      </div>

      {/* Department List */}
      <ul className="space-y-2">
        {filtered.map((d) => (
          <li
            key={d.id}
            className="p-4 border rounded flex justify-between items-center bg-gray-50"
          >
            <div>
              <p className="font-bold text-lg">{d.name}</p>
              <p className="text-sm text-gray-600">
                {d.head ? `Head: ${d.head}` : "No Head Assigned"}
              </p>
              <p className="text-xs text-gray-500">
                {getEmployeeCount(d.id)} employees
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setSelected(d)}
                className="text-purple-600 hover:underline"
              >
                View
              </button>
              <button
                onClick={() => startEdit(d)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteDepartment(d.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No departments found.</p>
      )}

      {/* Modal for Department Details */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <p className="text-gray-700 mb-2">
              {selected.description || "No description available"}
            </p>
            <p className="text-gray-700 mb-2">
              Head: {selected.head || "Not assigned"}
            </p>
            <p className="text-gray-500 text-sm">
              Employees: {getEmployeeCount(selected.id)}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
