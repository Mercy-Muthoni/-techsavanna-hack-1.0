import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Admin() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [judgeForm, setJudgeForm] = useState({ name: "", email: "", password: "" });
  const [creating, setCreating] = useState(false);

  async function loadAll() {
    try {
      const [statsData, usersData, leaderboardData] = await Promise.all([
        api.get("/admin/stats", token),
        api.get("/admin/users", token),
        api.get("/judging/leaderboard", token),
      ]);
      setStats(statsData);
      setUsers(usersData.users);
      setLeaderboard(leaderboardData.leaderboard);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreateJudge(e) {
    e.preventDefault();
    setCreating(true);
    setError("");
    setMessage("");
    try {
      await api.post("/admin/judges", judgeForm, token);
      setMessage(`Judge account created for ${judgeForm.email}.`);
      setJudgeForm({ name: "", email: "", password: "" });
      loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleRoleChange(userId, role) {
    setError("");
    try {
      await api.put(`/admin/users/${userId}/role`, { role }, token);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteUser(userId) {
    setError("");
    try {
      await api.delete(`/admin/users/${userId}`, token);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container" style={{ padding: "48px 24px 80px" }}>
      <span className="eyebrow">Event control</span>
      <h1 style={{ fontSize: "2.1rem", marginTop: 10, marginBottom: 28 }}>Admin dashboard</h1>

      {error && <div className="alert-banner">{error}</div>}
      {message && <div className="success-banner">{message}</div>}

      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 14, marginBottom: 40 }}>
          {[
            ["Participants", stats.participants],
            ["Judges", stats.judges],
            ["Teams", stats.teams],
            ["Submissions", stats.submissions],
            ["Scores given", stats.scoresGiven],
            ["Unassigned", stats.unassignedParticipants],
          ].map(([label, value]) => (
            <div key={label} className="card" style={{ textAlign: "center" }}>
              <div className="mono" style={{ fontSize: "1.8rem", color: "var(--signal)" }}>
                {value}
              </div>
              <div className="mono" style={{ fontSize: "0.72rem", color: "var(--text-faint)", marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 16 }}>All users ({users.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 520, overflowY: "auto" }}>
            {users.map((u) => (
              <div key={u.id} className="card" style={{ padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div>
                  <p style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.9rem" }}>{u.name}</p>
                  <p style={{ fontSize: "0.78rem" }}>{u.email}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <select
                    className="mono"
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 8px", fontSize: "0.78rem" }}
                  >
                    <option value="participant">participant</option>
                    <option value="judge">judge</option>
                    <option value="admin">admin</option>
                  </select>
                  <button className="btn btn-danger" style={{ padding: "6px 10px", fontSize: "0.78rem" }} onClick={() => handleDeleteUser(u.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Add a judge</h2>
          <form onSubmit={handleCreateJudge} className="card" style={{ marginBottom: 32 }}>
            <div className="field">
              <label htmlFor="jname">Name</label>
              <input id="jname" required value={judgeForm.name} onChange={(e) => setJudgeForm({ ...judgeForm, name: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="jemail">Email</label>
              <input id="jemail" type="email" required value={judgeForm.email} onChange={(e) => setJudgeForm({ ...judgeForm, email: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="jpassword">Temporary password</label>
              <input id="jpassword" type="password" required minLength={8} value={judgeForm.password} onChange={(e) => setJudgeForm({ ...judgeForm, password: e.target.value })} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={creating} style={{ width: "100%" }}>
              {creating ? "Creating…" : "Create judge account"}
            </button>
          </form>

          <h2 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Leaderboard</h2>
          <div className="card">
            {leaderboard.length === 0 ? (
              <p>No scores yet.</p>
            ) : (
              leaderboard.map((row, i) => (
                <div key={row.submission_id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < leaderboard.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <p style={{ color: "var(--text)", fontSize: "0.88rem", fontWeight: 600 }}>{row.title}</p>
                    <p style={{ fontSize: "0.76rem" }}>{row.team_name}</p>
                  </div>
                  <span className="mono" style={{ color: "var(--signal)" }}>
                    {row.avg_total ?? "—"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
