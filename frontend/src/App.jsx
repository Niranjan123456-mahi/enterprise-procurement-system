import { useState } from "react";
import LandingPage from "./features/landing/LandingPage";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import RequisitionForm from "./features/requisitions/RequisitionForm";
import MyRequests from "./features/requisitions/MyRequests";
import ApprovalDashboard from "./features/requisitions/ApprovalDashboard";
import POTracker from "./features/purchase-orders/POTracker";
import Receiving from "./features/purchase-orders/Receiving";
import SupplierAdmin from "./features/masterdata/SupplierAdmin";
import ApprovalRuleAdmin from "./features/masterdata/ApprovalRuleAdmin";
import Catalog from "./features/masterdata/Catalog";
import RoleAdmin from "./features/masterdata/RoleAdmin";
import ReportsDashboard from "./features/analytics/ReportsDashboard";
import Sidebar from "./components/Sidebar";
import FinanceDashboard from "./features/dashboard/FinanceDashboard";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("procurement-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activePage, setActivePage] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(false);

  if (user === null && !showLogin) {
    return <LandingPage onSignIn={() => setShowLogin(true)} />;
  }

  if (user === null) {
    return <Login onLogin={handleLogin} />;
  }

  function handleLogout() {
    sessionStorage.removeItem("procurement-user");
    setUser(null);
    setShowLogin(false);
    setActivePage("dashboard");
  }

  function handleLogin(userDetails) {
    sessionStorage.setItem("procurement-user", JSON.stringify(userDetails));
    setUser(userDetails);
    if (userDetails.role === "Requester") {
      setActivePage("requisition");
    } else if (userDetails.role === "Approver") {
      setActivePage("approvals");
    } else if (userDetails.role === "Finance") {
      setActivePage("financedash");
    } else if (userDetails.role === "Goods Receiver") {
      setActivePage("receiving");
    } else {
      setActivePage("dashboard");
    }
  }

  let navItems = [];

  if (user.role === "Requester") {
    navItems.push(
      { key: "requisition", label: "New Request", icon: "📝" },
      { key: "myrequests", label: "My Requests", icon: "📋" }
    );
  } else if (user.role === "Approver") {
    navItems.push(
      { key: "approvals", label: "Approvals", icon: "✅" }
    );
  } else if (user.role === "Finance") {
    navItems.push(
      { key: "financedash", label: "Finance Dashboard", icon: "📊" },
      { key: "approvals", label: "Finance Approvals", icon: "✅" },
      { key: "reports", label: "Spend Reports", icon: "📈" }
    );
  } else if (user.role === "Goods Receiver") {
    navItems.push(
      { key: "orders", label: "Purchase Orders", icon: "📦" },
      { key: "receiving", label: "Receiving", icon: "🚚" }
    );
  } else if (user.role === "Procurement Admin") {
    navItems.push(
      { key: "dashboard", label: "Dashboard", icon: "📊" },
      { key: "requisition", label: "New Request", icon: "📝" },
      { key: "myrequests", label: "My Requests", icon: "📋" },
      { key: "approvals", label: "Approvals", icon: "✅" },
      { key: "orders", label: "Purchase Orders", icon: "📦" },
      { key: "receiving", label: "Receiving", icon: "🚚" },
      { key: "suppliers", label: "Suppliers", icon: "🏢" },
      { key: "rules", label: "Approval Rules", icon: "⚖️" },
      { key: "catalog", label: "Catalog", icon: "📚" },
      { key: "reports", label: "Reports", icon: "📈" },
      { key: "roleadmin", label: "Manage Roles", icon: "👥" }
    );
  }

  return (
    <div>
      <Sidebar
        user={user}
        navItems={navItems}
        activePage={activePage}
        onSelect={setActivePage}
        onLogout={handleLogout}
      />

      <div className="app-content">
        {activePage === "dashboard" && (
          <Dashboard user={user} onNavigate={setActivePage} />
        )}
        {activePage === "requisition" && <RequisitionForm user={user} />}
        {activePage === "myrequests" && <MyRequests user={user} />}
        {activePage === "approvals" && <ApprovalDashboard user={user} />}
        {activePage === "orders" && <POTracker user={user} />}
        {activePage === "receiving" && <Receiving user={user} />}
        {activePage === "suppliers" && <SupplierAdmin user={user} />}
        {activePage === "rules" && <ApprovalRuleAdmin user={user} />}
        {activePage === "catalog" && <Catalog user={user} />}
        {activePage === "reports" && <ReportsDashboard user={user} />}
        {activePage === "roleadmin" && <RoleAdmin user={user} />}
        {activePage === "financedash" && <FinanceDashboard user={user} />}
      </div>
    </div>
  );
}

export default App;
