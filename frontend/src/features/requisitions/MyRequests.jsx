import { useState, useEffect } from "react";
import { apiFetch } from "../../api";
import "./MyRequests.css";
import RequestDetail from "./RequestDetail";

function MyRequests({ user }) {
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await apiFetch("/api/requisitions/my", {}, user.token);
        setMyRequests(data);
      } catch {
        setError("Failed to load your purchase requests.");
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, [user.token]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  async function handleRowClick(r) {
    setLoadingDetail(true);
    try {
      const [itemsData, historyData] = await Promise.all([
        apiFetch("/api/requisition-line-items", {}, user.token),
        apiFetch("/api/requisition-history", {}, user.token),
      ]);

      const filteredItems = itemsData
        .filter((item) => item.requisition?.requisitionId === r.requisitionId)
        .map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }));

      const filteredHistory = historyData
        .filter((h) => h.requisition?.requisitionId === r.requisitionId)
        .sort((a, b) => new Date(a.actionDate) - new Date(b.actionDate))
        .map((h) => ({
          step: `${h.step} by ${h.actionBy?.fullName || h.actionBy?.username || "System"}${h.remarks ? ` — ${h.remarks}` : ""}`,
          date: new Date(h.actionDate).toLocaleDateString(),
        }));

      setSelectedRequest({
        id: r.requisitionNumber,
        title: r.title,
        status: r.status,
        items: filteredItems,
        history: filteredHistory,
      });
    } catch {
      alert("Failed to load request details.");
    } finally {
      setLoadingDetail(false);
    }
  }

  if (selectedRequest !== null) {
    return (
      <RequestDetail
        request={selectedRequest}
        onBack={() => setSelectedRequest(null)}
      />
    );
  }

  return (
    <div className="myreq-page">
      <h1>My Requests</h1>
      <p className="myreq-subtext">Requests you have submitted so far</p>
      {error && <p className="myreq-error" style={{ color: "red" }}>{error}</p>}
      {loadingDetail && <p style={{ color: "var(--primary-color)" }}>Loading request details...</p>}

      <div className="myreq-table-card">
        {loading ? (
          <p className="myreq-loading" style={{ padding: "1.5rem" }}>Loading your requests...</p>
        ) : (
          <table className="myreq-table">
            <thead>
              <tr>
                <th>PR #</th>
                <th>Title</th>
                <th>Needed by</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "1.5rem" }}>No requests found.</td>
                </tr>
              ) : (
                myRequests.map((r) => (
                  <tr
                    key={r.requisitionId}
                    className="myreq-clickable-row"
                    onClick={() => handleRowClick(r)}
                  >
                    <td>{r.requisitionNumber}</td>
                    <td>{r.title}</td>
                    <td>{r.neededBy}</td>
                    <td>₹ {(r.totalAmount || 0).toLocaleString()}</td>
                    <td>
                      <span className={"myreq-badge myreq-" + r.status.toLowerCase()}>
                        {r.status}
                      </span>
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

export default MyRequests;