import { Link } from "react-router-dom";

function DashboardNavbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {" | "}

      <Link to="/find-match">Find Match</Link>
      {" | "}

      <Link to="/my-pets">My Pets</Link>
      {" | "}

      <Link to="/messages">Messages</Link>
      {" | "}

      <Link to="/profile">Profile</Link>
      {" | "}

      <Link to="/login">Logout</Link>
    </nav>
  );
}

export default DashboardNavbar;