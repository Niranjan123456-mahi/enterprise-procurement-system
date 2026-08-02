import { useState } from "react";
import { apiFetch } from "../../api";
import "./Login.css";

const ROLES = [
  { key: "Requester", label: "Requester" },
  { key: "Approver", label: "Approver" },
  { key: "Goods Receiver", label: "Goods Receiver" },
  { key: "Procurement Admin", label: "Procurement Admin" },
];

function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const login = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      onLogin({
        username: login.username,
        role: selectedRole,
        token: login.accessToken,
        roles: login.roles,
      });
    } catch {
      setError("Wrong username or password, or the backend is unavailable.");
    }
  }

  function goBackToRoleSelect() {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError("");
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-brand">
          <div className="login-logo"></div>
          <span>Procurement System</span>
        </div>

        {selectedRole === null ? (
          <div className="login-card">
            <h2>Welcome</h2>
            <p className="login-subtext">Choose how you want to sign in</p>

            <label>Select role</label>
            <select
              className="role-dropdown"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value !== "") {
                  setSelectedRole(e.target.value);
                }
              }}
            >
              <option value="" disabled>
                Select role
              </option>
              {ROLES.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="login-card">
            <h2>Sign in as {selectedRole}</h2>
            <p className="login-subtext">Enter your credentials to continue</p>

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
              <span className="login-signup-link" onClick={goBackToRoleSelect}>
                ← Choose a different role
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
