import { useState } from "react";
import "./ReportsDashboard.css";

function ReportsDashboard() {
  // fake sample numbers for now — real numbers will come from actual requests/POs later
  const [totalSpend] = useState(236200);

  const [byDepartment] = useState([
    { name: "Engineering", amount: 4200 },
    { name: "Design", amount: 185000 },
    { name: "HR", amount: 32000 },
    { name: "IT", amount: 15000 },
  ]);

  const [byCategory] = useState([
    { name: "IT Hardware", amount: 200000 },
    { name: "Office Supplies", amount: 4200 },
    { name: "Furniture", amount: 32000 },
  ]);

  const [topVendors] = useState([
    { name: "Dell Technologies", amount: 185000, orders: 1 },
    { name: "Godrej Interio", amount: 32000, orders: 1 },
    { name: "Staples India", amount: 4200, orders: 1 },
  ]);

  // find the biggest number in a list, so we can size the bars relative to it
  function getMax(list) {
    let max = 0;
    for (const item of list) {
      if (item.amount > max) {
        max = item.amount;
      }
    }
    return max;
  }

  const maxDept = getMax(byDepartment);
  const maxCategory = getMax(byCategory);

  return (
    <div className="report-page">
      <h1>Spend Report</h1>
      <p className="report-subtext">Overview of procurement spending</p>

      {/* total spend card */}
      <div className="report-total-card">
        <span>Total Spend</span>
        <strong>₹ {totalSpend.toLocaleString()}</strong>
      </div>

      <div className="report-grid">
        {/* spend by department */}
        <div className="report-card">
          <h2>Spend by Department</h2>
          {byDepartment.map((d, index) => (
            <div className="report-bar-row" key={index}>
              <span className="report-bar-label">{d.name}</span>
              <div className="report-bar-track">
                <div
                  className="report-bar-fill"
                  style={{ width: (d.amount / maxDept) * 100 + "%" }}
                ></div>
              </div>
              <span className="report-bar-amount">₹ {d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* spend by category */}
        <div className="report-card">
          <h2>Spend by Category</h2>
          {byCategory.map((c, index) => (
            <div className="report-bar-row" key={index}>
              <span className="report-bar-label">{c.name}</span>
              <div className="report-bar-track">
                <div
                  className="report-bar-fill report-bar-fill-alt"
                  style={{ width: (c.amount / maxCategory) * 100 + "%" }}
                ></div>
              </div>
              <span className="report-bar-amount">₹ {c.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* top vendors table */}
      <div className="report-card">
        <h2>Top Vendors</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Orders</th>
              <th>Total Spend</th>
            </tr>
          </thead>
          <tbody>
            {topVendors.map((v, index) => (
              <tr key={index}>
                <td>{v.name}</td>
                <td>{v.orders}</td>
                <td>₹ {v.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsDashboard;