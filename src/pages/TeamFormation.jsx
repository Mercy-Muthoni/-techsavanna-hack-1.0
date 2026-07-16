import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { TRACK_LIST, TRACKS } from "../constants/tracks";

export default function TeamFormation() {
  const { user, token } = useAuth();
  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", track: TRACK_LIST[0].value, description: "" });

  const myTeam = teams.find((t) => t.members.some((m) => m.id === user.id));

  async function loadAll() {
    setLoading(true);
    setError("");
    try {
      const [teamsData, participantsData] = await Promise.all([
        api.get("/teams", token),
        api.get("/users?unassigned=true", token),
      ]);
      setTeams(teamsData.teams);
      setParticipants(participantsData.participants);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/teams", form, token);
      setMessage("Team created — you're in.");
      setShowCreate(false);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleJoin(teamId) {
    setError("");
    setMessage("");
    try {
      await api.post(`/teams/${teamId}/join`, {}, token);
      setMessage("You joined the team.");
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLeave(teamId) {
    setError("");
    setMessage("");
    try {
      const data = await api.post(`/teams/${teamId}/leave`, {}, token);
      setMessage(data.message);
      loadAll();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container" style={{ padding: "48px 24px 80px" }}>
      <span className="eyebrow">Team formation</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: "2.1rem", marginTop: 10 }}>Find your crew.</h1>
        {!myTeam && (
          <button className="btn btn-primary" onClick={() => setShowCreate((s) => !s)}>
            {showCreate ? "Cancel" : "Create a team"}
          </button>
        )}
      </div>

      {error && <div className="alert-banner">{error}</div>}
      {message && <div className="success-banner">{message}</div>}

      {showCreate && !myTeam && (
        <form onSubmit={handleCreate} className="card" style={{ marginTop: 20, marginBottom: 32 }}>
          <div className="field">
            <label htmlFor="tname">Team name</label>
            <input id="tname" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="ttrack">Track</label>
            <select id="ttrack" value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
              {TRACK_LIST.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="tdesc">What are you building? (optional)</label>
            <textarea
              id="tdesc"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Create team
          </button>
        </form>
      )}

      <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 16 }}>All teams ({teams.length})</h2>
          {loading ? (
            <p>Loading teams…</p>
          ) : teams.length === 0 ? (
            <p>No teams yet — be the first to create one.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {teams.map((t) => {
                const isMine = t.members.some((m) => m.id === user.id);
                const full = t.members.length >= t.max_members;
                return (
                  <div key={t.id} className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ fontSize: "1.05rem", marginBottom: 6 }}>{t.name}</h3>
                        <span
                          className="badge"
                          style={{ color: TRACKS[t.track]?.color, borderColor: TRACKS[t.track]?.color }}
                        >
                          {TRACKS[t.track]?.short}
                        </span>
                      </div>
                      <span className="mono" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {t.members.length}/{t.max_members}
                      </span>
                    </div>
                    {t.description && <p style={{ marginTop: 10, fontSize: "0.88rem" }}>{t.description}</p>}
                    <p style={{ marginTop: 10, fontSize: "0.82rem" }}>
                      {t.members.map((m) => m.name).join(", ")}
                    </p>
                    <div style={{ marginTop: 14 }}>
                      {isMine ? (
                        <button className="btn btn-danger" onClick={() => handleLeave(t.id)}>
                          Leave team
                        </button>
                      ) : myTeam ? (
                        <span className="mono" style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
                          Leave your current team to join this one
                        </span>
                      ) : full ? (
                        <span className="mono" style={{ fontSize: "0.78rem", color: "var(--text-faint)" }}>
                          Team is full
                        </span>
                      ) : (
                        <button className="btn btn-ghost" onClick={() => handleJoin(t.id)}>
                          Join team
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Looking for a team ({participants.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {participants
              .filter((p) => p.id !== user.id)
              .map((p) => (
                <div key={p.id} className="card" style={{ padding: 16 }}>
                  <p style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.92rem" }}>{p.name}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {(p.skills || []).map((s) => (
                      <span key={s} className="badge">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            {participants.filter((p) => p.id !== user.id).length === 0 && (
              <p style={{ fontSize: "0.88rem" }}>Everyone's already on a team.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
