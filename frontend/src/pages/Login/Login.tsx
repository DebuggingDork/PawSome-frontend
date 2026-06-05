import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>

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
          placeholder="Enter your password"
        />
      </div>

      <br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        New User?{" "}
        <Link to="/register">
          Register Here
        </Link>
      </p>
    </div>
  );
}

export default Login;