import "./Dashboard.css";

function Dashboard({ user, onNavigate }) {
  // fake sample numbers for now — real numbers will come from actual data later
  const stats = [
    { key: "approvals", label: "Pending Approvals", value: 2, icon: "✅" },
    { key: "myrequests", label: "Total Requests", value: 3, icon: "📋" },
    { key: "orders", label: "Open Purchase Orders", value: 2, icon: "📦" },
    { key: "receiving", label: "Awaiting Receipt", value: 2, icon: "🚚" },
  ];

  return (
    <div className="dash-page">
      <h1>Dashboard</h1>
      <p className="dash-subtext">Everything happening across procurement today</p>

      <div className="dash-grid">
        {stats.map((s) => (
          <div
            key={s.key}
            className="dash-card"
            onClick={() => onNavigate(s.key)}
          >
            <div className="dash-card-top">
              <span className="dash-card-label">{s.label}</span>
              <span className="dash-card-icon">{s.icon}</span>
            </div>
            <div className="dash-card-value">{s.value}</div>
          </div>
        ))}
      </div>

      <p className="dash-hint">Click any card to jump to that section.</p>
    </div>
  );
}

export default Dashboard;