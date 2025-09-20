// src/components/layouts/SideMenu.jsx
import { Link } from "react-router-dom";

const SideMenu = () => (
  <aside className="h-full p-6">
    <ul className="space-y-4 text-base">
      <li><Link to="/procurement" className="hover:underline">Procurement</Link></li>
      <li><Link to="/procurement/requisition" className="hover:underline">Requisition</Link></li>
      <li><Link to="/procurement/suppliers" className="hover:underline">Suppliers</Link></li>
      <li><Link to="/procurement/purchase-orders" className="hover:underline">Purchase Orders</Link></li>
      <li><Link to="/procurement/invoices" className="hover:underline">Invoices</Link></li>
    </ul>
  </aside>
);
export default SideMenu;
