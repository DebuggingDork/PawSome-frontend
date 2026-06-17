import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.email.split('@')[0] ?? 'there';

  return (
    <div className="dashboard-view">
      {/* Welcome Title Area */}
      <section className="dashboard-welcome">
        <h1>Welcome back, {displayName}!</h1>
        <p>Here's what is happening with your pet profiles today.</p>
      </section>

      {/* Stats Cards Section */}
      <section className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span>TOTAL MATCHES</span>
            <span className="stat-card-icon">🔍</span>
          </div>
          <h3 className="stat-card-value">12</h3>
          <span className="stat-card-change up">▲ +3 new this week</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span>UNREAD MESSAGES</span>
            <span className="stat-card-icon">💬</span>
          </div>
          <h3 className="stat-card-value">3</h3>
          <span className="stat-card-change up">▲ Active chats</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span>MY PETS</span>
            <span className="stat-card-icon">🐾</span>
          </div>
          <h3 className="stat-card-value">1</h3>
          <span className="stat-card-change neutral">● Registered profile</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span>WEEKLY VIEWS</span>
            <span className="stat-card-icon">👁️</span>
          </div>
          <h3 className="stat-card-value">45</h3>
          <span className="stat-card-change up">▲ +12% vs last week</span>
        </div>
      </section>

      {/* Main Two Column Panels */}
      <div className="dashboard-content-grid">
        {/* Left Panel: Recommended Matches */}
        <section className="dashboard-panel">
          <h2><span>✨</span> Recommended Matches</h2>
          <div className="dash-matches-grid">
            {/* Recommended Match 1 */}
            <div className="match-card">
              <div className="match-header">
                <div className="match-avatar-info">
                  <div className="match-avatar">🐶</div>
                  <div>
                    <h3 className="match-name">Buddy</h3>
                    <p className="match-breed">Beagle • 2 yrs</p>
                  </div>
                </div>
                <span className="match-score-badge">95% Match</span>
              </div>
              <div className="match-details">
                <span>📍 Chicago, IL (1.2 miles away)</span>
                <span>⚡ High energy, loves outdoor fetch</span>
              </div>
              <button 
                className="btn-match-action" 
                onClick={() => navigate("/find-match")}
              >
                View Profile
              </button>
            </div>

            {/* Recommended Match 2 */}
            <div className="match-card">
              <div className="match-header">
                <div className="match-avatar-info">
                  <div className="match-avatar">🐶</div>
                  <div>
                    <h3 className="match-name">Coco</h3>
                    <p className="match-breed">Poodle • 1 yr</p>
                  </div>
                </div>
                <span className="match-score-badge">88% Match</span>
              </div>
              <div className="match-details">
                <span>📍 Chicago, IL (3.5 miles away)</span>
                <span>⚡ Gentle temperament, very social</span>
              </div>
              <button 
                className="btn-match-action" 
                onClick={() => navigate("/find-match")}
              >
                View Profile
              </button>
            </div>
          </div>
        </section>

        {/* Right Panel: Quick Actions */}
        <aside className="quick-actions-panel">
          <button 
            className="btn-action-tile" 
            onClick={() => navigate("/my-pets")}
          >
            <div className="btn-action-tile-icon">➕</div>
            <div className="btn-action-tile-text">
              <h3>Add New Pet</h3>
              <p>Create a profile for your pet</p>
            </div>
          </button>

          <button 
            className="btn-action-tile" 
            onClick={() => navigate("/find-match")}
          >
            <div className="btn-action-tile-icon">🔍</div>
            <div className="btn-action-tile-text">
              <h3>Search Matches</h3>
              <p>Find nearby compatible pets</p>
            </div>
          </button>

          <button 
            className="btn-action-tile" 
            onClick={() => navigate("/profile")}
          >
            <div className="btn-action-tile-icon">⚙️</div>
            <div className="btn-action-tile-text">
              <h3>Account Settings</h3>
              <p>Manage email & notifications</p>
            </div>
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;