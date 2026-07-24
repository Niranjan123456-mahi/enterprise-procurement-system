import "./RequestDetail.css";

function RequestDetail({ request, onBack }) {
  return (
    <div className="detail-page">
      <button className="detail-back-btn" onClick={onBack}>
        ← Back
      </button>

      <h1>{request.title}</h1>
      <p className="detail-subtext">
        {request.id} ·{" "}
        <span className={"detail-badge detail-" + request.status.toLowerCase()}>
          {request.status}
        </span>
      </p>

      {/* line items */}
      <div className="detail-card">
        <h2>Line Items</h2>
        <table className="detail-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {request.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>₹ {item.unitPrice.toLocaleString()}</td>
                <td>₹ {(item.quantity * item.unitPrice).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* approval history */}
      <div className="detail-card">
        <h2>History</h2>
        <ul className="detail-history">
          {request.history.map((h, index) => (
            <li key={index}>
              <span className="detail-history-step">{h.step}</span>
              <span className="detail-history-date">{h.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RequestDetail;