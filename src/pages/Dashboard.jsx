import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { TRACKS } from "../constants/tracks";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [team, setTeam] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        if (user.role === "participant") {
          const teamsData = await api.get("/teams", token);
          const mine = teamsData.teams.find((t) => t.members.some((m) => m.id === user.id));
          setTeam(mine || null);

          const subData = await api.get("/submissions/mine", token);
          setSubmission(subData.submission);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user, token]);

  return (
    <div className="container" style={{ padding: "48px 24px 80px" }}>
      <span className="eyebrow">Signed in as {user.role}</span>
      <h1 style={{ fontSize: "2.1rem", marginTop: 10, marginBottom: 8 }}>Welcome, {user.name.split(" ")[0]}.</h1>
      <p style={{ marginBottom: 36 }}>Here's where things stand for you right now.</p>

      {error && <div className="alert-banner">{error}</div>}

      {user.role === "participant" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          <div className="card">
            <h3 style={{ marginBottom: 12, fontSize: "1.05rem" }}>Your team</h3>
            {loading ? (
              <p>Loading…</p>
            ) : team ? (
              <>
                <p style={{ color: "var(--text)", fontWeight: 600, marginBottom: 4 }}>{team.name}</p>
                <span
                  className="badge"
                  style={{ color: TRACKS[team.track]?.color, borderColor: TRACKS[team.track]?.color }}
                >
                  {TRACKS[team.track]?.short}
                </span>
                <p style={{ marginTop: 12, fontSize: "0.85rem" }}>
                  {team.members.length} / {team.max_members} members
                </p>
                <Link to="/teams" className="btn btn-ghost" style={{ marginTop: 14 }}>
                  Manage team →
                </Link>
              </>
            ) : (
              <>
                <p>You haven't joined or created a team yet.</p>
                <Link to="/teams" className="btn btn-primary" style={{ marginTop: 14 }}>
                  Find a team →
                </Link>
              </>
            )}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 12, fontSize: "1.05rem" }}>Your submission</h3>
            {loading ? (
              <p>Loading…</p>
            ) : submission ? (
              <>
                <p style={{ color: "var(--text)", fontWeight: 600, marginBottom: 4 }}>{submission.title}</p>
                <span className="badge">{submission.status}</span>
                <Link to="/submission" className="btn btn-ghost" style={{ marginTop: 14 }}>
                  Edit submission →
                </Link>
              </>
            ) : (
              <>
                <p>
                  {team ? "You haven't submitted a project yet." : "Join a team first, then submit your project here."}
                </p>
                {team && (
                  <Link to="/submission" className="btn btn-primary" style={{ marginTop: 14 }}>
                    Start submission →
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {user.role === "judge" && (
        <div className="card">
          <h3 style={{ marginBottom: 12, fontSize: "1.05rem" }}>Judging queue</h3>
          <p>Review team submissions and score them against innovation, technical execution, impact, and presentation.</p>
          <Link to="/judging" className="btn btn-primary" style={{ marginTop: 14 }}>
            Go to judging →
          </Link>
        </div>
      )}

      {user.role === "admin" && (
        <div className="card">
          <h3 style={{ marginBottom: 12, fontSize: "1.05rem" }}>Event control</h3>
          <p>View live stats, manage participants and judges, and monitor team/track distribution.</p>
          <Link to="/admin" className="btn btn-primary" style={{ marginTop: 14 }}>
            Open admin dashboard →
          </Link>
        </div>
      )}
    </div>
  );
}
