import React, { useEffect, useState, useRef } from "react";

/*
  HelpdeskSystem (localStorage + live SLA)
  - Keeps tickets & articles in localStorage
  - SLA countdown updated every 30s; auto-escalates overdue tickets
  - Ticket detail supports internal notes, messages, status changes, reassign, SLA update
  - Simple styling (clean white + blue)
*/

const SAMPLE_ARTICLES = [
  { id: 1, title: "Reset Password", category: "Account", body: "Click 'Forgot password' at login and follow the steps.", helpful: 0, notHelpful: 0 },
  { id: 2, title: "Check Order Status", category: "Orders", body: "Go to Orders → Enter your order ID to see updates.", helpful: 0, notHelpful: 0 },
  { id: 3, title: "Refund Policy", category: "Payments", body: "Refunds processed within 14 business days.", helpful: 0, notHelpful: 0 }
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const STORAGE_KEYS = {
  TICKETS: "helpdesk_tickets_v2",
  ARTICLES: "helpdesk_articles_v2",
};

const loadTickets = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKETS) || "[]");
  } catch {
    return [];
  }
};
const saveTickets = (tickets) => localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));

const loadArticles = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(SAMPLE_ARTICLES));
    return SAMPLE_ARTICLES;
  } catch {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(SAMPLE_ARTICLES));
    return SAMPLE_ARTICLES;
  }
};
const saveArticles = (articles) => localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));

