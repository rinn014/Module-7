import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b">
      {/* Left side: Title */}
      <h1 className="text-lg font-bold">ERP System</h1>

      {/* Right side: Welcome + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, User</span>
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
