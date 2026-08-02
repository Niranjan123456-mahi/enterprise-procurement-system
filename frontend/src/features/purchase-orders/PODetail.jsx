import { useState } from "react";
import "./PODetail.css";

function PODetail({ order, onRecordReceipt, onBack }) {
  const [receiveInputs, setReceiveInputs] = useState({});

  const items = order.items || [];
  const receipts = order.receipts || [];

  function handleInputChange(index, value) {
    setReceiveInputs({ ...receiveInputs, [index]: value });
  }

  function recordReceipt(index) {
    const qty = parseFloat(receiveInputs[index]);
    if (!qty || qty <= 0) {
      return;
    }

    onRecordReceipt(order.poId, items[index].description, qty);
    setReceiveInputs({ ...receiveInputs, [index]: "" });
  }

  return (
    <div className="pod-page">
      <button className="pod-back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="pod-header">
        <div>
          <h1>{order.id}</h1>
          <p className="pod-subtext">
            {order.vendor} · Created {order.created}
          </p>
        </div>
        <div className="pod-total">
          <span>Total</span>
          <strong>₹ {order.total.toLocaleString()}</strong>
        </div>
      </div>

      {/* line items with ordered vs received */}
      <div className="pod-card">
        <h2>Line Items</h2>
        <table className="pod-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Ordered</th>
              <th>Received</th>
              <th>Unit Price</th>
              <th>Receive More</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const outstanding = item.ordered - item.received;
              return (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.ordered}</td>
                  <td>{item.received}</td>
                  <td>₹ {item.unitPrice.toLocaleString()}</td>
                  <td>
                    {outstanding > 0 ? (
                      <div className="pod-receive-box">
                        <input
                          type="number"
                          placeholder={"up to " + outstanding}
                          value={receiveInputs[index] || ""}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        <button onClick={() => recordReceipt(index)}>Receive</button>
                      </div>
                    ) : (
                      <span className="pod-complete">Complete</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* receipt history */}
      <div className="pod-card">
        <h2>Receipt History</h2>
        {receipts.length === 0 ? (
          <p className="pod-empty">No deliveries recorded yet.</p>
        ) : (
          <ul className="pod-history">
            {receipts.map((r, index) => (
              <li key={index}>
                <span>{r.description} — {r.qty} received</span>
                <span className="pod-history-date">{r.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PODetail;