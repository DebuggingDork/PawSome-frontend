import { Link } from "react-router-dom";

function Login() {
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

      <button>Login</button>

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