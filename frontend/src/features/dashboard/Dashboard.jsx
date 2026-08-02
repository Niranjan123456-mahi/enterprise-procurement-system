import { useEffect, useState } from "react";
import { apiFetch } from "../../api";
import "./Dashboard.css";

function Dashboard({ user, onNavigate }) {
  const [counts, setCounts] = useState({
    approvals: 0,
    myrequests: 0,
    orders: 0,
    receiving: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [requisitions, purchaseOrders] = await Promise.all([
          apiFetch("/api/requisitions", {}, user.token),
          apiFetch("/api/purchase-orders", {}, user.token),
        ]);

        setCounts({
          approvals: requisitions.filter((item) => item.status === "PENDING").length,
          myrequests: requisitions.length,
          orders: purchaseOrders.filter((item) => item.status === "OPEN").length,
          receiving: purchaseOrders.filter(
            (item) =>
              item.stage === "Sent" || item.stage === "Partially Delivered"
          ).length,
        });
      } catch {
        setError(
          "Unable to load dashboard data. Please sign in again and confirm the backend is running."
        );
      }
    }

    loadDashboard();
  }, [user.token]);

  const stats = [
    { key: "approvals", label: "Pending Approvals", value: counts.approvals, icon: "✅" },
    { key: "myrequests", label: "Total Requests", value: counts.myrequests, icon: "📋" },
    { key: "orders", label: "Open Purchase Orders", value: counts.orders, icon: "📦" },
    { key: "receiving", label: "Awaiting Receipt", value: counts.receiving, icon: "🚚" },
  ];

  return (
    <div className="dash-page">
      <h1>Dashboard</h1>
      <p className="dash-subtext">Everything happening across procurement today</p>
      {error && <p className="dash-subtext">{error}</p>}

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
