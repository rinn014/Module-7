// src/components/layouts/ProcurementLayout.jsx
import React from "react";


const ProcurementLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen"> {/* full height + full width */}
      {/* Sidebar */}
      <div className="w-64 border-r h-full">
        <SideMenu />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Navbar fixed at the top */}
        <div className="fixed top-0 left-64 right-0 z-10">
          <Navbar />
        </div>

        {/* Content area below navbar */}
        <main className="flex-1 overflow-auto mt-16 p-6 bg-white">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ProcurementLayout;
