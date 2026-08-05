import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import POTracker from './features/purchase-orders/POTracker';
import Receiving from './features/purchase-orders/Receiving';
import RequestDetail from './features/requisitions/RequestDetail';
import MyRequests from './features/requisitions/MyRequests';
import RequisitionForm from './features/requisitions/RequisitionForm';
import ApprovalDashboard from './features/requisitions/ApprovalDashboard';
import Dashboard from './features/dashboard/Dashboard';
import Catalog from './features/masterdata/Catalog';
import SupplierAdmin from './features/masterdata/SupplierAdmin';
import RoleAdmin from './features/masterdata/RoleAdmin';
import ApprovalRuleAdmin from './features/masterdata/ApprovalRuleAdmin';
import ReportsDashboard from './features/analytics/ReportsDashboard';
import Sidebar from './components/Sidebar';
import { CANONICAL_ROLES } from './utils/roles';
import './App.css';

// Restore the logged-in user (token + normalized roles) from localStorage
// on page refresh, instead of losing the session every time.
function getStoredUser() {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Wraps a route so it actually checks the logged-in user's roles, not just
// "are they logged in at all". Without this, any authenticated account
// could reach any URL directly (e.g. a Requester typing /roles into the
// address bar), regardless of what the sidebar shows them.
function ProtectedRoute({ user, allowedRoles, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !user.roles.some((r) => allowedRoles.includes(r))) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

const { ADMIN, APPROVER, FINANCE, RECEIVER } = CANONICAL_ROLES;

function App() {
  const [user, setUser] = useState(getStoredUser());
  const isAuthenticated = !!user;

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div style={{ display: 'flex' }}>
      {isAuthenticated && <Sidebar user={user} onLogout={() => setUser(null)} />}

      <div style={{ flexGrow: 1, marginLeft: isAuthenticated ? '260px' : '0' }}>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
          />

          {/* Every authenticated user, regardless of role */}
          <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard user={user} /></ProtectedRoute>} />
          <Route path="/requisitions" element={<ProtectedRoute user={user}><MyRequests user={user} /></ProtectedRoute>} />
          <Route path="/requisitions/new" element={<ProtectedRoute user={user}><RequisitionForm user={user} /></ProtectedRoute>} />
          <Route path="/requisitions/:id" element={<ProtectedRoute user={user}><RequestDetail user={user} /></ProtectedRoute>} />
          <Route path="/catalog" element={<ProtectedRoute user={user}><Catalog user={user} /></ProtectedRoute>} />

          {/* Approver, Finance, Admin only */}
          <Route
            path="/approvals"
            element={
              <ProtectedRoute user={user} allowedRoles={[APPROVER, FINANCE, ADMIN]}>
                <ApprovalDashboard user={user} />
              </ProtectedRoute>
            }
          />

          {/* Goods Receiver, Finance, Admin only */}
          <Route
            path="/purchase-orders"
            element={
              <ProtectedRoute user={user} allowedRoles={[RECEIVER, FINANCE, ADMIN]}>
                <POTracker user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receiving"
            element={
              <ProtectedRoute user={user} allowedRoles={[RECEIVER, FINANCE, ADMIN]}>
                <Receiving user={user} />
              </ProtectedRoute>
            }
          />

          {/* Procurement Admin only */}
          <Route
            path="/suppliers"
            element={<ProtectedRoute user={user} allowedRoles={[ADMIN]}><SupplierAdmin user={user} /></ProtectedRoute>}
          />
          <Route
            path="/approval-rules"
            element={<ProtectedRoute user={user} allowedRoles={[ADMIN]}><ApprovalRuleAdmin user={user} /></ProtectedRoute>}
          />
          <Route
            path="/roles"
            element={<ProtectedRoute user={user} allowedRoles={[ADMIN]}><RoleAdmin user={user} /></ProtectedRoute>}
          />
          <Route
            path="/reports"
            element={<ProtectedRoute user={user} allowedRoles={[ADMIN, FINANCE]}><ReportsDashboard user={user} /></ProtectedRoute>}
          />

          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;