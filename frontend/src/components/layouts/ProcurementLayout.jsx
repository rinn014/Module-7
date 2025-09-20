import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const ProcurementLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideMenu />

      {/* Main content area */}
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default ProcurementLayout;
