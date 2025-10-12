import React, { useState, useEffect } from "react";

const SAMPLE_ARTICLES = [
  { id: 1, title: "Reset Password", body: "To reset your password, click 'Forgot password' at login and follow the steps." },
  { id: 2, title: "Check Order Status", body: "Go to Orders → Enter your order ID to get the latest status." },
  { id: 3, title: "Refund Policy", body: "Refunds processed within 14 business days. Contact support for exceptions." }
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const getTickets = () => {
  try {
    return JSON.parse(localStorage.getItem("helpdesk_tickets") || "[]");
  } catch {
    return [];
  }
};
const saveTickets = (tickets) => {
  localStorage.setItem("helpdesk_tickets", JSON.stringify(tickets));
};

export default function CustomerService() {
  const [panel, setPanel] = useState("tickets");
  const [tickets, setTickets] = useState(getTickets());
  const [articles, setArticles] = useState(() => {
    const stored = localStorage.getItem("helpdesk_articles");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("helpdesk_articles", JSON.stringify(SAMPLE_ARTICLES));
    return SAMPLE_ARTICLES;
  });
  const [form, setForm] = useState({
    customer: "",
    subject: "",
    description: "",
    priority: "Medium",
    agent: "",
    sla_hours: 24
  });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [detailTicket, setDetailTicket] = useState(null);

  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    let match = true;
    if (search && !(t.customer.includes(search) || t.subject.includes(search))) match = false;
    if (filterStatus && t.status !== filterStatus) match = false;
    if (filterPriority && t.priority !== filterPriority) match = false;
    return match;
  });

  // Ticket creation
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: uid(),
      ...form,
      status: "Open",
      created: new Date().toISOString(),
    };
    setTickets((t) => [newTicket, ...t]);
    setForm({ customer: "", subject: "", description: "", priority: "Medium", agent: "", sla_hours: 24 });
  };

  // Ticket detail
  const openDetail = (ticket) => {
    setDetailTicket(ticket);
    setShowDetail(true);
  };
  const closeDetail = () => {
    setShowDetail(false);
    setDetailTicket(null);
  };

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Customer", "Subject", "Description", "Priority", "Agent", "SLA", "Status", "Created"],
      ...tickets.map((t) => [t.customer, t.subject, t.description, t.priority, t.agent, t.sla_hours, t.status, t.created])
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tickets.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // SLA Report (simple count)
  const slaReport = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <header className="bg-gradient-to-r from-blue-600 to-sky-300 text-white p-4">
        <h1 className="text-lg font-bold">ERP Module 2 — Customer Service / Helpdesk</h1>
        <nav className="mt-2 flex gap-2">
          <button className={`border px-3 py-1 rounded ${panel === "tickets" ? "bg-white text-blue-600 font-semibold" : "bg-transparent text-white"}`} onClick={() => setPanel("tickets")}>Tickets</button>
          <button className={`border px-3 py-1 rounded ${panel === "portal" ? "bg-white text-blue-600 font-semibold" : "bg-transparent text-white"}`} onClick={() => setPanel("portal")}>Self-Service Portal</button>
          <button className={`border px-3 py-1 rounded ${panel === "reports" ? "bg-white text-blue-600 font-semibold" : "bg-transparent text-white"}`} onClick={() => setPanel("reports")}>SLA Reports</button>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        {/* Tickets Panel */}
        {panel === "tickets" && (
          <section className="flex gap-6">
            <div className="flex-1 bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">Create Ticket</h2>
              <form className="flex flex-col gap-2" onSubmit={handleCreateTicket}>
                <label className="flex flex-col">Customer name
                  <input name="customer" value={form.customer} onChange={handleFormChange} required className="border rounded px-2 py-1" />
                </label>
                <label className="flex flex-col">Subject
                  <input name="subject" value={form.subject} onChange={handleFormChange} required className="border rounded px-2 py-1" />
                </label>
                <label className="flex flex-col">Description
                  <textarea name="description" value={form.description} onChange={handleFormChange} rows={4} required className="border rounded px-2 py-1" />
                </label>
                <label className="flex flex-col">Priority
                  <select name="priority" value={form.priority} onChange={handleFormChange} className="border rounded px-2 py-1">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>
                <label className="flex flex-col">Assign to
                  <input name="agent" value={form.agent} onChange={handleFormChange} placeholder="Agent name" className="border rounded px-2 py-1" />
                </label>
                <label className="flex flex-col">SLA (hours)
                  <input name="sla_hours" type="number" min={1} value={form.sla_hours} onChange={handleFormChange} className="border rounded px-2 py-1" />
                </label>
                <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 mt-2">Create Ticket</button>
              </form>
              <h3 className="mt-6 mb-2 font-semibold">Search / Filters</h3>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer or subject" className="border rounded px-2 py-1 mb-2 w-full" />
              <div className="flex gap-2 mb-2">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border rounded px-2 py-1">
                  <option value="">All Status</option>
                  <option>Open</option>
                  <option>Closed</option>
                </select>
                <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="border rounded px-2 py-1">
                  <option value="">All Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <button className="border px-2 rounded" onClick={() => { setFilterStatus(""); setFilterPriority(""); setSearch(""); }}>Clear</button>
              </div>
              <ul className="divide-y">
                {filteredTickets.map(ticket => (
                  <li key={ticket.id} className="py-2 cursor-pointer hover:bg-blue-50" onClick={() => openDetail(ticket)}>
                    <div className="font-semibold">{ticket.subject} <span className="text-xs text-gray-500">({ticket.priority})</span></div>
                    <div className="text-sm text-gray-600">{ticket.customer}</div>
                    <div className="text-xs text-gray-400">{ticket.status} • {new Date(ticket.created).toLocaleString()}</div>
                  </li>
                ))}
                {filteredTickets.length === 0 && <li className="py-2 text-gray-400">No tickets found.</li>}
              </ul>
            </div>
            {/* Ticket Detail Modal */}
            {showDetail && detailTicket && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded shadow-lg p-6 w-96 relative">
                  <button className="absolute top-2 right-2 text-gray-500" onClick={closeDetail}>×</button>
                  <h2 className="text-lg font-bold mb-2">Ticket Detail</h2>
                  <div><b>Customer:</b> {detailTicket.customer}</div>
                  <div><b>Subject:</b> {detailTicket.subject}</div>
                  <div><b>Description:</b> {detailTicket.description}</div>
                  <div><b>Priority:</b> {detailTicket.priority}</div>
                  <div><b>Agent:</b> {detailTicket.agent}</div>
                  <div><b>SLA:</b> {detailTicket.sla_hours} hours</div>
                  <div><b>Status:</b> {detailTicket.status}</div>
                  <div><b>Created:</b> {new Date(detailTicket.created).toLocaleString()}</div>
                </div>
              </div>
            )}
          </section>
        )}
        {/* Portal Panel */}
        {panel === "portal" && (
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Self-Service Portal</h2>
            <input placeholder="Search articles" className="border rounded px-2 py-1 mb-2 w-full" />
            <ul className="divide-y">
              {articles.map(a => (
                <li key={a.id} className="py-2">
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-sm text-gray-600">{a.body}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* SLA Reports Panel */}
        {panel === "reports" && (
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">SLA Reports</h2>
            <div className="mb-4">
              <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={exportCSV}>Export CSV</button>
            </div>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(slaReport).map(([status, count]) => (
                  <tr key={status}>
                    <td className="border px-2 py-1">{status}</td>
                    <td className="border px-2 py-1">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
