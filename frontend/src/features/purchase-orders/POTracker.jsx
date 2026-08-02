import { useState, useEffect } from "react";
import { apiFetch } from "../../api";
import "./POTracker.css";
import PODetail from "./PODetail";

function POTracker({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await apiFetch("/api/purchase-orders", {}, user.token);
        setOrders(data);
      } catch {
        setError("Failed to load purchase orders.");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user.token]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  function stageClass(stage) {
    if (!stage) return "stage-unknown";
    return "stage-" + stage.toLowerCase().replace(/ /g, "-");
  }

  async function loadOrderDetail(po) {
    setLoadingDetail(true);
    try {
      const [lineItemsData, receiptsData] = await Promise.all([
        apiFetch("/api/po-line-items", {}, user.token),
        apiFetch("/api/po-receipts", {}, user.token),
      ]);

      const filteredItems = lineItemsData
        .filter((item) => item.purchaseOrder?.poId === po.poId)
        .map((item) => ({
          description: item.description,
          ordered: item.orderedQty,
          received: item.receivedQty || 0,
          unitPrice: item.unitPrice,
        }));

      const filteredReceipts = receiptsData
        .filter((rec) => rec.purchaseOrder?.poId === po.poId)
        .sort((a, b) => new Date(a.receivedDate) - new Date(b.receivedDate))
        .map((rec) => ({
          date: rec.receivedDate,
          description: rec.description,
          qty: rec.qtyReceived,
        }));

      setSelectedOrder({
        poId: po.poId,
        id: po.poNumber,
        vendor: po.supplier?.supplierName || "—",
        created: po.createdDate,
        total: po.requisition?.totalAmount || 0,
        stage: po.stage,
        items: filteredItems,
        receipts: filteredReceipts,
      });
    } catch {
      alert("Failed to load purchase order details.");
    } finally {
      setLoadingDetail(false);
    }
  }

  async function handleRecordReceipt(poId, description, qty) {
    try {
      const payload = {
        purchaseOrder: { poId: poId },
        description: description,
        qtyReceived: parseInt(qty),
        receivedDate: new Date().toISOString().slice(0, 10),
      };

      await apiFetch(
        "/api/po-receipts",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        user.token
      );

      // reload PO details
      const poObj = orders.find((o) => o.poId === poId);
      if (poObj) {
        await loadOrderDetail(poObj);
      }
    } catch (err) {
      alert(err.message || "Failed to record receipt.");
    }
  }

  if (selectedOrder !== null) {
    return (
      <PODetail
        order={selectedOrder}
        onRecordReceipt={handleRecordReceipt}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="po-page">
      <h1>Purchase Orders</h1>
      <p className="po-subtext">Orders issued to your vendors</p>
      {error && <p className="po-error" style={{ color: "red" }}>{error}</p>}
      {loadingDetail && <p style={{ color: "var(--primary-color)" }}>Loading details...</p>}

      <div className="po-table-card">
        {loading ? (
          <p style={{ padding: "1.5rem" }}>Loading purchase orders...</p>
        ) : (
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
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "1.5rem" }}>No purchase orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.poId}
                    className="po-clickable-row"
                    onClick={() => loadOrderDetail(order)}
                  >
                    <td>{order.poNumber}</td>
                    <td>{order.supplier?.supplierName || "—"}</td>
                    <td>{order.createdDate}</td>
                    <td>₹ {(order.requisition?.totalAmount || 0).toLocaleString()}</td>
                    <td>
                      <span className={"po-stage-badge " + stageClass(order.stage)}>
                        {order.stage}
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

export default POTracker;