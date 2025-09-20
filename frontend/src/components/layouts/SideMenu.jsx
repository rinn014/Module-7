import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-xl font-semibold mb-6">Modules</h2>
      <ul className="space-y-3">
        <li>
          <Link
            to="/procurement"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Procurement
          </Link>
        </li>
        <li>
          <Link
            to="/suppliers"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Suppliers
          </Link>
        </li>
        <li>
          <Link
            to="/purchase-orders"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Purchase Orders
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
