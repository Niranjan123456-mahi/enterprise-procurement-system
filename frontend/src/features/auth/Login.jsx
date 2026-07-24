import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (username === "employee1" && password === "1234") {
      onLogin({ username: username, role: "Requester" });
    } else if (username === "manager1" && password === "1234") {
      onLogin({ username: username, role: "Approver" });
    } else if (username === "receiver1" && password === "1234") {
      onLogin({ username: username, role: "Receiver" });
    } else if (username === "admin1" && password === "1234") {
      onLogin({ username: username, role: "Admin" });
    } else {
      setError("Wrong username or password");
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-brand">
          <div className="login-logo"></div>
          <span>Procurement System</span>
        </div>

        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="login-subtext">Sign in to manage procurement</p>

          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit">Sign in</button>
          </form>
          <p className="login-signup-text">
            Don't have an account? <span className="login-signup-link">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;