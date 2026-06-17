import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardHeader.css";

/**
 * Top header bar for the dashboard containing a search bar,
 * notifications toggle, and the profile dropdown menu.
 */
function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      navigate("/login");
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
            <div className="avatar-circle">P</div>
            <span className="user-meta-name">Paul</span>
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
