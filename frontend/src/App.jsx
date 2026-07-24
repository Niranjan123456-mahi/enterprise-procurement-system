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

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(false);

  // show the marketing landing page first, before any login
  if (user === null && !showLogin) {
    return <LandingPage onSignIn={() => setShowLogin(true)} />;
  }

  if (user === null) {
    return <Login onLogin={setUser} />;
  }

  function handleLogout() {
    setUser(null);
    setShowLogin(false);
    setActivePage("dashboard");
  }

  let navItems = [{ key: "dashboard", label: "Dashboard", icon: "📊" }];

  if (user.role === "Requester") {
    navItems.push(
      { key: "requisition", label: "New Request", icon: "📝" },
      { key: "myrequests", label: "My Requests", icon: "📋" }
    );
  }

  if (user.role === "Approver" || user.role === "Admin") {
    navItems.push({ key: "approvals", label: "Approvals", icon: "✅" });
  }

  if (user.role === "Approver" || user.role === "Admin" || user.role === "Receiver") {
    navItems.push({ key: "orders", label: "Purchase Orders", icon: "📦" });
  }

  if (user.role === "Receiver" || user.role === "Admin") {
    navItems.push({ key: "receiving", label: "Receiving", icon: "🚚" });
  }

  if (user.role === "Admin") {
    navItems.push(
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
        {activePage === "requisition" && <RequisitionForm />}
        {activePage === "myrequests" && <MyRequests />}
        {activePage === "approvals" && <ApprovalDashboard />}
        {activePage === "orders" && <POTracker />}
        {activePage === "receiving" && <Receiving />}
        {activePage === "suppliers" && <SupplierAdmin />}
        {activePage === "rules" && <ApprovalRuleAdmin />}
        {activePage === "catalog" && <Catalog />}
        {activePage === "reports" && <ReportsDashboard />}
        {activePage === "roleadmin" && <RoleAdmin />}
      </div>
    </div>
  );
}

export default App;