import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/about">About</Link>
      {" | "}
      <Link to="/how-it-works">How It Works</Link>
      {" | "}
      <Link to="/success-stories">Success Stories</Link>
      {" | "}
      <Link to="/contact">Contact Us</Link>
    </nav>
  );
}

export default Navbar;