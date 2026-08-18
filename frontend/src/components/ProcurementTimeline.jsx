import { Check, X, User, Clock } from 'lucide-react';
import './ProcurementTimeline.css';

/**
 * Plain-language approval/delivery tracker.
 *
 * Shows: Request Submitted -> Approval Stage 1/2/3 (however many actual
 * approvers this request needed) -> Purchase Order Created -> Order
 * Delivered.
 *
 * historyEvents is the raw list of history rows from the backend. It
 * includes a "Submitted" row (logged at creation time) plus one "Approved"
 * or "Rejected" row per approver who acted. The "Submitted" row must NOT be
 * counted as an approval stage - it's already represented by the first
 * "Request Submitted" step above, so it's filtered out here.
 */
export default function ProcurementTimeline({ status, historyEvents = [], submittedDate, submittedBy }) {
  const isRejected = status === 'REJECTED';
  const isCompleted = status === 'COMPLETED';
  const isApproved = status === 'APPROVED' || status === 'ORDER_CREATED' || isCompleted;
  const isPending = status === 'PENDING_APPROVAL';

  const steps = [
    {
      title: 'Request Submitted',
      description: 'Your request was submitted and sent for approval.',
      actionedBy: submittedBy || 'You',
      date: submittedDate,
      state: 'completed',
    },
  ];

  // Only real approval/rejection actions count as stages - the initial
  // "Submitted" history row is excluded since it's not an approval step.
  const approvalEvents = historyEvents.filter(
    (event) => (event.step || '').toLowerCase() !== 'submitted'
  );

  let stageNumber = 0;
  approvalEvents.forEach((event) => {
    const rejected = event.step === 'Rejected' || event.remarks?.toLowerCase().includes('reject');
    if (rejected) {
      steps.push({
        title: 'Request Rejected',
        description: event.remarks || 'This request was rejected.',
        actionedBy: event.actionedBy,
        date: event.date,
        state: 'rejected',
      });
      return;
    }
    stageNumber += 1;
    steps.push({
      title: `Approval Stage ${stageNumber}`,
      description: event.remarks || 'Approved.',
      actionedBy: event.actionedBy,
      date: event.date,
      state: 'completed',
    });
  });

  if (isPending) {
    steps.push({
      title: `Approval Stage ${stageNumber + 1}`,
      description: 'Waiting for approval.',
      actionedBy: 'Pending',
      date: null,
      state: 'active',
    });
  }

  if (!isRejected) {
    steps.push({
      title: 'Purchase Order Created',
      description: isApproved
        ? 'Your order has been placed with the supplier.'
        : 'Will happen once your request is fully approved.',
      actionedBy: isApproved ? 'Confirmed' : 'Pending',
      date: null,
      state: isApproved ? 'completed' : 'upcoming',
    });

    steps.push({
      title: 'Order Delivered',
      description: isCompleted
        ? 'All items have been received.'
        : isApproved
          ? 'Your order is on its way.'
          : 'Will happen once your order has been placed.',
      actionedBy: isCompleted ? 'Confirmed' : 'Pending',
      date: null,
      state: isCompleted ? 'completed' : isApproved ? 'active' : 'upcoming',
    });
  }

  return (
    <div className="timeline-container">
      {steps.map((step, index) => {
        const initials = step.actionedBy ? step.actionedBy.substring(0, 2).toUpperCase() : 'CC';
        return (
          <div key={index} className={`timeline-step-row timeline-step-${step.state}`}>
            <div className="timeline-badge-column">
              <div className="timeline-avatar-circle">
                {step.state === 'completed' ? (
                  <Check size={14} className="badge-check-icon" />
                ) : step.state === 'rejected' ? (
                  <X size={14} className="badge-reject-icon" />
                ) : step.state === 'active' ? (
                  <Clock size={14} className="badge-active-icon animate-pulse" />
                ) : (
                  <span className="badge-initials">{initials}</span>
                )}
              </div>
              {index !== steps.length - 1 && (
                <div className={`timeline-connector-line ${step.state === 'completed' ? 'completed' : ''}`} />
              )}
            </div>

            <div className="timeline-details-column">
              <div className="timeline-step-header">
                <h4>{step.title}</h4>
                {step.date && <span className="step-date-stamp">{step.date}</span>}
              </div>
              <p className="step-description-text">{step.description}</p>

              <div className="step-actor-info">
                <User size={12} className="actor-icon" />
                <span>{step.actionedBy}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}