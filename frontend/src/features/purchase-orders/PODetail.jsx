import { useState } from "react";
import "./PODetail.css";

function PODetail({ order, onBack }) {
  // keeps track of what the user types into each "receive" box, per item
  const [receiveInputs, setReceiveInputs] = useState({});

  // local copy of items so we can update "received" when marking a delivery
  const [items, setItems] = useState(order.items);
  const [receipts, setReceipts] = useState(order.receipts);

  function handleInputChange(index, value) {
    setReceiveInputs({ ...receiveInputs, [index]: value });
  }

  function recordReceipt(index) {
    const qty = parseFloat(receiveInputs[index]);
    if (!qty || qty <= 0) {
      return;
    }

    // update the received count for that item
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, received: item.received + qty };
      }
      return item;
    });
    setItems(updatedItems);

    // add a new entry to the receipt history
    const newReceipt = {
      date: new Date().toISOString().slice(0, 10),
      description: items[index].description,
      qty: qty,
    };
    setReceipts([...receipts, newReceipt]);

    // clear the input box
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