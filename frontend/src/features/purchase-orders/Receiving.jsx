import { useState } from "react";
import "./Receiving.css";
import PODetail from "./PODetail";

function Receiving() {
  // only orders that still need deliveries — Fully Delivered ones don't show up here
  const [orders] = useState([
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

  if (selectedOrder !== null) {
    return <PODetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="recv-page">
      <h1>Receiving</h1>
      <p className="recv-subtext">Log deliveries for open purchase orders</p>

      <div className="recv-table-card">
        <table className="recv-table">
          <thead>
            <tr>
              <th>PO #</th>
              <th>Vendor</th>
              <th>Created</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="recv-empty">No POs awaiting receipt.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="recv-clickable-row"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td>{order.id}</td>
                  <td>{order.vendor}</td>
                  <td>{order.created}</td>
                  <td>₹ {order.total.toLocaleString()}</td>
                  <td>{order.stage}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Receiving;