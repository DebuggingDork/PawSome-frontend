import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ParticleBackground from "../../../components/ui/ParticleBackground";
import "./Home.css";

const PATH_TO_SECTION: Record<string, string> = {
  "/about":           "about",
  "/how-it-works":    "how-it-works",
  "/success-stories": "success-stories",
  "/contact":         "contact",
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sectionId = PATH_TO_SECTION[location.pathname];
    if (sectionId) {
      const timer = setTimeout(() => scrollToSection(sectionId), 80);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className="home-page">
      <ParticleBackground />

      {/* ─────────────────────── HERO ─────────────────────── */}
      <section id="home" className="home-hero">
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-tagline">🐾 Pet Matching Platform</span>
            <h1 className="hero-title">PAWSOME</h1>
            <p className="hero-description">
              Connect your pet with compatible companions through intelligent
              matching, verified profiles, and a trusted community of pet owners.
            </p>
            <div className="hero-actions">
              <button className="btn-primary hero-cta" onClick={() => navigate("/login")}>
                Get Started
              </button>
            </div>
          </div>

          {/* Glassmorphism match-preview card */}
          <div className="hero-visual">
            <div className="hero-pet-card">
              <div className="hero-pet-image-wrap">🐕</div>

              <div className="hero-pet-status">
                <span className="status-dot" aria-hidden="true" />
                Looking for a Match
              </div>

              <h3 className="hero-pet-name">Buddy</h3>

              <div className="hero-pet-details">
                <span>🐕 Golden Retriever</span>
                <span>📅 2 yrs old</span>
              </div>

              <div className="hero-pet-divider" />

              <div className="hero-card-footer">
                <span className="hero-card-label">Compatibility Score</span>
                <span className="hero-match-score">97% ✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── ABOUT ─────────────────────── */}
      <section id="about" className="home-about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-icon-blob">🐾</div>
          </div>
          <div className="about-content">
            <span className="section-tag">Our Story</span>
            <h2>Built by pet lovers, for pet lovers</h2>
            <p>
              Pawsome was born from a simple idea — every pet deserves a great
              companion. Founded in 2024, our platform brings together responsible
              owners who genuinely care about their pets' wellbeing, social
              development, and happiness.
            </p>
            <p>
              We believe pets thrive when they find their perfect match. Whether
              it's a compatible playmate, a lifelong companion, or a trusted local
              community — Pawsome makes it safe, smart, and joyful.
            </p>
            <div className="about-badges">
              <span className="about-badge">🏅 Trusted Platform</span>
              <span className="about-badge">🔒 Verified Profiles</span>
              <span className="about-badge">❤️ Community First</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── HOW IT WORKS ─────────────────────── */}
      <section id="how-it-works" className="home-how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How Pawsome Works</h2>
            <p>Get started in minutes — finding your pet's perfect match is easy.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">📝</div>
              <h3>Create Your Account</h3>
              <p>Sign up in seconds with your email. No credit card required.</p>
            </div>
            <div className="step-connector" aria-hidden="true">→</div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">🐾</div>
              <h3>Add Your Pet's Profile</h3>
              <p>Fill in your pet's details — breed, temperament, age, and personality.</p>
            </div>
            <div className="step-connector" aria-hidden="true">→</div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">🔍</div>
              <h3>Discover Matches</h3>
              <p>Browse compatible pets filtered by size, energy, and traits.</p>
            </div>
            <div className="step-connector" aria-hidden="true">→</div>
            <div className="step-card">
              <div className="step-number">04</div>
              <div className="step-icon">💬</div>
              <h3>Connect &amp; Meet</h3>
              <p>Message owners securely, arrange a meetup, and build friendships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── SUCCESS STORIES ─────────────────────── */}
      <section id="success-stories" className="home-success-stories">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Real pet owners. Real connections. Real happiness.</p>
          </div>
          <div className="stories-grid">
            <div className="story-card">
              <span className="quote-mark">"</span>
              <p className="testimonial-text">
                Finding a companion for my beagle was so difficult until we joined Pawsome.
                In under a week we discovered two amazing local matches. It's the smartest pet platform out there!
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">S</div>
                <div>
                  <h4 className="testimonial-name">Sarah Jenkins</h4>
                  <p className="testimonial-role">Beagle parent · Chicago, IL</p>
                </div>
              </div>
            </div>

            <div className="story-card">
              <span className="quote-mark">"</span>
              <p className="testimonial-text">
                My cat Luna was very shy. After joining Pawsome she now has three regular
                playdates per week. The verified profile system gave me real peace of mind.
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">M</div>
                <div>
                  <h4 className="testimonial-name">Michael Torres</h4>
                  <p className="testimonial-role">Cat owner · Austin, TX</p>
                </div>
              </div>
            </div>

            <div className="story-card">
              <span className="quote-mark">"</span>
              <p className="testimonial-text">
                The compatibility matching is incredibly smart. Pawsome paired my high-energy
                Labrador with the perfect companion — another Lab who loves morning runs!
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">A</div>
                <div>
                  <h4 className="testimonial-name">Aisha Patel</h4>
                  <p className="testimonial-role">Labrador parent · Seattle, WA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── CONTACT ─────────────────────── */}
      <section id="contact" className="home-contact">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-tag">Get In Touch</span>
            <h2>We'd Love to Hear From You</h2>
            <p>
              Questions about Pawsome, account help, or partnership enquiries?
              Our team gets back to you within 24 hours.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>pawsome@example.com</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+91 9876543210</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Office</strong>
                  <p>Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form-row">
              <div className="form-group">
                <label htmlFor="contactName">Your Name</label>
                <input id="contactName" type="text" className="form-input" placeholder="e.g. Alex Johnson" />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">Email Address</label>
                <input id="contactEmail" type="email" className="form-input" placeholder="you@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contactSubject">Subject</label>
              <input id="contactSubject" type="text" className="form-input" placeholder="How can we help?" />
            </div>
            <div className="form-group">
              <label htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                className="form-input contact-textarea"
                placeholder="Tell us more about your question..."
                rows={5}
              />
            </div>
            <button type="submit" className="btn-primary contact-submit-btn">
              Send Message ✉️
            </button>
          </form>
        </div>
      </section>

      {/* ─────────────────────── FOOTER ─────────────────────── */}
      <footer className="home-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span style={{ fontSize: "1.4rem" }}>🐾</span>
            <span style={{ fontFamily: "var(--font-family-display)", fontWeight: 800 }}>Pawsome</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Pawsome Inc. All rights reserved.</p>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate("/about")}>About</button>
            <button className="footer-link" onClick={() => navigate("/how-it-works")}>How It Works</button>
            <button className="footer-link" onClick={() => navigate("/contact")}>Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
