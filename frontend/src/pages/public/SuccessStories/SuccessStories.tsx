/**
 * SuccessStories page component detailing successful matches.
 * Wrapped by MainLayout which handles navigation header.
 */
function SuccessStories() {
  return (
    <div className="container" style={{ padding: "var(--spacing-xxl) var(--spacing-lg)" }}>
      <h1>Success Stories</h1>
      <p>
        Read stories from pet owners who found successful matches through Pawsome.
      </p>
    </div>
  );
}

export default SuccessStories;