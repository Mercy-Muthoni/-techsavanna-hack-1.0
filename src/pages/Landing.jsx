import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Countdown from "../components/Countdown";
import PulseLine from "../components/PulseLine";
import { TRACK_LIST } from "../constants/tracks";

const PARTNERS = [
  { name: "Techsavanna", mark: "TS", color: "#0061b2", logo: "/techsavanna-logo.svg" },
  { name: "Safaricom PLC", mark: "S", color: "#00a651", logo: "/safaricom-logo.png" },
  { name: "KCB Group", mark: "KCB", color: "#003b71", logo: "/kcb-logo.png" },
  { name: "Equity Bank", mark: "E", color: "#8b1e3f", logo: "/equity-logo.jpeg" },
  { name: "Open Data Partners", mark: "OD", color: "#1976d2" },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO */}
      <section className="container" style={{ padding: "72px 24px 40px" }}>
        <span className="eyebrow">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }} />
          Three days · In person · Live demo required
        </span>
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", maxWidth: 780, marginTop: 18 }}>
          Build software that watches for danger{" "}
          <span style={{ color: "var(--signal)" }}>before it happens.</span>
        </h1>
        <p style={{ maxWidth: 620, marginTop: 18, fontSize: "1.05rem" }}>
          Techsavanna Hack 1.0 challenges teams to build AI &amp; IoT-powered web applications for human
          safety: air quality hazard detection, drowning prevention, and continuous health monitoring —
          using Edge Impulse, Roboflow, and Blynk.
        </p>

        <div style={{ marginTop: 32 }}>
          <PulseLine height={50} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 32, gap: 16 }}>
          <Countdown />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Register your spot →
                </Link>
                <Link to="/login" className="btn btn-ghost">
                  I already have an account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="container" style={{ padding: "56px 24px" }}>
        <span className="eyebrow">Challenge tracks</span>
        <h2 style={{ fontSize: "1.9rem", marginTop: 10, marginBottom: 28 }}>
          Three real, documented safety problems.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {TRACK_LIST.map((t) => (
            <div key={t.value} className="card">
              <div
                className="badge"
                style={{ color: t.color, borderColor: t.color, marginBottom: 14, display: "inline-block" }}
              >
                {t.short}
              </div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 10 }}>{t.label}</h3>
              <p style={{ fontSize: "0.9rem" }}>
                {t.value === "air_quality" &&
                  "Detect smoke, carbon monoxide, and toxic gas exposure by fusing multiple simulated sensor streams through an AI classification layer."}
                {t.value === "drowning_prevention" &&
                  "Analyse live or recorded video and motion data to catch the brief, often silent onset of a drowning event within seconds."}
                {t.value === "health_monitoring" &&
                  "Continuously monitor physiological data for vulnerable individuals and alert caregivers the moment a reading turns dangerous."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section className="container" style={{ padding: "8px 24px 56px" }}>
        <span className="eyebrow">About / mission</span>
        <h2 style={{ fontSize: "1.9rem", marginTop: 10, marginBottom: 18 }}>
          Building safer communities through practical innovation.
        </h2>
        <p style={{ maxWidth: 760, fontSize: "1rem", lineHeight: 1.7 }}>
          Techsavanna Hack brings builders, researchers, and community leaders together to create fast, human-centered
          solutions for environmental risk, public safety, and wellness. The goal is to turn real-world challenges into
          usable technology that can make a measurable difference.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginTop: 20 }}>
          {[
            { title: "Community-first", text: "Every idea is grounded in problems people face every day." },
            { title: "Rapid prototyping", text: "Teams build working experiences quickly with accessible tools and APIs." },
            { title: "Real impact", text: "Solutions are designed to support safety, awareness, and faster response." },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 style={{ fontSize: "1.05rem", marginBottom: 8, color: "var(--signal)" }}>{item.title}</h3>
              <p style={{ fontSize: "0.88rem" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORS / PARTNERS */}
      <section className="container" style={{ padding: "8px 24px 56px" }}>
        <span className="eyebrow">Sponsors / partners</span>
        <h2 style={{ fontSize: "1.9rem", marginTop: 10, marginBottom: 18 }}>
          Powered by collaborators who believe in safe, inclusive innovation.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="card"
              style={{ minHeight: 190, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 18, padding: 28 }}
            >
              {partner.logo ? (
                <img src={partner.logo} alt={`${partner.name} logo`} style={{ width: "min(186px, 80%)", maxHeight: 54, objectFit: "contain" }} />
              ) : (
                <div
                  aria-hidden="true"
                  style={{ width: 64, height: 64, display: "grid", placeItems: "center", borderRadius: 18, background: partner.color, color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: partner.mark.length > 2 ? "1rem" : "1.8rem", letterSpacing: "-0.04em", boxShadow: `0 10px 22px ${partner.color}40` }}
                >
                  {partner.mark}
                </div>
              )}
              <div>
                <h3 style={{ fontSize: "1.12rem", marginBottom: 6, color: "var(--text)" }}>{partner.name}</h3>
                <p style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Partner</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="container" style={{ padding: "16px 24px 80px" }}>
        <span className="eyebrow">Tooling on offer</span>
        <h2 style={{ fontSize: "1.9rem", marginTop: 10, marginBottom: 28 }}>
          API-first AI &amp; IoT, no hardware required.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {[
            { name: "Edge Impulse", desc: "Train and call AI classification models via API for sensor data." },
            { name: "Roboflow", desc: "Pretrained computer-vision models for pose and motion detection." },
            { name: "Blynk", desc: "IoT dashboards and real-time alerting without physical devices." },
          ].map((s) => (
            <div key={s.name} className="card">
              <h3 style={{ fontSize: "1.05rem", marginBottom: 8, color: "var(--signal)" }}>{s.name}</h3>
              <p style={{ fontSize: "0.88rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
