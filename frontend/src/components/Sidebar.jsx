import "./Sidebar.css";

function Sidebar({ user, navItems, activePage, onSelect, onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo"></div>
        <span>Procurement</span>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={"sidebar-link " + (activePage === item.key ? "sidebar-link-active" : "")}
            onClick={() => onSelect(item.key)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span className="sidebar-username">{user.username}</span>
          <span className="sidebar-role">{user.role}</span>
        </div>
        <button className="sidebar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;