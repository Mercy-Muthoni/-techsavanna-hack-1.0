import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("participant");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      // if user role doesn't match the selected role, sign out and show message
      if (selectedRole && user.role !== selectedRole) {
        logout();
        setError(
          `Logged in as ${user.role} — please choose the correct account for ${selectedRole} or use the other credentials.`
        );
        setSubmitting(false);
        return;
      }

      // Redirect based on actual role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "judge") navigate("/judging");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 440, padding: "80px 24px" }}>
      <span className="eyebrow">Welcome back</span>
      <h1 style={{ fontSize: "2rem", marginTop: 10, marginBottom: 26 }}>Log in</h1>

      {error && <div className="alert-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Login as</label>
          <div style={{ display: "flex", gap: 12 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="radio" name="role" value="participant" checked={selectedRole === "participant"} onChange={() => setSelectedRole("participant")} />
              <span className="mono">Participant</span>
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="radio" name="role" value="admin" checked={selectedRole === "admin"} onChange={() => setSelectedRole("admin")} />
              <span className="mono">Admin</span>
            </label>
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p style={{ marginTop: 18, fontSize: "0.88rem" }}>
        New here?{" "}
        <Link to="/register" style={{ color: "var(--signal)" }}>
          Register
        </Link>
      </p>
    </div>
  );
}
