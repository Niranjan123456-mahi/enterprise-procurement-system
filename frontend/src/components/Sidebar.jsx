import { NavLink } from 'react-router-dom';
import { CANONICAL_ROLES } from '../utils/roles';
import './Sidebar.css';

const { ADMIN, APPROVER, FINANCE, RECEIVER } = CANONICAL_ROLES;

export default function Sidebar({ user, onLogout }) {
  // `roles: null` means visible to everyone; otherwise only shown if the
  // logged-in user holds ANY of the listed roles (supports accounts with
  // more than one role, e.g. a manager who is also a requester).
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: null },
    { path: '/requisitions', label: 'My Requests', icon: '📝', roles: null },
    { path: '/approvals', label: 'Approvals', icon: '✅', roles: [APPROVER, FINANCE, ADMIN] },
    { path: '/purchase-orders', label: 'Purchase Orders', icon: '🛒', roles: [RECEIVER, FINANCE, ADMIN] },
    { path: '/receiving', label: 'Receiving', icon: '📦', roles: [RECEIVER, FINANCE, ADMIN] },
    { path: '/catalog', label: 'Master Catalog', icon: '🗂️', roles: null },
    { path: '/suppliers', label: 'Suppliers', icon: '🏢', roles: [ADMIN] },
    { path: '/approval-rules', label: 'Approval Rules', icon: '⚖️', roles: [ADMIN] },
    { path: '/reports', label: 'Reports', icon: '📈', roles: [ADMIN, FINANCE] },
    { path: '/roles', label: 'Manage Roles', icon: '👥', roles: [ADMIN] },
  ];

  const userRoles = user?.roles || (user?.role ? [user.role] : []);
  const visibleItems = navItems.filter(
    (item) => !item.roles || item.roles.some((r) => userRoles.includes(r))
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    window.location.href = '/login';
  };

  return (
    <aside className="zoho-sidebar">
      <div className="zoho-sidebar-header">
        <div style={{ width: '28px', height: '28px', backgroundColor: '#0284c7', borderRadius: '4px' }}></div>
        Enterprise Procure
      </div>

      {user && (
        <div style={{ padding: '10px 16px', fontSize: '13px', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ fontWeight: 600, color: '#111827' }}>{user.username}</div>
          <div>{user.role}</div>
        </div>
      )}

      <nav style={{ flex: 1 }}>
        <ul className="zoho-nav-list">
          {visibleItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'zoho-nav-item active' : 'zoho-nav-item')}
              >
                <span className="zoho-nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '10px', backgroundColor: 'transparent',
            border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151',
            cursor: 'pointer', fontWeight: '500', fontSize: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}