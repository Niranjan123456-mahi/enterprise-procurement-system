import './ProcurementTimeline.css';

export default function ProcurementTimeline({ status, historyEvents = [], submittedDate, submittedBy }) {
  const isRejected = status === 'REJECTED';
  const isOrderCreated = status === 'ORDER_CREATED';
  const isApproved = status === 'APPROVED' || isOrderCreated;
  const isPending = status === 'PENDING_APPROVAL';

  // Build the ordered list of steps to render.
  const steps = [
    {
      title: 'Submitted',
      description: 'Requisition created and sent for approval.',
      actionedBy: submittedBy || 'Requester',
      date: submittedDate,
      state: 'completed',
    },
  ];

  historyEvents.forEach((event) => {
    const rejected = event.step === 'Rejected';
    steps.push({
      title: rejected ? 'Rejected' : 'Approved',
      description: event.remarks || (rejected ? 'This request was rejected.' : 'Signed off by an approver in the chain.'),
      actionedBy: event.actionedBy,
      date: event.date,
      state: rejected ? 'rejected' : 'completed',
    });
  });

  if (isPending) {
    steps.push({
      title: 'Awaiting Next Approval',
      description: 'Waiting for the next approver in the chain to review this request.',
      actionedBy: 'Pending',
      date: null,
      state: 'active',
    });
  } else if (isApproved) {
    steps.push({
      title: 'Fully Approved',
      description: 'All required approvers have signed off.',
      actionedBy: 'System',
      date: null,
      state: 'completed',
    });
  }

  if (isOrderCreated) {
    steps.push({
      title: 'Purchase Order Generated',
      description: 'A Purchase Order was automatically created for this request.',
      actionedBy: 'System',
      date: null,
      state: 'completed',
    });
  }

  if (!isRejected && !isOrderCreated) {
    steps.push({
      title: 'Purchase Order Generated',
      description: 'Will be created automatically once fully approved.',
      actionedBy: 'Pending',
      date: null,
      state: isApproved ? 'active' : 'upcoming',
    });
  }

  return (
    <div className="timeline">
      {steps.map((step, index) => (
        <div key={index} className={`timeline-step timeline-step-${step.state}`}>
          <div className="timeline-marker-col">
            <div className="timeline-dot">
              {step.state === 'completed' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {step.state === 'rejected' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </div>
            {index !== steps.length - 1 && <div className="timeline-line" />}
          </div>
          <div className="timeline-content">
            <div className="timeline-content-header">
              <h4>{step.title}</h4>
              {step.date && <span className="timeline-date">{step.date}</span>}
            </div>
            <p className="timeline-description">{step.description}</p>
            <div className="timeline-actor">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {step.actionedBy}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}