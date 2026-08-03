import { useEffect, useState } from "react";
import { apiFetch } from "../../api";
import "./Dashboard.css";

function Dashboard({ user, onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Requester state
  const [myRequisitions, setMyRequisitions] = useState([]);
  
  // Manager / Finance state
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [actioningId, setActioningId] = useState(null);
  
  // Admin state
  const [allRequisitions, setAllRequisitions] = useState([]);
  const [allPOs, setAllPOs] = useState([]);
  const [recentAudits, setRecentAudits] = useState([]);
  
  // Receiver state
  const [receiverPOs, setReceiverPOs] = useState([]);

  // Cost Center (Finance / Admin) state
  const [costCenters, setCostCenters] = useState([]);

  async function loadDashboardData() {
    setLoading(true);
    setError("");
    try {
      if (user.role === "Requester") {
        const reqs = await apiFetch("/api/requisitions/my", {}, user.token);
        setMyRequisitions(reqs);
      } 
      else if (user.role === "Approver") {
        const pending = await apiFetch("/api/requisitions/pending", {}, user.token);
        setPendingApprovals(pending);
      } 
      else if (user.role === "Finance") {
        const [pending, reqs, ccs] = await Promise.all([
          apiFetch("/api/requisitions/pending", {}, user.token),
          apiFetch("/api/requisitions", {}, user.token),
          apiFetch("/api/cost-centers", {}, user.token),
        ]);
        setPendingApprovals(pending);
        
        const approved = reqs.filter(r => r.status === "APPROVED" || r.status === "ORDER_CREATED");
        const ALLOCATION_PER_CC = 500000;
        const mappedCCs = ccs.map(cc => {
          const spent = approved
            .filter(r => r.department?.costCenter?.costCenterId === cc.costCenterId)
            .reduce((sum, r) => sum + (r.totalAmount || 0), 0);
          return {
            ...cc,
            allocated: ALLOCATION_PER_CC,
            spent,
            remaining: Math.max(0, ALLOCATION_PER_CC - spent)
          };
        });
        setCostCenters(mappedCCs);
      } 
      else if (user.role === "Goods Receiver") {
        const pos = await apiFetch("/api/purchase-orders", {}, user.token);
        setReceiverPOs(pos);
      } 
      else if (user.role === "Procurement Admin") {
        const [reqs, pos, audits] = await Promise.all([
          apiFetch("/api/requisitions", {}, user.token),
          apiFetch("/api/purchase-orders", {}, user.token),
          apiFetch("/api/audit-logs", {}, user.token),
        ]);
        setAllRequisitions(reqs);
        setAllPOs(pos);
        setRecentAudits(audits.slice(0, 5));
      }
    } catch (err) {
      setError("Unable to load live dashboard statistics. Please try signing in again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, [user.role, user.token]);

  async function handleApprove(id) {
    const remarks = prompt("Enter approval remarks (optional):", "Approved via dashboard");
    if (remarks === null) return;
    setActioningId(id);
    try {
      await apiFetch(`/api/requisitions/${id}/approve`, {
        method: "POST",
        body: JSON.stringify({ remarks })
      }, user.token);
      alert("Requisition approved successfully!");
      loadDashboardData();
    } catch (err) {
      alert("Approval action failed: " + err.message);
    } finally {
      setActioningId(null);
    }
  }

  async function handleReject(id) {
    const remarks = prompt("Enter rejection remarks (required):");
    if (!remarks) {
      alert("Rejection remarks are required.");
      return;
    }
    setActioningId(id);
    try {
      await apiFetch(`/api/requisitions/${id}/reject`, {
        method: "POST",
        body: JSON.stringify({ remarks })
      }, user.token);
      alert("Requisition rejected successfully!");
      loadDashboardData();
    } catch (err) {
      alert("Rejection action failed: " + err.message);
    } finally {
      setActioningId(null);
    }
  }

  if (loading) {
    return <div className="dash-loading">Loading live procurement workspace...</div>;
  }

  if (error) {
    return (
      <div className="dash-error-container">
        <p className="dash-error">{error}</p>
        <button onClick={loadDashboardData} className="dash-retry-btn">Retry</button>
      </div>
    );
  }

  // ==========================================
  // RENDER DETAILED VIEW PER ROLE
  // ==========================================

  if (user.role === "Requester") {
    const drafts = myRequisitions.filter(r => r.status === "DRAFT").length;
    const pending = myRequisitions.filter(r => r.status === "PENDING_APPROVAL").length;
    const approved = myRequisitions.filter(r => r.status === "APPROVED" || r.status === "ORDER_CREATED").length;
    const rejected = myRequisitions.filter(r => r.status === "REJECTED").length;

    return (
      <div className="dash-container">
        <div className="dash-header">
          <div>
            <h1>Welcome Back, {user.username}</h1>
            <p>Requester Workspace · View your requisitions status and raise new requests</p>
          </div>
          <button className="dash-primary-btn" onClick={() => onNavigate("requisition")}>
            + New Requisition
          </button>
        </div>

        <div className="dash-stats-grid">
          <div className="dash-stat-card border-draft">
            <span>Draft Requests</span>
            <strong>{drafts}</strong>
          </div>
          <div className="dash-stat-card border-pending">
            <span>Pending Approval</span>
            <strong>{pending}</strong>
          </div>
          <div className="dash-stat-card border-approved">
            <span>Approved Requests</span>
            <strong>{approved}</strong>
          </div>
          <div className="dash-stat-card border-rejected">
            <span>Rejected Requests</span>
            <strong>{rejected}</strong>
          </div>
        </div>

        <div className="dash-table-card">
          <h2>My Recent Requests</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>PR Number</th>
                <th>Title</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequisitions.slice(0, 5).map(r => (
                <tr key={r.requisitionId}>
                  <td><strong>{r.requisitionNumber}</strong></td>
                  <td>{r.title}</td>
                  <td>{r.category?.categoryName || "N/A"}</td>
                  <td>{r.supplier?.supplierName || "Direct"}</td>
                  <td>₹ {(r.totalAmount || 0).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge badge-${r.status?.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {myRequisitions.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "#666" }}>No requisitions submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (user.role === "Approver") {
    return (
      <div className="dash-container">
        <div className="dash-header">
          <div>
            <h1>Manager Inbox</h1>
            <p>Approvals Workspace · Review and act on purchase requests assigned to your sequence step</p>
          </div>
        </div>

        <div className="dash-stats-grid">
          <div className="dash-stat-card border-pending">
            <span>Awaiting Your Approval</span>
            <strong>{pendingApprovals.length}</strong>
          </div>
        </div>

        <div className="dash-table-card">
          <h2>Pending Requisitions</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>PR Number</th>
                <th>Requester</th>
                <th>Category</th>
                <th>Department</th>
                <th>Amount</th>
                <th>Justification</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map(r => (
                <tr key={r.requisitionId}>
                  <td><strong>{r.requisitionNumber}</strong></td>
                  <td>{r.createdBy?.username}</td>
                  <td>{r.category?.categoryName}</td>
                  <td>{r.department?.departmentName}</td>
                  <td>₹ {(r.totalAmount || 0).toLocaleString()}</td>
                  <td>{r.justification}</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="dash-action-buttons">
                      <button 
                        className="btn-approve" 
                        onClick={() => handleApprove(r.requisitionId)}
                        disabled={actioningId === r.requisitionId}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject" 
                        onClick={() => handleReject(r.requisitionId)}
                        disabled={actioningId === r.requisitionId}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingApprovals.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", color: "#666" }}>All caught up! No requisitions pending your approval.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (user.role === "Finance") {
    const totalSpent = costCenters.reduce((sum, cc) => sum + cc.spent, 0);
    const totalAllocated = costCenters.reduce((sum, cc) => sum + cc.allocated, 0);
    const totalRemaining = totalAllocated - totalSpent;

    return (
      <div className="dash-container">
        <div className="dash-header">
          <div>
            <h1>Finance Officer Workspace</h1>
            <p>Finance Dashboard · Manage cost center budgets and sequence approvals</p>
          </div>
        </div>

        <div className="dash-stats-grid">
          <div className="dash-stat-card border-approved">
            <span>Total Allocated Budget</span>
            <strong>₹ {totalAllocated.toLocaleString()}</strong>
          </div>
          <div className="dash-stat-card border-rejected">
            <span>Total Spent</span>
            <strong>₹ {totalSpent.toLocaleString()}</strong>
          </div>
          <div className="dash-stat-card border-draft">
            <span>Total Remaining</span>
            <strong>₹ {totalRemaining.toLocaleString()}</strong>
          </div>
          <div className="dash-stat-card border-pending">
            <span>Awaiting Finance Approval</span>
            <strong>{pendingApprovals.length}</strong>
          </div>
        </div>

        {/* Pending approvals */}
        <div className="dash-table-card" style={{ marginBottom: "2rem" }}>
          <h2>Finance Pending Approvals</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>PR Number</th>
                <th>Requester</th>
                <th>Category</th>
                <th>Department</th>
                <th>Amount</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map(r => (
                <tr key={r.requisitionId}>
                  <td><strong>{r.requisitionNumber}</strong></td>
                  <td>{r.createdBy?.username}</td>
                  <td>{r.category?.categoryName}</td>
                  <td>{r.department?.departmentName}</td>
                  <td>₹ {(r.totalAmount || 0).toLocaleString()}</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="dash-action-buttons">
                      <button 
                        className="btn-approve" 
                        onClick={() => handleApprove(r.requisitionId)}
                        disabled={actioningId === r.requisitionId}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject" 
                        onClick={() => handleReject(r.requisitionId)}
                        disabled={actioningId === r.requisitionId}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingApprovals.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "#666" }}>No pending finance approvals.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cost centers summary */}
        <div className="dash-table-card">
          <h2>Cost Center Budget Tracks</h2>
          <div className="cc-progress-list">
            {costCenters.map(cc => {
              const percent = (cc.spent / cc.allocated) * 100;
              return (
                <div key={cc.costCenterId} className="cc-progress-item">
                  <div className="cc-progress-info">
                    <strong>{cc.costCenterName} ({cc.costCenterCode})</strong>
                    <span>₹ {cc.spent.toLocaleString()} Spent / ₹ {cc.allocated.toLocaleString()}</span>
                  </div>
                  <div className="cc-progress-bar-container">
                    <div 
                      className="cc-progress-bar-fill" 
                      style={{ 
                        width: `${Math.min(100, percent)}%`,
                        backgroundColor: percent > 90 ? "#ea4335" : "#34a853"
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "Goods Receiver") {
    const awaiting = receiverPOs.filter(p => p.status === "CREATED" || p.status === "PARTIALLY_DELIVERED").length;
    const completed = receiverPOs.filter(p => p.status === "FULLY_DELIVERED").length;

    return (
      <div className="dash-container">
        <div className="dash-header">
          <div>
            <h1>Warehouse Receiving Desk</h1>
            <p>Receiving Workspace · Log physical goods received against active Purchase Orders</p>
          </div>
          <button className="dash-primary-btn" onClick={() => onNavigate("receiving")}>
            Go to Goods Receipt
          </button>
        </div>

        <div className="dash-stats-grid">
          <div className="dash-stat-card border-pending">
            <span>Awaiting Receipts</span>
            <strong>{awaiting}</strong>
          </div>
          <div className="dash-stat-card border-approved">
            <span>Completed Receipts</span>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="dash-table-card">
          <h2>Active Deliveries</h2>
          <table className="dash-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Order Date</th>
                <th>Delivery Status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {receiverPOs.slice(0, 5).map(po => (
                <tr key={po.poId}>
                  <td><strong>{po.poNumber}</strong></td>
                  <td>{po.supplier?.supplierName || "Direct Supplier"}</td>
                  <td>{po.createdDate}</td>
                  <td>{po.stage}</td>
                  <td>
                    <span className={`status-badge badge-${po.status?.toLowerCase()}`}>
                      {po.status}
                    </span>
                  </td>
                </tr>
              ))}
              {receiverPOs.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#666" }}>No active POs in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (user.role === "Procurement Admin") {
    const pendingReqs = allRequisitions.filter(r => r.status === "PENDING_APPROVAL").length;
    const approvedReqs = allRequisitions.filter(r => r.status === "APPROVED" || r.status === "ORDER_CREATED").length;
    const rejectedReqs = allRequisitions.filter(r => r.status === "REJECTED").length;
    const totalPOs = allPOs.length;

    return (
      <div className="dash-container">
        <div className="dash-header">
          <div>
            <h1>Procurement Management Control</h1>
            <p>Admin Workspace · System KPIs, approvals overview, and recent activity logs</p>
          </div>
        </div>

        <div className="dash-stats-grid">
          <div className="dash-stat-card border-pending">
            <span>Pending Approvals</span>
            <strong>{pendingReqs}</strong>
          </div>
          <div className="dash-stat-card border-approved">
            <span>Approved Requisitions</span>
            <strong>{approvedReqs}</strong>
          </div>
          <div className="dash-stat-card border-rejected">
            <span>Rejected Requisitions</span>
            <strong>{rejectedReqs}</strong>
          </div>
          <div className="dash-stat-card border-draft">
            <span>Active Purchase Orders</span>
            <strong>{totalPOs}</strong>
          </div>
        </div>

        <div className="dash-two-columns">
          {/* Recent activities */}
          <div className="dash-table-card flex-1">
            <h2>Recent Audit Activities</h2>
            <div className="audit-list">
              {recentAudits.map(log => (
                <div key={log.auditId} className="audit-item">
                  <div className="audit-meta">
                    <span className="audit-user">👤 {log.user?.username}</span>
                    <span className="audit-time">{log.actionTime ? log.actionTime.replace("T", " ").substring(0, 16) : ""}</span>
                  </div>
                  <p className="audit-desc">
                    <span className="audit-module">[{log.module}]</span> <strong>{log.action}</strong>: {log.remarks}
                  </p>
                </div>
              ))}
              {recentAudits.length === 0 && (
                <p style={{ color: "#666", padding: "1rem 0" }}>No audit log activities recorded.</p>
              )}
            </div>
          </div>

          {/* Latest requests */}
          <div className="dash-table-card flex-1">
            <h2>Latest Requisitions</h2>
            <table className="dash-table mini-table">
              <thead>
                <tr>
                  <th>PR Number</th>
                  <th>Requester</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allRequisitions.slice(0, 5).map(r => (
                  <tr key={r.requisitionId}>
                    <td><strong>{r.requisitionNumber}</strong></td>
                    <td>{r.createdBy?.username}</td>
                    <td>₹ {(r.totalAmount || 0).toLocaleString()}</td>
                    <td>
                      <span className={`status-badge badge-${r.status?.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Dashboard;
