/**
 * About page component detailing platform history and vision.
 * Wrapped by MainLayout which handles navigation header.
 */
function About() {
  return (
    <div className="container" style={{ padding: "var(--spacing-xxl) var(--spacing-lg)" }}>
      <h1>About Us</h1>
      <p>
        Pawsome helps pet lovers connect, care for pets, and find adoption opportunities.
      </p>
    </div>
  );
}

export default About;