import { useState, useEffect } from "react";
import { apiFetch } from "../../api";
import "./ReportsDashboard.css";

function ReportsDashboard({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalSpend, setTotalSpend] = useState(0);
  const [byDepartment, setByDepartment] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [topVendors, setTopVendors] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    async function loadReportData() {
      try {
        const [requisitions, logs] = await Promise.all([
          apiFetch("/api/requisitions", {}, user.token),
          apiFetch("/api/audit-logs", {}, user.token),
        ]);

        // filter to approved/completed requisitions representing actual spend
        const approved = requisitions.filter(
          (r) => r.status === "APPROVED" || r.status === "ORDER_CREATED"
        );

        // 1. Total spend
        const total = approved.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
        setTotalSpend(total);

        // 2. Spend by department
        const deptMap = {};
        approved.forEach((r) => {
          const deptName = r.department?.departmentName || "Unknown Dept";
          deptMap[deptName] = (deptMap[deptName] || 0) + (r.totalAmount || 0);
        });
        const deptList = Object.keys(deptMap).map((name) => ({
          name,
          amount: deptMap[name],
        }));
        setByDepartment(deptList);

        // 3. Spend by category
        const catMap = {};
        approved.forEach((r) => {
          const catName = r.category?.categoryName || "Unknown Category";
          catMap[catName] = (catMap[catName] || 0) + (r.totalAmount || 0);
        });
        const catList = Object.keys(catMap).map((name) => ({
          name,
          amount: catMap[name],
        }));
        setByCategory(catList);

        // 4. Spend by vendor
        const vendorMap = {};
        approved.forEach((r) => {
          if (!r.supplier) return;
          const vendorName = r.supplier.supplierName;
          if (!vendorMap[vendorName]) {
            vendorMap[vendorName] = { amount: 0, count: 0 };
          }
          vendorMap[vendorName].amount += r.totalAmount || 0;
          vendorMap[vendorName].count += 1;
        });
        const vendorList = Object.keys(vendorMap).map((name) => ({
          name,
          amount: vendorMap[name].amount,
          orders: vendorMap[name].count,
        }));
        setTopVendors(vendorList.sort((a, b) => b.amount - a.amount));

        // 5. Audit logs (newest first)
        const sortedLogs = logs.sort(
          (a, b) => new Date(b.actionTime) - new Date(a.actionTime)
        );
        setAuditLogs(sortedLogs);
      } catch {
        setError("Failed to compile spend reports and audit logs.");
      } finally {
        setLoading(false);
      }
    }
    loadReportData();
  }, [user.token]);

  function getMax(list) {
    let max = 0;
    for (const item of list) {
      if (item.amount > max) {
        max = item.amount;
      }
    }
    return max || 1;
  }

  const maxDept = getMax(byDepartment);
  const maxCategory = getMax(byCategory);

  return (
    <div className="report-page">
      <h1>Spend Report & System Audits</h1>
      <p className="report-subtext">Analytics overview and real-time activity log</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p style={{ padding: "1.5rem" }}>Compiling reports and logs...</p>
      ) : (
        <>
          <div className="report-total-card">
            <span>Total Spend (Approved Requests)</span>
            <strong>₹ {totalSpend.toLocaleString()}</strong>
          </div>

          <div className="report-grid">
            <div className="report-card">
              <h2>Spend by Department</h2>
              {byDepartment.length === 0 ? (
                <p style={{ color: "#666" }}>No department spend recorded yet.</p>
              ) : (
                byDepartment.map((d, index) => (
                  <div className="report-bar-row" key={index}>
                    <span className="report-bar-label">{d.name}</span>
                    <div className="report-bar-track">
                      <div
                        className="report-bar-fill"
                        style={{ width: (d.amount / maxDept) * 100 + "%" }}
                      ></div>
                    </div>
                    <span className="report-bar-amount">₹ {d.amount.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            <div className="report-card">
              <h2>Spend by Category</h2>
              {byCategory.length === 0 ? (
                <p style={{ color: "#666" }}>No category spend recorded yet.</p>
              ) : (
                byCategory.map((c, index) => (
                  <div className="report-bar-row" key={index}>
                    <span className="report-bar-label">{c.name}</span>
                    <div className="report-bar-track">
                      <div
                        className="report-bar-fill report-bar-fill-alt"
                        style={{ width: (c.amount / maxCategory) * 100 + "%" }}
                      ></div>
                    </div>
                    <span className="report-bar-amount">₹ {c.amount.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="report-card">
            <h2>Top Vendors</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Orders</th>
                  <th>Total Spend</th>
                </tr>
              </thead>
              <tbody>
                {topVendors.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>No vendor spend recorded yet.</td>
                  </tr>
                ) : (
                  topVendors.map((v, index) => (
                    <tr key={index}>
                      <td>{v.name}</td>
                      <td>{v.orders}</td>
                      <td>₹ {v.amount.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="report-card" style={{ marginTop: "2rem" }}>
            <h2>System Audit Logs</h2>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>User</th>
                    <th>Module</th>
                    <th>Action</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>No audit log entries.</td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.auditId}>
                        <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                          {new Date(log.actionTime).toLocaleString()}
                        </td>
                        <td>{log.user?.fullName || log.user?.username || "System"}</td>
                        <td>{log.module}</td>
                        <td>
                          <span
                            style={{
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              backgroundColor: "#f1f3f4",
                              color: "#3c4043",
                            }}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td>{log.remarks}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportsDashboard;