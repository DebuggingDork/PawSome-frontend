import { NavLink, useNavigate } from "react-router-dom";
import "./DashboardSidebar.css";

/**
 * Vertical Sidebar navigation component for the authenticated dashboard area.
 */
function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/login");
    }
  };

  return (
    <aside className="dashboard-sidebar">
      {/* Brand logo container */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon" aria-hidden="true">🐾</span>
        <span className="sidebar-logo-text">Pawsome</span>
      </div>

      {/* Main vertical links */}
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/find-match" 
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🔍</span>
          <span>Matches</span>
        </NavLink>

        <NavLink 
          to="/my-pets" 
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">🐾</span>
          <span>My Pets</span>
        </NavLink>

        <NavLink 
          to="/messages" 
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">💬</span>
          <span>Messages</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span className="sidebar-link-icon">👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Sidebar footer containing quick logout button */}
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <span className="sidebar-link-icon">🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
