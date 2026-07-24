import { useState } from "react";
import "./ApprovalDashboard.css";

function ApprovalDashboard() {
  // fake sample requests for now — real data will come from Role 2's API later
  const [requests, setRequests] = useState([
    {
      id: "PR-001",
      title: "Q3 office supplies",
      department: "Engineering",
      neededBy: "2026-08-01",
      total: 4200,
      status: "Pending",
    },
    {
      id: "PR-002",
      title: "New laptops for design team",
      department: "Design",
      neededBy: "2026-08-10",
      total: 185000,
      status: "Pending",
    },
    {
      id: "PR-003",
      title: "Office chairs",
      department: "HR",
      neededBy: "2026-07-30",
      total: 32000,
      status: "Pending",
    },
  ]);

  function approveRequest(id) {
    const updated = requests.map((r) => {
      if (r.id === id) {
        return { ...r, status: "Approved" };
      }
      return r;
    });
    setRequests(updated);
  }

  function rejectRequest(id) {
    const updated = requests.map((r) => {
      if (r.id === id) {
        return { ...r, status: "Rejected" };
      }
      return r;
    });
    setRequests(updated);
  }

  return (
    <div className="approval-page">
      <h1>Pending Approvals</h1>
      <p className="approval-subtext">Requests waiting on your decision</p>

      <div className="approval-table-card">
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
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td>{r.department}</td>
                <td>{r.neededBy}</td>
                <td>₹ {r.total.toLocaleString()}</td>
                <td>
                  <span className={"status-badge status-" + r.status.toLowerCase()}>
                    {r.status}
                  </span>
                </td>
                <td>
                  {r.status === "Pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => approveRequest(r.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => rejectRequest(r.id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="no-action">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApprovalDashboard;