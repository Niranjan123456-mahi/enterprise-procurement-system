import { useState, useEffect } from "react";
import { apiFetch } from "../../api";
import "./RequisitionForm.css";

function RequisitionForm({ user }) {
  const [title, setTitle] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [justification, setJustification] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // the list of items being requested
  // each line has: description, quantity, unit price
  const [lines, setLines] = useState([
    { description: "", quantity: "1", unitPrice: "0" },
  ]);

  useEffect(() => {
    async function loadDropdowns() {
      try {
        const [cats, sups] = await Promise.all([
          apiFetch("/api/categories", {}, user.token),
          apiFetch("/api/suppliers", {}, user.token),
        ]);
        setCategories(cats.filter((c) => c.status === "ACTIVE"));
        setSuppliers(sups.filter((s) => s.status === "ACTIVE"));
      } catch {
        setError("Failed to load categories or suppliers dropdowns.");
      }
    }
    loadDropdowns();
  }, [user.token]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !neededBy || !categoryId) {
      setError("Please fill out Title, Category, and Needed By date.");
      return;
    }

    const invalidLine = lines.some((l) => !l.description || parseFloat(l.quantity) <= 0 || parseFloat(l.unitPrice) < 0);
    if (invalidLine) {
      setError("Please ensure all line items have description, valid quantity (>0) and price (>=0).");
      return;
    }

    try {
      const payload = {
        title: title,
        justification: justification,
        neededBy: neededBy,
        categoryId: parseInt(categoryId),
        supplierId: supplierId ? parseInt(supplierId) : null,
        items: lines.map((line) => ({
          description: line.description,
          quantity: parseInt(line.quantity),
          unitPrice: parseFloat(line.unitPrice),
        })),
      };

      const result = await apiFetch(
        "/api/requisitions",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        user.token
      );

      setSuccess(`Purchase request ${result.requisitionNumber} submitted successfully!`);
      // reset form
      setTitle("");
      setNeededBy("");
      setJustification("");
      setCategoryId("");
      setSupplierId("");
      setLines([{ description: "", quantity: "1", unitPrice: "0" }]);
    } catch (err) {
      setError(err.message || "Failed to submit request.");
    }
  }

  return (
    <div className="req-page">
      <h1>New Purchase Request</h1>
      {error && <p className="req-error" style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {success && <p className="req-success" style={{ color: "green", marginBottom: "1rem", fontWeight: "bold" }}>{success}</p>}

      {/* details section */}
      <div className="req-card">
        <h2>Details</h2>

        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Q3 office supplies"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="req-row">
          <div className="req-col">
            <label>Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="req-col">
            <label>Supplier (Optional)</label>
            <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.supplierId} value={s.supplierId}>
                  {s.supplierName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Needed by</label>
          <input
            type="date"
            value={neededBy}
            onChange={(e) => setNeededBy(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Justification</label>
          <textarea
            rows="3"
            placeholder="Why do you need this?"
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          ></textarea>
        </div>
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
              required
            />
            <input
              type="number"
              placeholder="Qty"
              value={line.quantity}
              onChange={(e) => updateLine(index, "quantity", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Unit price"
              value={line.unitPrice}
              onChange={(e) => updateLine(index, "unitPrice", e.target.value)}
              required
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
        <button className="req-btn-primary" onClick={handleSubmit}>
          Submit for approval
        </button>
      </div>
    </div>
  );
}

export default RequisitionForm;