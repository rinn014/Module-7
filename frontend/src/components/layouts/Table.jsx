import React from "react";

export default function Table({ reportType, data }) {
  if (!reportType || data.length === 0)
    return <p className="text-gray-400">No data to display yet.</p>;

  let headers = [];
  switch (reportType) {
    case "sales":
      headers = ["ID", "Product", "Amount", "Date", "Region"];
      break;
    case "inventory":
      headers = ["ID", "Item", "Stock", "Date", "Department"];
      break;
    case "finance":
      headers = ["ID", "Category", "Value", "ProfitLoss", "Date"];
      break;
    case "compliance":
      headers = ["ID", "Type", "Details", "Status", "Audit Log"];
      break;
    default:
      headers = ["Data"];
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-2 border-b text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-4 py-2 border-b">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}