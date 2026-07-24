import { useState } from "react";
import "./POTracker.css";
import PODetail from "./PODetail";

function POTracker() {
  const [orders] = useState([
    {
      id: "PO-101",
      vendor: "Staples India",
      created: "2026-07-15",
      total: 4200,
      stage: "Fully Delivered",
      items: [
        { description: "A4 paper box", ordered: 10, received: 10, unitPrice: 300 },
      ],
      receipts: [
        { date: "2026-07-20", description: "A4 paper box", qty: 10 },
      ],
    },
    {
      id: "PO-102",
      vendor: "Dell Technologies",
      created: "2026-07-18",
      total: 185000,
      stage: "Partially Delivered",
      items: [
        { description: "Laptop - Dell Latitude", ordered: 5, received: 3, unitPrice: 37000 },
      ],
      receipts: [
        { date: "2026-07-22", description: "Laptop - Dell Latitude", qty: 3 },
      ],
    },
    {
      id: "PO-103",
      vendor: "Godrej Interio",
      created: "2026-07-20",
      total: 32000,
      stage: "Sent to Vendor",
      items: [
        { description: "Office chair", ordered: 8, received: 0, unitPrice: 4000 },
      ],
      receipts: [],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  function stageClass(stage) {
    return "stage-" + stage.toLowerCase().replace(/ /g, "-");
  }

  if (selectedOrder !== null) {
    return <PODetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="po-page">
      <h1>Purchase Orders</h1>
      <p className="po-subtext">Orders issued to your vendors</p>

      <div className="po-table-card">
        <table className="po-table">
          <thead>
            <tr>
              <th>PO #</th>
              <th>Vendor</th>
              <th>Created</th>
              <th>Total</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="po-clickable-row"
                onClick={() => setSelectedOrder(order)}
              >
                <td>{order.id}</td>
                <td>{order.vendor}</td>
                <td>{order.created}</td>
                <td>₹ {order.total.toLocaleString()}</td>
                <td>
                  <span className={"po-stage-badge " + stageClass(order.stage)}>
                    {order.stage}
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

export default POTracker;