import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { TRACKS } from "../constants/tracks";

const CRITERIA = [
  { key: "innovation", label: "Innovation" },
  { key: "technicalExecution", label: "Technical execution" },
  { key: "impact", label: "Impact" },
  { key: "presentation", label: "Presentation" },
];

function ScoreForm({ submission, token, onSaved }) {
  const [scores, setScores] = useState({
    innovation: submission.innovation || 5,
    technicalExecution: submission.technical_execution || 5,
    impact: submission.impact || 5,
    presentation: submission.presentation || 5,
  });
  const [comments, setComments] = useState(submission.comments || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const alreadyScored = Boolean(submission.my_score_id);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      await api.post(`/judging/submissions/${submission.id}/score`, { ...scores, comments }, token);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontSize: "1.05rem" }}>{submission.title}</h3>
          <p style={{ fontSize: "0.82rem", marginTop: 4 }}>{submission.team_name}</p>
        </div>
        <span
          className="badge"
          style={{ color: TRACKS[submission.track]?.color, borderColor: TRACKS[submission.track]?.color }}
        >
          {TRACKS[submission.track]?.short}
        </span>
      </div>

      <p style={{ marginTop: 12, fontSize: "0.88rem" }}>{submission.description}</p>

      <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
        {submission.repo_url && (
          <a href={submission.repo_url} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: "0.8rem", color: "var(--signal)" }}>
            Repository →
          </a>
        )}
        {submission.demo_url && (
          <a href={submission.demo_url} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: "0.8rem", color: "var(--signal)" }}>
            Live demo →
          </a>
        )}
      </div>

      {error && <div className="alert-banner" style={{ marginTop: 14 }}>{error}</div>}
      {alreadyScored && <div className="success-banner" style={{ marginTop: 14 }}>You've already scored this — edits update your score.</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 14, marginTop: 16 }}>
        {CRITERIA.map((c) => (
          <div key={c.key} className="field" style={{ marginBottom: 0 }}>
            <label htmlFor={`${submission.id}-${c.key}`}>
              {c.label}: <span className="mono" style={{ color: "var(--signal)" }}>{scores[c.key]}</span>
            </label>
            <input
              id={`${submission.id}-${c.key}`}
              type="range"
              min={1}
              max={10}
              value={scores[c.key]}
              onChange={(e) => setScores({ ...scores, [c.key]: Number(e.target.value) })}
            />
          </div>
        ))}
      </div>

      <div className="field" style={{ marginTop: 8 }}>
        <label htmlFor={`${submission.id}-comments`}>Comments (optional)</label>
        <textarea
          id={`${submission.id}-comments`}
          rows={2}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : alreadyScored ? "Update score" : "Submit score"}
      </button>
    </div>
  );
}

export default function Judging() {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await api.get("/judging/submissions", token);
      setSubmissions(data.submissions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" style={{ maxWidth: 760, padding: "48px 24px 80px" }}>
      <span className="eyebrow">Judging queue</span>
      <h1 style={{ fontSize: "2rem", marginTop: 10, marginBottom: 8 }}>Score submissions</h1>
      <p style={{ marginBottom: 28 }}>Rate each project from 1–10 across four criteria.</p>

      {error && <div className="alert-banner">{error}</div>}

      {loading ? (
        <p>Loading submissions…</p>
      ) : submissions.length === 0 ? (
        <p>No submissions to review yet.</p>
      ) : (
        submissions.map((s) => <ScoreForm key={s.id} submission={s} token={token} onSaved={load} />)
      )}
    </div>
  );
}
