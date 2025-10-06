import React, { useState } from "react";

export default function Attendance({ data, setData }) {
  const [employee, setEmployee] = useState("");

  const attendance = data?.attendance || [];

  // record time-in
  const timeIn = () => {
    if (!employee) {
      alert("Enter employee name to time-in.");
      return;
    }
    const record = {
      id: Date.now(),
      employee,
      timeIn: new Date().toLocaleString(),
      timeOut: null,
    };
    setData({ ...data, attendance: [...data.attendance, record] });
    setEmployee("");
  };

  // record time-out
  const timeOut = (id) => {
    setData({
      ...data,
      attendance: data.attendance.map((rec) =>
        rec.id === id && !rec.timeOut
          ? { ...rec, timeOut: new Date().toLocaleString() }
          : rec
      ),
    });
  };

  // generate simple report
  const generateReport = () => {
    return (data?.attendance || []).map((rec) => {
      let workedHours = 0;
      if (rec.timeIn && rec.timeOut) {
        const start = new Date(rec.timeIn);
        const end = new Date(rec.timeOut);
        workedHours = (end - start) / (1000 * 60 * 60);
      }
      return {
        ...rec,
        workedHours: workedHours.toFixed(2),
        pay: (workedHours * (data.settings?.hourlyRate || 100)).toFixed(2),
      };
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Management</h2>

      {/* Time In Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Record Time-In</h3>
        <div className="flex gap-2">
          <input
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            placeholder="Employee Name"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={timeIn}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Time In
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Attendance Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Employee</th>
                <th className="border px-3 py-2 text-left">Time In</th>
                <th className="border px-3 py-2 text-left">Time Out</th>
                <th className="border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{rec.employee}</td>
                    <td className="border px-3 py-2">{rec.timeIn}</td>
                    <td className="border px-3 py-2">
                      {rec.timeOut || "Still working..."}
                    </td>
                    <td className="border px-3 py-2">
                      {!rec.timeOut && (
                        <button
                          onClick={() => timeOut(rec.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Time Out
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No attendance records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Attendance Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Employee</th>
                <th className="border px-3 py-2 text-left">Time In</th>
                <th className="border px-3 py-2 text-left">Time Out</th>
                <th className="border px-3 py-2 text-left">Hours Worked</th>
                <th className="border px-3 py-2 text-left">Pay</th>
              </tr>
            </thead>
            <tbody>
              {generateReport().length > 0 ? (
                generateReport().map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{rec.employee}</td>
                    <td className="border px-3 py-2">{rec.timeIn}</td>
                    <td className="border px-3 py-2">{rec.timeOut}</td>
                    <td className="border px-3 py-2">{rec.workedHours}</td>
                    <td className="border px-3 py-2">₱{rec.pay}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No report available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
