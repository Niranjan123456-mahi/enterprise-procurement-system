import { useState } from "react";
import "./MyRequests.css";
import RequestDetail from "./RequestDetail";

function MyRequests() {
  const [myRequests] = useState([
    {
      id: "PR-001",
      title: "Q3 office supplies",
      neededBy: "2026-08-01",
      total: 4200,
      status: "Approved",
      items: [
        { description: "A4 paper box", quantity: 10, unitPrice: 300 },
        { description: "Pens (box of 50)", quantity: 4, unitPrice: 300 },
      ],
      history: [
        { step: "Submitted by employee1", date: "2026-07-10" },
        { step: "Approved by manager1", date: "2026-07-12" },
      ],
    },
    {
      id: "PR-005",
      title: "New monitor",
      neededBy: "2026-08-05",
      total: 15000,
      status: "Pending",
      items: [{ description: "24 inch monitor", quantity: 1, unitPrice: 15000 }],
      history: [{ step: "Submitted by employee1", date: "2026-07-18" }],
    },
    {
      id: "PR-006",
      title: "Notebook printer",
      neededBy: "2026-07-28",
      total: 8000,
      status: "Rejected",
      items: [{ description: "Laser printer", quantity: 1, unitPrice: 8000 }],
      history: [
        { step: "Submitted by employee1", date: "2026-07-15" },
        { step: "Rejected by manager1 — over budget", date: "2026-07-16" },
      ],
    },
  ]);

  // which request is currently open, null means show the list
  const [selectedRequest, setSelectedRequest] = useState(null);

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

      <div className="myreq-table-card">
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
            {myRequests.map((r) => (
              <tr
                key={r.id}
                className="myreq-clickable-row"
                onClick={() => setSelectedRequest(r)}
              >
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td>{r.neededBy}</td>
                <td>₹ {r.total.toLocaleString()}</td>
                <td>
                  <span className={"myreq-badge myreq-" + r.status.toLowerCase()}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyRequests;