import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { TRACK_LIST } from "../constants/tracks";

const EMPTY = {
  title: "",
  description: "",
  track: TRACK_LIST[0].value,
  repoUrl: "",
  demoUrl: "",
  videoUrl: "",
  techStack: "",
};

export default function Submission() {
  const { token } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/submissions/mine", token);
        if (data.submission) {
          const s = data.submission;
          setForm({
            title: s.title,
            description: s.description,
            track: s.track,
            repoUrl: s.repo_url || "",
            demoUrl: s.demo_url || "",
            videoUrl: s.video_url || "",
            techStack: s.tech_stack || "",
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);
    try {
      await api.post("/submissions", form, token);
      setMessage("Submission saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: "48px 24px" }}>
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 680, padding: "48px 24px 80px" }}>
      <span className="eyebrow">Project submission</span>
      <h1 style={{ fontSize: "2rem", marginTop: 10, marginBottom: 8 }}>Submit your project</h1>
      <p style={{ marginBottom: 28 }}>
        One submission per team. Save as many times as you like before judging closes.
      </p>

      {error && <div className="alert-banner">{error}</div>}
      {message && <div className="success-banner">{message}</div>}

      <form onSubmit={handleSubmit} className="card">
        <div className="field">
          <label htmlFor="title">Project title</label>
          <input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="track">Track</label>
          <select id="track" value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
            {TRACK_LIST.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="techStack">Tech stack used</label>
          <input
            id="techStack"
            placeholder="e.g. React, Edge Impulse API, Node.js"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="repoUrl">Repository URL</label>
          <input
            id="repoUrl"
            type="url"
            placeholder="https://github.com/..."
            value={form.repoUrl}
            onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="demoUrl">Live demo URL</label>
          <input
            id="demoUrl"
            type="url"
            placeholder="https://..."
            value={form.demoUrl}
            onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="videoUrl">Demo video URL (optional)</label>
          <input
            id="videoUrl"
            type="url"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={saving} style={{ width: "100%" }}>
          {saving ? "Saving…" : "Save submission"}
        </button>
      </form>
    </div>
  );
}
