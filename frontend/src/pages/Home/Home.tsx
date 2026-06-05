import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div>
        <h1>Welcome to Pawsome</h1>

        <p>Your companion for pet care and adoption.</p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </>
  );
}

export default Home;