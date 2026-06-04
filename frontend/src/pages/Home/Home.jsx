import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to PawSome</h1>

      <p>
        Connect with pet owners, discover pets, and build your pet community.
      </p>

      <button onClick={() => navigate("/register")}>
        Get Started
      </button>
    </div>
  );
}

export default Home;