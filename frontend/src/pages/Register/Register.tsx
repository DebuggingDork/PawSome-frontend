import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div>
      <h1>Create Account</h1>

      <div>
        <label>Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter your name"
        />
      </div>

      <br />

      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <br />

      <div>
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Create password"
        />
      </div>

      <br />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;