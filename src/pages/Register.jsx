import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SKILL_OPTIONS = [
  "Frontend Development",
  "Backend Development",
  "AI / Machine Learning",
  "Data Simulation",
  "UI / UX Design",
  "IoT / Hardware",
  "Project Management",
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", bio: "", phone: "" });
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleSkill = (skill) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register({ ...form, skills });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520, padding: "56px 24px" }}>
      <span className="eyebrow">Join the roster</span>
      <h1 style={{ fontSize: "2rem", marginTop: 10, marginBottom: 26 }}>Register for Techsavanna Hack 1.0</h1>

      {error && <div className="alert-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>

        <div className="field">
          <label>Skills (select all that apply)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {SKILL_OPTIONS.map((skill) => {
              const active = skills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className="mono"
                  style={{
                    padding: "7px 12px",
                    borderRadius: 999,
                    fontSize: "0.78rem",
                    border: `1px solid ${active ? "var(--signal)" : "var(--border)"}`,
                    background: active ? "var(--signal-dim)" : "transparent",
                    color: active ? "var(--signal)" : "var(--text-muted)",
                    cursor: "pointer",
                  }}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="field">
          <label htmlFor="bio">Short bio (optional)</label>
          <textarea
            id="bio"
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p style={{ marginTop: 18, fontSize: "0.88rem" }}>
        Already registered?{" "}
        <Link to="/login" style={{ color: "var(--signal)" }}>
          Log in
        </Link>
      </p>
    </div>
  );
}
