import { useState } from "react";
import "./Catalog.css";

function Catalog() {
  // fake sample catalog items
  const [items, setItems] = useState([
    { sku: "PAP-001", name: "A4 Paper Box", category: "Office Supplies", unit: "box", unitPrice: 300 },
    { sku: "LAP-001", name: "Dell Latitude Laptop", category: "IT Hardware", unit: "ea", unitPrice: 37000 },
  ]);

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("ea");
  const [unitPrice, setUnitPrice] = useState("");

  function addItem() {
    if (name.trim() === "") {
      return;
    }

    const newItem = {
      sku: sku,
      name: name,
      category: category,
      unit: unit,
      unitPrice: parseFloat(unitPrice) || 0,
    };

    setItems([...items, newItem]);

    setSku("");
    setName("");
    setCategory("");
    setUnit("ea");
    setUnitPrice("");
  }

  return (
    <div className="cat-page">
      <h1>Catalog</h1>
      <p className="cat-subtext">Reusable items with standard pricing</p>

      <div className="cat-card">
        <h2>Add Item</h2>
        <div className="cat-form-grid">
          <div>
            <label>SKU</label>
            <input value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div>
            <label>Unit</label>
            <input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </div>
          <div>
            <label>Unit price (₹)</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="cat-add-btn" onClick={addItem} disabled={!name}>
          Add item
        </button>
      </div>

      <div className="cat-table-card">
        <table className="cat-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="cat-empty">No items yet.</td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.sku || "—"}</td>
                  <td>{item.name}</td>
                  <td>{item.category || "—"}</td>
                  <td>{item.unit}</td>
                  <td>₹ {item.unitPrice.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Catalog;