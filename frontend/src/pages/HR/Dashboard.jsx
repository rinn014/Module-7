import React from "react";

export default function Dashboard({ data }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <p className="mb-2">Quick overview of EMS data:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Registered Employees: {data.employees.length}</li>
        <li>Departments: {data.departments.length}</li>
        <li>Leaves: {data.leaves.length}</li>
      </ul>
    </div>
  );
}
