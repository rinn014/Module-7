import { useState } from "react";
import "./Module_8style/After_Sales.css";

function AfterSalesSupport() {
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({ customer: "", issue: "", status: "open" });

  const addCase = () => {
    if (!newCase.customer || !newCase.issue) {
      alert("Please enter customer and issue details.");
      return;
    }
    setCases([...cases, { ...newCase, id: cases.length + 1 }]);
    setNewCase({ customer: "", issue: "", status: "open" });
  };

  const updateStatus = (id, status) => {
    setCases(cases.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="aftersales-container">
      <h2>After-Sales Support & Case Management</h2>

      <div className="form-card">
        <label>Customer Name</label>
        <input
          value={newCase.customer}
          onChange={(e) => setNewCase({ ...newCase, customer: e.target.value })}
        />
        <label>Issue</label>
        <input
          value={newCase.issue}
          onChange={(e) => setNewCase({ ...newCase, issue: e.target.value })}
        />
        <button onClick={addCase}>Add Case</button>
      </div>

      <h3>Support Cases</h3>
      {cases.map((c) => (
        <div key={c.id} className="case-card">
          <p>
            <strong>Case #{c.id}</strong><br />
            Customer: {c.customer} <br />
            Issue: {c.issue} <br />
            Status: {c.status}
          </p>

          <select
            value={c.status}
            onChange={(e) => updateStatus(c.id, e.target.value)}
          >
            <option value="open">open</option>
            <option value="in progress">in progress</option>
            <option value="resolved">resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AfterSalesSupport;
