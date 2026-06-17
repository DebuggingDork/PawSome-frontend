import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./DashboardHeader.css";

function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Derive a display name from the email (e.g. "jane@example.com" → "jane")
  const displayName = user?.email.split('@')[0] ?? '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsDropdownOpen(false);
      logout();
      // ProtectedRoute redirects to /login automatically when user becomes null
    }
  };

  return (
    <header className="dashboard-header">
      {/* Search Input Bar */}
      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search matches, pets..." 
        />
      </div>

      {/* Action utilities (Notification bell and profile) */}
      <div className="header-actions">
        <button className="notifications-btn" aria-label="Notifications">
          <span>🔔</span>
          <span className="notifications-badge"></span>
        </button>

        {/* Profile Dropdown Module */}
        <div className="profile-dropdown-container" ref={dropdownRef}>
          <button 
            className={`profile-trigger-btn ${isDropdownOpen ? "active" : ""}`}
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-label="User profile menu"
          >
            <div className="avatar-circle">{avatarLetter}</div>
            <span className="user-meta-name">{displayName}</span>
            <span className="dropdown-arrow">▼</span>
          </button>

          {/* Floating Action Menu list */}
          <div className={`profile-menu ${isDropdownOpen ? "open" : ""}`}>
            <Link 
              to="/profile" 
              className="menu-link" 
              onClick={() => setIsDropdownOpen(false)}
            >
              👤 My Profile
            </Link>
            <Link 
              to="/profile" 
              className="menu-link" 
              onClick={() => setIsDropdownOpen(false)}
            >
              ⚙️ Settings
            </Link>
            <button 
              className="menu-link sidebar-logout-btn menu-link-logout" 
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
