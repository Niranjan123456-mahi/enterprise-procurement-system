import { useState } from "react";
import "./ApprovalRuleAdmin.css";

function ApprovalRuleAdmin() {
  // fake sample rules to start with
  const [rules, setRules] = useState([
    { minAmount: 0, maxAmount: 20000, category: "Any", approvers: "Manager" },
    { minAmount: 20001, maxAmount: 100000, category: "Any", approvers: "Manager, Finance Head" },
    { minAmount: 100001, maxAmount: 999999999, category: "IT Hardware", approvers: "Manager, IT Head, Finance Head" },
  ]);

  // form fields for adding a new rule
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [category, setCategory] = useState("");
  const [approvers, setApprovers] = useState("");

  function addRule() {
    if (minAmount === "" || maxAmount === "" || approvers.trim() === "") {
      return; // don't add if required fields are empty
    }

    const newRule = {
      minAmount: parseFloat(minAmount),
      maxAmount: parseFloat(maxAmount),
      category: category.trim() === "" ? "Any" : category,
      approvers: approvers,
    };

    setRules([...rules, newRule]);

    // clear the form after adding
    setMinAmount("");
    setMaxAmount("");
    setCategory("");
    setApprovers("");
  }

  function removeRule(index) {
    setRules(rules.filter((rule, i) => i !== index));
  }

  return (
    <div className="rule-page">
      <h1>Approval Rules</h1>
      <p className="rule-subtext">Decide who approves a request, based on amount and category</p>

      {/* add rule form */}
      <div className="rule-card">
        <h2>Add Rule</h2>
        <div className="rule-form-grid">
          <div>
            <label>Min amount (₹)</label>
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>
          <div>
            <label>Max amount (₹)</label>
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>
          <div>
            <label>Category (optional)</label>
            <input
              placeholder="Any"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Approvers (in order)</label>
            <input
              placeholder="e.g. Manager, Finance Head"
              value={approvers}
              onChange={(e) => setApprovers(e.target.value)}
            />
          </div>
        </div>
        <button className="rule-add-btn" onClick={addRule}>
          Add rule
        </button>
      </div>

      {/* rules list table */}
      <div className="rule-table-card">
        <table className="rule-table">
          <thead>
            <tr>
              <th>Amount Range</th>
              <th>Category</th>
              <th>Approvers</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rules.length === 0 ? (
              <tr>
                <td colSpan="4" className="rule-empty">No rules set yet.</td>
              </tr>
            ) : (
              rules.map((r, index) => (
                <tr key={index}>
                  <td>₹ {r.minAmount.toLocaleString()} – ₹ {r.maxAmount.toLocaleString()}</td>
                  <td>{r.category}</td>
                  <td>{r.approvers}</td>
                  <td>
                    <button className="rule-remove-btn" onClick={() => removeRule(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApprovalRuleAdmin;