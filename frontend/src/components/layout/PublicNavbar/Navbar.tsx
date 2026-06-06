import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

/**
 * Sticky public navbar.
 * All section links use clean React Router paths (/about, /how-it-works, etc.).
 * Home.tsx's useEffect detects the pathname and smooth-scrolls to the section.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="public-header">
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-logo-icon" aria-hidden="true">🐾</span>
          <span className="nav-brand-text">Pawsome</span>
        </Link>

        {/* Desktop center links — standard React Router Links, clean URLs */}
        <nav className="nav-menu" aria-label="Main navigation">
          <Link to="/"                className="nav-link">Home</Link>
          <Link to="/about"           className="nav-link">About</Link>
          <Link to="/how-it-works"    className="nav-link">How It Works</Link>
          <Link to="/success-stories" className="nav-link">Success Stories</Link>
          <Link to="/contact"         className="nav-link">Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="nav-actions">
          <button className="btn-get-started" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>

        {/* Hamburger toggle */}
        <button
          className={`burger-menu-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>

        {/* Mobile drawer */}
        <div className={`mobile-nav-panel ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
          <Link to="/"                className="mobile-nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about"           className="mobile-nav-link" onClick={closeMenu}>About</Link>
          <Link to="/how-it-works"    className="mobile-nav-link" onClick={closeMenu}>How It Works</Link>
          <Link to="/success-stories" className="mobile-nav-link" onClick={closeMenu}>Success Stories</Link>
          <Link to="/contact"         className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
          <button
            className="btn-get-started"
            onClick={() => { closeMenu(); navigate("/login"); }}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;