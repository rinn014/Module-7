import React, { useState, useEffect } from "react";
import Table from "../../components/layouts/Table";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Simulated user role (replace with actual authentication logic)
const getUserRole = () => {
  // TODO: Integrate with your authentication system (e.g., JWT, session)
  // For now, simulate roles: "admin", "sales", "inventory", "finance"
  return "admin"; // Default role for testing; adjust based on user
};

export default function ERPReportModule() {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    department: "All",
    region: "All",
  });

  const userRole = getUserRole();
  const [reports] = useState([
    { id: 1, name: "Sales Summary", type: "sales", roles: ["sales", "admin"] },
    { id: 2, name: "Inventory Stock", type: "inventory", roles: ["inventory", "admin"] },
    { id: 3, name: "Profit & Loss", type: "finance", roles: ["finance", "admin"] },
    { id: 4, name: "Compliance Report", type: "compliance", roles: ["admin"] },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [data, setData] = useState([]);
  const [isRealTime, setIsRealTime] = useState(false);
  const [log, setLog] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = (report) => {
    if (!report.roles.includes(userRole)) {
      alert(`Access denied: ${report.name} is restricted to ${report.roles.join(", ")} roles.`);
      return;
    }
    setSelectedReport(report);
    setLoading(true);
    fetch(`/api/reports/${report.type}?${new URLSearchParams(filters).toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        addLog(`Generated ${report.name} (${filters.department}, ${filters.region}) at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addLog(`Failed to generate ${report.name} at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} - Error: ${error.message}`);
        setData([]); // Clear data on error
      })
      .finally(() => setLoading(false));
  };

  const exportCSV = () => {
    if (!selectedReport) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedReport.name);
    XLSX.writeFile(workbook, `${selectedReport.name}.csv`);
    addLog(`Exported ${selectedReport.name} to CSV at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`);
  };

  const exportExcel = () => {
    if (!selectedReport) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedReport.name);
    XLSX.writeFile(workbook, `${selectedReport.name}.xlsx`);
    addLog(`Exported ${selectedReport.name} to Excel at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`);
  };

  const exportPDF = () => {
    if (!selectedReport || data.length === 0) {
      alert("Please generate a report before exporting.");
      return;
    }

    const doc = new jsPDF("landscape", "pt", "A4");
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const reportTitle = `${selectedReport.name} Report`;

    doc.setFontSize(18);
    doc.text(reportTitle, 40, 40);
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentDate}`, 40, 60);
    doc.text(`Filters: Date From ${filters.dateFrom || "N/A"} to ${filters.dateTo || "N/A"}`, 40, 80);
    doc.text(`Department: ${filters.department}, Region: ${filters.region}`, 40, 100);

    const columns = Object.keys(data[0] || {});
    const rows = data.map((row) => columns.map((col) => row[col]));

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 120,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [33, 150, 243] },
    });

    doc.save(`${reportTitle}.pdf`);
    addLog(`Exported ${selectedReport.name} to PDF at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`);
  };

  const addLog = (message) => {
    setLog((prev) => [`${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} - ${message}`, ...prev.slice(0, 9)]);
  };

  const scheduleReport = (freq) => {
    if (!selectedReport.roles.includes(userRole)) {
      alert(`Access denied: Scheduling ${selectedReport.name} is restricted to ${selectedReport.roles.join(", ")} roles.`);
      return;
    }
    setSchedule({ freq, report: selectedReport?.name });
    addLog(`Scheduled ${selectedReport?.name} for ${freq} reports at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`);
  };

  useEffect(() => {
    let interval;
    if (isRealTime && selectedReport) {
      if (!selectedReport.roles.includes(userRole)) {
        alert(`Access denied: Real-time updates for ${selectedReport.name} are restricted to ${selectedReport.roles.join(", ")} roles.`);
        setIsRealTime(false);
        return;
      }
      interval = setInterval(() => {
        setLoading(true);
        fetch(`/api/reports/${selectedReport.type}?${new URLSearchParams(filters).toString()}`)
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch real-time data");
            return response.json();
          })
          .then((newData) => {
            setData(newData);
            addLog(`Real-time update for ${selectedReport.name} at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`);
          })
          .catch((error) => {
            console.error("Real-time fetch error:", error);
            addLog(`Real-time update failed for ${selectedReport.name} at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} - Error: ${error.message}`);
          })
          .finally(() => setLoading(false));
      }, 5000); // Update every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRealTime, selectedReport, userRole, filters]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Business Intelligence / Report Module</h1>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-5">
        <h2 className="font-medium mb-3">Filters</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="dateFrom"
            placeholder="Date From"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="dateTo"
            placeholder="Date To"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <select name="department" value={filters.department} onChange={handleFilterChange} className="border p-2 rounded">
            <option>All</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Sales</option>
            <option>Inventory</option>
          </select>
          <select name="region" value={filters.region} onChange={handleFilterChange} className="border p-2 rounded">
            <option>All</option>
            <option>North</option>
            <option>South</option>
          </select>
        </div>
      </div>

      {/* REPORT SELECTION */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-5">
        <h2 className="font-medium mb-3">Select Report</h2>
        <div className="grid grid-cols-3 gap-4">
          {reports.map((report) =>
            report.roles.includes(userRole) ? (
              <button
                key={report.id}
                onClick={() => handleGenerateReport(report)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                {report.name}
              </button>
            ) : null
          )}
        </div>
      </div>

      {/* REPORT DATA */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-5">
        {loading && <p className="text-blue-500">Loading...</p>}
        {selectedReport ? (
          <>
            <h2 className="font-medium mb-3">{selectedReport.name} Data</h2>
            <Table reportType={selectedReport.type} data={data} />
            <div className="flex gap-4 mt-4">
              <button onClick={exportCSV} className="bg-green-500 text-white px-3 py-1 rounded">
                CSV
              </button>
              <button onClick={exportExcel} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Excel
              </button>
              <button onClick={exportPDF} className="bg-red-500 text-white px-3 py-1 rounded">
                PDF
              </button>
            </div>
            {selectedReport.type === "compliance" && (
              <div className="mt-4">
                <h3 className="font-medium">Regulatory Insights</h3>
                <p>Generated on {new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</p>
                <p>Tax Compliance: Includes VAT and payroll deductions (placeholder data).</p>
                <p>Audit Trail: Historical logs available for 5 years. Contact admin for full access.</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400">Select a report to display data.</p>
        )}
      </div>

      {/* REAL-TIME TOGGLE */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isRealTime}
            onChange={() => setIsRealTime(!isRealTime)}
          />
          <span>Enable Real-Time Data Retrieval</span>
        </label>
      </div>

      {/* SCHEDULING */}
      {selectedReport && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-medium mb-3">Schedule Recurring Reports</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scheduleReport("Daily")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Daily
            </button>
            <button
              onClick={() => scheduleReport("Weekly")}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Weekly
            </button>
            <button
              onClick={() => scheduleReport("Monthly")}
              className="bg-blue-700 text-white px-3 py-1 rounded"
            >
              Monthly
            </button>
          </div>
        </div>
      )}

      {/* LOGS */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-medium mb-3">System Logs</h2>
        <ul className="text-sm h-40 overflow-auto">
          {log.length === 0 ? (
            <li className="text-gray-400">No recent activity</li>
          ) : (
            log.map((l, i) => <li key={i}>• {l}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}