export default function HelpdeskSystem() {
  // panels
  const [panel, setPanel] = useState("tickets");

  // data
  const [tickets, setTickets] = useState(() => loadTickets());
  const [articles, setArticles] = useState(() => loadArticles());

  // ticket creation form
  const [form, setForm] = useState({
    customer: "",
    subject: "",
    description: "",
    priority: "Medium",
    agent: "",
    sla_hours: 24
  });

  // filters & UI
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // detail modal
  const [detailTicket, setDetailTicket] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // detail local inputs
  const [internalNote, setInternalNote] = useState("");
  const [messageText, setMessageText] = useState("");

  // keep a ref for interval
  const intervalRef = useRef(null);

  // persist tickets on change
  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  // persist articles on change
  useEffect(() => {
    saveArticles(articles);
  }, [articles]);

  // SLA countdown & auto-escalation: update every 30 seconds
  useEffect(() => {
    // update remaining time and escalate overdue
    const tick = () => {
      const now = new Date();
      let changed = false;
      const updated = tickets.map((t) => {
        // compute hours passed since created
        const created = new Date(t.created);
        const hoursPassed = (now - created) / 3600000;
        const remaining = Math.max(0, t.sla_hours - hoursPassed);
        // attach derived field (not saved) for UI convenience
        const newT = { ...t, __remaining_hours: remaining };

        // auto escalate if overdue and not closed/resolved/escalated
        if (remaining <= 0 && !["Closed", "Resolved", "Escalated"].includes(t.status)) {
          newT.status = "Escalated";
          newT.updates = [...(newT.updates || []), `Auto-escalated after SLA (${t.sla_hours} hrs) at ${now.toLocaleString()}`];
          changed = true;
        }
        return newT;
      });

      if (changed) {
        // replace tickets but keep created/order
        setTickets((prev) => {
          // merge updates to persist statuses
          return updated.map(u => {
            const stored = prev.find(p => p.id === u.id) || {};
            return { ...u, updates: u.updates || stored.updates || [], messages: u.messages || stored.messages || [] };
          });
        });
      } else {
        // still update derived remaining field in state so UI shows countdown
        setTickets((prev) => prev.map(p => {
          const found = updated.find(u => u.id === p.id);
          return found ? { ...p, __remaining_hours: found.__remaining_hours } : p;
        }));
      }
    };

    tick(); // initial tick
    intervalRef.current = setInterval(tick, 30000); // every 30s

    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* run once and when tickets changes we still rely on tick to update */ tickets.length]);

  // derived filtered list
  const filteredTickets = tickets.filter((t) => {
    if (search) {
      const s = search.toLowerCase();
      if (!((t.customer || "").toLowerCase().includes(s) || (t.subject || "").toLowerCase().includes(s))) return false;
    }
    if (filterStatus && t.status !== filterStatus) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    return true;
  });

  // create ticket
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: uid(),
      ...form,
      price: undefined, // not used here, keep shape flexible
      status: "Open",
      created: new Date().toISOString(),
      updates: [`Ticket created at ${new Date().toLocaleString()}`],
      messages: []
    };
    setTickets((t) => [newTicket, ...t]);
    setForm({ customer: "", subject: "", description: "", priority: "Medium", agent: "", sla_hours: 24 });
    setPanel("tickets");
  };

  // open detail
  const openDetail = (t) => {
    setDetailTicket(t);
    setShowDetail(true);
    setInternalNote("");
    setMessageText("");
  };
  const closeDetail = () => {
    setShowDetail(false);
    setDetailTicket(null);
  };

  // update ticket status
  const updateTicketStatus = (id, status) => {
    setTickets((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const newUpdates = [...(t.updates || []), `Status changed to ${status} at ${new Date().toLocaleString()}`];
      return { ...t, status, updates: newUpdates };
    }));
    if (detailTicket && detailTicket.id === id) {
      setDetailTicket((d) => ({ ...d, status }));
    }
  };

  // add internal note
  const addInternalNote = (id) => {
    if (!internalNote || !internalNote.trim()) return;
    setTickets((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      return { ...t, updates: [...(t.updates || []), `Note: ${internalNote} — ${new Date().toLocaleString()}`] };
    }));
    setDetailTicket((d) => ({ ...d, updates: [...(d.updates || []), `Note: ${internalNote} — ${new Date().toLocaleString()}`] }));
    setInternalNote("");
  };

  // send message (customer communication history)
  const sendMessage = (id, text, from = "Agent") => {
    if (!text || !text.trim()) return;
    const message = { id: uid(), from, text, time: new Date().toISOString() };
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, messages: [...(t.messages || []), message] } : t)));
    setDetailTicket((d) => ({ ...d, messages: [...(d.messages || []), message] }));
    setMessageText("");
  };

  // reassign agent / edit SLA hours / priority directly from detail
  const updateTicketField = (id, changes) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes, updates: [...(t.updates || []), `Updated fields: ${Object.keys(changes).join(", ")} at ${new Date().toLocaleString()}`] } : t)));
    if (detailTicket && detailTicket.id === id) {
      setDetailTicket((d) => ({ ...d, ...changes }));
    }
  };

  // export CSV
  const exportCSV = () => {
    const header = ["Customer", "Subject", "Priority", "Agent", "SLA_Hours", "Status", "Created", "UpdatesCount", "MessagesCount"];
    const rows = tickets.map((t) => [
      `"${(t.customer || "").replace(/"/g, '""')}"`,
      `"${(t.subject || "").replace(/"/g, '""')}"`,
      t.priority,
      `"${(t.agent || "").replace(/"/g, '""')}"`,
      t.sla_hours,
      t.status,
      `"${t.created}"`,
      (t.updates || []).length,
      (t.messages || []).length
    ]);
    const csv = [header.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `helpdesk_tickets_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // article feedback
  const rateArticle = (articleId, helpful) => {
    const updated = articles.map((a) => a.id === articleId ? { ...a, helpful: a.helpful + (helpful ? 1 : 0), notHelpful: a.notHelpful + (!helpful ? 1 : 0) } : a);
    setArticles(updated);
    saveArticles(updated);
  };

  // remove ticket (optional admin action)
  const removeTicket = (id) => {
    if (!window.confirm("Remove this ticket? This action cannot be undone.")) return;
    setTickets((prev) => prev.filter((t) => t.id !== id));
    if (detailTicket && detailTicket.id === id) closeDetail();
  };

  // compute SLA reporting (status counts)
  const slaReport = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  // helper to format remaining time
  const formatRemaining = (hours) => {
    if (hours === undefined) return "--";
    if (hours <= 0) return "Overdue";
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <header className="bg-gradient-to-r from-blue-600 to-sky-300 text-white p-4">
        <h1 className="text-lg font-bold">Customer Service: Helpdesk</h1>
        <nav className="mt-2 flex gap-2">
          <button className={`border px-3 py-1 rounded ${panel === "tickets" ? "bg-white text-blue-600 font-semibold" : "bg-transparent text-white"}`} onClick={() => setPanel("tickets")}>Tickets</button>
          <button className={`border px-3 py-1 rounded ${panel === "portal" ? "bg-white text-blue-600 font-semibold" : "bg-transparent text-white"}`} onClick={() => setPanel("portal")}>Self-Service Portal</button>
          <button className={`border px-3 py-1 rounded ${panel === "reports" ? "bg-white text-blue-600 font-semibold" : "bg-transparent text-white"}`} onClick={() => setPanel("reports")}>SLA Reports</button>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {/* TICKETS PANEL */}
        {panel === "tickets" && (
          <section className="flex gap-6">
            {/* Create Ticket & Filters */}
            <div className="flex-1 bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">Create Ticket</h2>
              <form className="flex flex-col gap-2" onSubmit={handleCreateTicket}>
                <input name="customer" value={form.customer} onChange={handleFormChange} placeholder="Customer name" required className="border rounded px-2 py-1" />
                <input name="subject" value={form.subject} onChange={handleFormChange} placeholder="Subject" required className="border rounded px-2 py-1" />
                <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} placeholder="Description" required className="border rounded px-2 py-1" />
                <div className="flex gap-2">
                  <select name="priority" value={form.priority} onChange={handleFormChange} className="border rounded px-2 py-1 w-1/3">
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                  <input name="agent" value={form.agent} onChange={handleFormChange} placeholder="Assign agent" className="border rounded px-2 py-1 flex-1" />
                  <input name="sla_hours" type="number" min="1" value={form.sla_hours} onChange={handleFormChange} className="border rounded px-2 py-1 w-32" />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 mt-2">Create Ticket</button>
                  <button type="button" className="border px-3 py-2 mt-2" onClick={() => { setForm({ customer: "", subject: "", description: "", priority: "Medium", agent: "", sla_hours: 24 }); }}>Clear</button>
                </div>
              </form>

              <h3 className="mt-6 mb-2 font-semibold">Search / Filters</h3>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by customer or subject" className="border rounded px-2 py-1 mb-2 w-full" />
              <div className="flex gap-2 mb-2">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded px-2 py-1">
                  <option value="">All Status</option><option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option><option>Escalated</option>
                </select>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border rounded px-2 py-1">
                  <option value="">All Priority</option><option>Low</option><option>Medium</option><option>High</option>
                </select>
                <button className="border px-2 rounded" onClick={() => { setFilterStatus(""); setFilterPriority(""); setSearch(""); }}>Clear</button>
              </div>

              <ul className="divide-y">
                {filteredTickets.map((t) => (
                  <li key={t.id} className="py-2 cursor-pointer hover:bg-blue-50" onClick={() => openDetail(t)}>
                    <div className="font-semibold">{t.subject} <span className="text-xs text-gray-500">({t.priority})</span></div>
                    <div className="text-sm text-gray-600">{t.customer} {t.agent ? <span className="text-xs text-gray-400">• {t.agent}</span> : null}</div>
                    <div className="text-xs text-gray-400">{t.status} • {new Date(t.created).toLocaleString()} • SLA: {formatRemaining(t.__remaining_hours)}</div>
                  </li>
                ))}
                {filteredTickets.length === 0 && <li className="py-2 text-gray-400">No tickets found.</li>}
              </ul>
            </div>

            {/* Ticket Detail */}
            {showDetail && detailTicket && (
              <div className="w-96 bg-white rounded shadow p-4 relative">
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeDetail}>×</button>
                <h2 className="text-lg font-bold mb-1">{detailTicket.subject}</h2>
                <div className="text-sm mb-1"><b>Customer:</b> {detailTicket.customer}</div>
                <div className="text-sm mb-1"><b>Agent:</b>
                  <input className="border rounded px-2 py-1 ml-2 text-sm" defaultValue={detailTicket.agent} onBlur={(e) => updateTicketField(detailTicket.id, { agent: e.target.value })} />
                </div>
                <div className="text-sm mb-1"><b>Priority:</b>
                  <select className="border rounded px-2 py-1 ml-2 text-sm" defaultValue={detailTicket.priority} onChange={(e) => updateTicketField(detailTicket.id, { priority: e.target.value })}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
                <div className="text-sm mb-1"><b>SLA (hrs):</b>
                  <input className="border rounded px-2 py-1 ml-2 w-24 text-sm" type="number" defaultValue={detailTicket.sla_hours} onBlur={(e) => updateTicketField(detailTicket.id, { sla_hours: Number(e.target.value) })} />
                </div>
                <div className="text-sm mb-2"><b>Status:</b> <span className={`px-2 py-0.5 rounded text-xs ${detailTicket.status === "Escalated" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{detailTicket.status}</span></div>

                <h3 className="font-semibold mt-3 mb-1">Description</h3>
                <div className="text-sm text-gray-700 mb-2">{detailTicket.description}</div>

                <h3 className="font-semibold mt-2 mb-1">Internal Notes</h3>
                <ul className="text-xs mb-2 list-disc list-inside text-gray-600 max-h-24 overflow-y-auto">
                  {(detailTicket.updates || []).map((u, i) => <li key={i}>{u}</li>)}
                </ul>
                <textarea value={internalNote} onChange={(e) => setInternalNote(e.target.value)} placeholder="Add internal note..." className="border rounded w-full px-2 py-1 text-sm" />
                <button onClick={() => addInternalNote(detailTicket.id)} className="bg-blue-600 text-white rounded px-3 py-1 mt-1 text-sm">Add Note</button>

                <h3 className="font-semibold mt-3 mb-1">Messages</h3>
                <ul className="max-h-28 overflow-y-auto text-sm border rounded p-2 bg-gray-50">
                  {(detailTicket.messages || []).map((m) => (
                    <li key={m.id} className="mb-1"><b>{m.from}:</b> {m.text} <span className="text-xs text-gray-400">• {new Date(m.time).toLocaleString()}</span></li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-2">
                  <input placeholder="Type message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { sendMessage(detailTicket.id, messageText); }}} className="border rounded px-2 py-1 flex-1 text-sm" />
                  <button onClick={() => sendMessage(detailTicket.id, messageText)} className="border px-3 py-1 text-sm">Send</button>
                </div>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateTicketStatus(detailTicket.id, "In Progress")} className="text-xs border px-2 py-1 rounded">In Progress</button>
                  <button onClick={() => updateTicketStatus(detailTicket.id, "Resolved")} className="text-xs border px-2 py-1 rounded">Resolved</button>
                  <button onClick={() => updateTicketStatus(detailTicket.id, "Closed")} className="text-xs border px-2 py-1 rounded">Closed</button>
                  <button onClick={() => removeTicket(detailTicket.id)} className="text-xs border px-2 py-1 rounded text-red-600">Remove</button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* PORTAL */}
        {panel === "portal" && (
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Self-Service Portal</h2>
            <input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded px-2 py-1 mb-3 w-full" />
            <ul className="divide-y">
              {articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.body.toLowerCase().includes(search.toLowerCase())).map((a) => (
                <li key={a.id} className="py-2">
                  <div className="font-semibold">{a.title} <span className="text-xs text-gray-500">[{a.category}]</span></div>
                  <div className="text-sm text-gray-600 mb-1">{a.body}</div>
                  <div className="text-xs text-gray-500">
                    Helpful?{" "}
                    <button onClick={() => rateArticle(a.id, true)} className="text-green-600 mr-2">Yes ({a.helpful})</button>
                    <button onClick={() => rateArticle(a.id, false)} className="text-red-600">No ({a.notHelpful})</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* REPORTS */}
        {panel === "reports" && (
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">SLA Reports</h2>
            <div className="mb-3 flex gap-2">
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
