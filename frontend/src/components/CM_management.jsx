import { useState } from "react";
import "./Module_8style/CM_management.css";

function CRMManagement() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@email.com", preference: "Electronics", history: "Product A" },
    { id: 2, name: "Bob Smith", email: "bob@email.com", preference: "Home", history: "Product B" },
  ]);

  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", preference: "" });

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Please fill in all fields.");
      return;
    }
    setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
    setNewCustomer({ name: "", email: "", preference: "" });
  };

  return (
    <div className="crm-container">
      <h2>Customer Relationship Management (CRM)</h2>

      <div className="form-card">
        <label>Name</label>
        <input
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <label>Email</label>
        <input
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        />
        <label>Preference</label>
        <input
          value={newCustomer.preference}
          onChange={(e) => setNewCustomer({ ...newCustomer, preference: e.target.value })}
        />

        <button onClick={addCustomer}>Add Customer</button>
      </div>

      <h3>Customer List</h3>
      {customers.map((c) => (
        <div key={c.id} className="crm-card">
          <p>
            <strong>{c.name}</strong> ({c.email}) <br />
            Preference: {c.preference} <br />
            Purchase History: {c.history}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CRMManagement;
