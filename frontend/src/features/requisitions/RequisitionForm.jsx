import { useState } from "react";
import "./RequisitionForm.css";

function RequisitionForm() {
  // basic details about the request
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [justification, setJustification] = useState("");

  // the list of items being requested
  // each line has: description, quantity, unit price
  const [lines, setLines] = useState([
    { description: "", quantity: "1", unitPrice: "0" },
  ]);

  function addLine() {
    setLines([...lines, { description: "", quantity: "1", unitPrice: "0" }]);
  }

  function removeLine(index) {
    setLines(lines.filter((line, i) => i !== index));
  }

  function updateLine(index, field, value) {
    const updatedLines = lines.map((line, i) => {
      if (i === index) {
        return { ...line, [field]: value };
      }
      return line;
    });
    setLines(updatedLines);
  }

  // add up quantity x unit price for every line
  function calculateTotal() {
    let total = 0;
    for (const line of lines) {
      const qty = parseFloat(line.quantity) || 0;
      const price = parseFloat(line.unitPrice) || 0;
      total = total + qty * price;
    }
    return total;
  }

  function handleSaveDraft() {
    alert("Draft saved (not connected to backend yet)");
  }

  function handleSubmit() {
    alert("Request submitted for approval (not connected to backend yet)");
  }

  return (
    <div className="req-page">
      <h1>New Purchase Request</h1>

      {/* details section */}
      <div className="req-card">
        <h2>Details</h2>

        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Q3 office supplies"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="req-row">
          <div className="req-col">
            <label>Department</label>
            <input
              type="text"
              placeholder="Engineering"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="req-col">
            <label>Needed by</label>
            <input
              type="date"
              value={neededBy}
              onChange={(e) => setNeededBy(e.target.value)}
            />
          </div>
        </div>

        <label>Justification</label>
        <textarea
          rows="3"
          placeholder="Why do you need this?"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        ></textarea>
      </div>

      {/* line items section */}
      <div className="req-card">
        <div className="req-line-header">
          <h2>Line Items</h2>
          <button className="req-add-btn" onClick={addLine}>
            + Add line
          </button>
        </div>

        {lines.map((line, index) => (
          <div className="req-line" key={index}>
            <input
              type="text"
              placeholder="Description"
              value={line.description}
              onChange={(e) => updateLine(index, "description", e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              value={line.quantity}
              onChange={(e) => updateLine(index, "quantity", e.target.value)}
            />
            <input
              type="number"
              placeholder="Unit price"
              value={line.unitPrice}
              onChange={(e) => updateLine(index, "unitPrice", e.target.value)}
            />
            <button
              className="req-remove-btn"
              onClick={() => removeLine(index)}
              disabled={lines.length === 1}
            >
              ✕
            </button>
          </div>
        ))}

        <div className="req-total">
          <span>Estimated total</span>
          <strong>₹ {calculateTotal().toFixed(2)}</strong>
        </div>
      </div>

      {/* action buttons */}
      <div className="req-actions">
        <button className="req-btn-outline" onClick={handleSaveDraft}>
          Save draft
        </button>
        <button className="req-btn-primary" onClick={handleSubmit}>
          Submit for approval
        </button>
      </div>
    </div>
  );
}

export default RequisitionForm;