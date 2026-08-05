import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getRequisitionById,
  getRequisitionHistory,
  getRequisitionLineItems,
} from '../../api/requisitionApi';
import ProcurementTimeline from '../../components/ProcurementTimeline';
import './RequestDetail.css';

// Maps real backend statuses (see RequisitionStatus.java) to the badge style
// classes already defined in RequestDetail.css.
const STATUS_BADGE_CLASS = {
  DRAFT: 'detail-pending',
  SUBMITTED: 'detail-pending',
  PENDING_APPROVAL: 'detail-pending',
  APPROVED: 'detail-approved',
  ORDER_CREATED: 'detail-approved',
  REJECTED: 'detail-rejected',
};

/**
 * Two ways to use this component:
 *  1. Route mode (no props): mounted at /requisitions/:id, fetches everything
 *     itself using the id from the URL.
 *  2. Prop mode (`request` + `onBack` passed in): caller (e.g. MyRequests.jsx)
 *     already fetched and pre-formatted the data — just render it inline
 *     without an extra network round-trip or route change.
 */
export default function RequestDetail({ request: propRequest, onBack }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isPropMode = propRequest != null;

  const [requisition, setRequisition] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(!isPropMode);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isPropMode || !id) return;
    async function fetchAll() {
      try {
        setLoading(true);
        setError('');
        const [reqData, historyData, lineItemData] = await Promise.all([
          getRequisitionById(id),
          getRequisitionHistory(id),
          getRequisitionLineItems(id),
        ]);
        setRequisition(reqData);
        setHistory(historyData);
        setLineItems(lineItemData);
      } catch (err) {
        console.error('Failed to fetch requisition data:', err);
        setError('Failed to load requisition details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isPropMode]);

  if (loading) {
    return <div className="detail-page"><p className="detail-subtext">Loading requisition details...</p></div>;
  }

  if (error) {
    return (
      <div className="detail-page">
        <p className="detail-subtext" style={{ color: '#991b1b' }}>{error}</p>
      </div>
    );
  }

  // Normalize both modes into the same shape for rendering.
  let displayId, displayTitle, displayStatus, displayLineItems, displayHistory;
  let submittedDate, submittedBy;
  let extraInfo = null;

  if (isPropMode) {
    displayId = propRequest.id;
    displayTitle = propRequest.title;
    displayStatus = propRequest.status;
    displayLineItems = (propRequest.items || []).map((item, idx) => ({
      lineItemId: idx,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    displayHistory = (propRequest.history || []).map((h) => ({
      step: h.step,
      actionedBy: h.actionedBy,
      remarks: h.remarks,
      date: h.date,
    }));
  } else {
    if (!requisition) return null;
    displayId = requisition.requisitionNumber || `Requisition #${requisition.requisitionId}`;
    displayTitle = requisition.title;
    displayStatus = requisition.status;
    displayLineItems = lineItems;
    displayHistory = history.map((h) => ({
      step: h.step,
      actionedBy: h.actionBy?.fullName || h.actionBy?.username || null,
      remarks: h.remarks,
      date: h.actionDate ? new Date(h.actionDate).toLocaleDateString() : null,
    }));
    submittedDate = requisition.createdAt ? new Date(requisition.createdAt).toLocaleDateString() : null;
    submittedBy = requisition.createdBy?.fullName || requisition.createdBy?.username;
    extraInfo = (
      <div className="detail-card">
        <h2>Request Info</h2>
        <table className="detail-table">
          <tbody>
            <tr><td>Department</td><td>{requisition.department?.departmentName || '—'}</td></tr>
            <tr><td>Category</td><td>{requisition.category?.categoryName || '—'}</td></tr>
            <tr><td>Supplier</td><td>{requisition.supplier?.supplierName || 'Direct'}</td></tr>
            <tr><td>Needed By</td><td>{requisition.neededBy || '—'}</td></tr>
            <tr><td>Justification</td><td>{requisition.justification || '—'}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }

  const badgeClass = STATUS_BADGE_CLASS[displayStatus] || 'detail-pending';
  const totalAmount = displayLineItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0),
    0
  );

  return (
    <div className="detail-page">
      <button className="detail-back-btn" onClick={onBack || (() => navigate(-1))}>
        &larr; Back
      </button>

      <h1>{displayId}</h1>
      <p className="detail-subtext">
        {displayTitle}
        {' · '}
        <span className={`detail-badge ${badgeClass}`}>
          {(displayStatus || '').replace(/_/g, ' ')}
        </span>
      </p>

      <div className="detail-card">
        <h2>Approval Progress</h2>
        <ProcurementTimeline
          status={displayStatus}
          historyEvents={displayHistory}
          submittedDate={submittedDate}
          submittedBy={submittedBy}
        />
      </div>

      {extraInfo}

      <div className="detail-card">
        <h2>Requested Items</h2>
        <table className="detail-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {displayLineItems.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#9ca3af' }}>No line items found.</td>
              </tr>
            ) : (
              displayLineItems.map((item) => (
                <tr key={item.lineItemId}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {(item.unitPrice || 0).toLocaleString()}</td>
                  <td>₹ {((item.quantity || 0) * (item.unitPrice || 0)).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
          {displayLineItems.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right', fontWeight: 600 }}>Total</td>
                <td style={{ fontWeight: 600 }}>₹ {totalAmount.toLocaleString()}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

    </div>
  );
}