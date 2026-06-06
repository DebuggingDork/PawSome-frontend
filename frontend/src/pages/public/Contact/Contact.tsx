/**
 * Contact page component listing platform contact details.
 * Wrapped by MainLayout which handles navigation header.
 */
function Contact() {
  return (
    <div className="container" style={{ padding: "var(--spacing-xxl) var(--spacing-lg)" }}>
      <h1>Contact Us</h1>
      <p>Email: pawsome@example.com</p>
      <p>Phone: +91 9876543210</p>
    </div>
  );
}

export default Contact;