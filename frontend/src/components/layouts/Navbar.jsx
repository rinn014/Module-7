import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex items-center justify-between">
      <h1 className="text-lg font-bold">ERP System</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, User</span>
        <button className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
