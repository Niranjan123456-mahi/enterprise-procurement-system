import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../api";
import "./ApprovalDashboard.css";

function ApprovalDashboard({ user }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPending() {
      try {
        const data = await apiFetch("/api/requisitions/pending", {}, user.token);
        setRequests(data);
      } catch {
        setError("Failed to load pending approvals.");
      } finally {
        setLoading(false);
      }
    }
    loadPending();
  }, [user.token]);

  async function approveRequest(id, reqId) {
    const remarks = window.prompt("Enter approval remarks (optional):", "Approved");
    if (remarks === null) return; // user cancelled

    try {
      await apiFetch(
        `/api/requisitions/${reqId}/approve`,
        {
          method: "POST",
          body: JSON.stringify({ remarks }),
        },
        user.token
      );
      setRequests(requests.filter((r) => r.requisitionId !== reqId));
    } catch (err) {
      alert(err.message || "Failed to approve requisition.");
    }
  }

  async function rejectRequest(id, reqId) {
    const remarks = window.prompt("Enter rejection remarks (required):", "Rejected");
    if (!remarks) {
      if (remarks !== null) alert("Rejection remarks are required.");
      return;
    }

    try {
      await apiFetch(
        `/api/requisitions/${reqId}/reject`,
        {
          method: "POST",
          body: JSON.stringify({ remarks }),
        },
        user.token
      );
      setRequests(requests.filter((r) => r.requisitionId !== reqId));
    } catch (err) {
      alert(err.message || "Failed to reject requisition.");
    }
  }

  return (
    <div className="approval-page">
      <h1>Pending Approvals</h1>
      <p className="approval-subtext">Requests waiting on your decision</p>
      {error && <p className="approval-error" style={{ color: "red" }}>{error}</p>}

      <div className="approval-table-card">
        {loading ? (
          <p style={{ padding: "1.5rem" }}>Loading pending approvals...</p>
        ) : (
          <table className="approval-table">
            <thead>
              <tr>
                <th>PR #</th>
                <th>Title</th>
                <th>Department</th>
                <th>Needed by</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "1.5rem" }}>No pending approvals found.</td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.requisitionId}>
                    <td>
                      <button
                        className="approval-view-link"
                        onClick={() => navigate(`/requisitions/${r.requisitionId}`)}
                      >
                        {r.requisitionNumber}
                      </button>
                    </td>
                    <td>{r.title}</td>
                    <td>{r.department?.departmentName || "—"}</td>
                    <td>{r.neededBy}</td>
                    <td>₹ {(r.totalAmount || 0).toLocaleString()}</td>
                    <td>
                      <span className={"status-badge status-" + r.status.toLowerCase()}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.status === "PENDING_APPROVAL" || r.status === "PENDING" ? (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() => approveRequest(r.requisitionNumber, r.requisitionId)}
                          >
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => rejectRequest(r.requisitionNumber, r.requisitionId)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="no-action">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ApprovalDashboard;