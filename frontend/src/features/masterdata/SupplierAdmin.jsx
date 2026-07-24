import { useState } from "react";
import "./SupplierAdmin.css";

function SupplierAdmin() {
  // fake sample suppliers to start with
  const [suppliers, setSuppliers] = useState([
    { name: "Staples India", contact: "Ravi Kumar", email: "ravi@staples.in", phone: "9876543210" },
    { name: "Dell Technologies", contact: "Priya Shah", email: "priya@dell.com", phone: "9123456780" },
  ]);

  // form fields for adding a new supplier
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function addSupplier() {
    if (name.trim() === "") {
      return; // don't add if name is empty
    }

    const newSupplier = {
      name: name,
      contact: contact,
      email: email,
      phone: phone,
    };

    setSuppliers([...suppliers, newSupplier]);

    // clear the form after adding
    setName("");
    setContact("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className="supplier-page">
      <h1>Suppliers</h1>
      <p className="supplier-subtext">Companies you purchase from</p>

      {/* add supplier form */}
      <div className="supplier-card">
        <h2>Add Supplier</h2>
        <div className="supplier-form-grid">
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Contact name</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <button className="supplier-add-btn" onClick={addSupplier} disabled={!name}>
          Add supplier
        </button>
      </div>

      {/* supplier list table */}
      <div className="supplier-table-card">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="4" className="supplier-empty">No suppliers yet.</td>
              </tr>
            ) : (
              suppliers.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.contact || "—"}</td>
                  <td>{s.email || "—"}</td>
                  <td>{s.phone || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierAdmin;