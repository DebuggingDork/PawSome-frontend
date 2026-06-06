/**
 * HowItWorks page component detailing the workflow of the pet-matching app.
 * Wrapped by MainLayout which handles navigation header.
 */
function HowItWorks() {
  return (
    <div className="container" style={{ padding: "var(--spacing-xxl) var(--spacing-lg)" }}>
      <h1>How It Works</h1>
      <p>
        Create an account, add your pet, find compatible matches, and connect with
        other pet owners.
      </p>
    </div>
  );
}

export default HowItWorks;