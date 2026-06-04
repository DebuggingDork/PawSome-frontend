import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/about">About</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Get Started</Link>
    </nav>
  );
}

export default Navbar;