import React, { useEffect } from 'react';

const Home = ({ openAuth }) => {
  useEffect(() => {
    const EVENT_DATE = new Date('2026-09-25T08:00:00');
    
    const updateClock = () => {
      const now = new Date();
      const clockEl = document.getElementById('clock');
      if (clockEl) clockEl.textContent = now.toLocaleTimeString('en-GB');
      
      const diff = EVENT_DATE - now;
      const days = Math.max(0, Math.ceil(diff / 86400000));
      const cdDays = document.getElementById('cd-days');
      if (cdDays) cdDays.textContent = days;
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">3 Days · In‑Person · Nairobi</span>
          <h1>Build the sensors that <span className="grad">watch over life.</span></h1>
          <p className="lead">TechSavanna Hack 1.0 challenges builders to ship real AI + IoT prototypes for <strong>human safety and environmental wellbeing monitoring</strong> — air, water, and personal health, sensed in real time.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => openAuth('register')}>Register your team</button>
            <a href="#tracks" className="btn btn-ghost">Explore the tracks ↓</a>
          </div>
          <div className="hero-stats">
            <div className="hstat"><b id="cd-days">--</b><span>Days to launch</span></div>
            <div className="hstat"><b>3</b><span>Monitoring tracks</span></div>
            <div className="hstat"><b>KES 500K+</b><span>In prizes</span></div>
            <div className="hstat"><b>72h</b><span>Build window</span></div>
          </div>
        </div>
        <div className="monitor reveal show">
          <div className="monitor-head">
            <span className="monitor-title"><span className="dot"></span>Live Sensor Feed — Demo</span>
            <span className="monitor-title mono">#TSHACK1.0</span>
          </div>
          <div className="channels">
            <div className="channel">
              <span className="lbl" style={{ color: 'var(--air)' }}>AIR QUALITY</span>
              <svg viewBox="0 0 300 34" preserveAspectRatio="none">
                <path className="mpath moving" stroke="var(--air)" d="M0,17 L20,17 L28,6 L36,28 L44,17 L70,17 L78,10 L86,24 L94,17 L300,17 L320,17 L328,6 L336,28 L344,17 L370,17 L378,10 L386,24 L394,17 L600,17"/>
              </svg>
              <span className="val" style={{ color: 'var(--air)' }}>Good</span>
            </div>
            <div className="channel">
              <span className="lbl" style={{ color: 'var(--water)' }}>WATER SAFETY</span>
              <svg viewBox="0 0 300 34" preserveAspectRatio="none">
                <path className="mpath moving" stroke="var(--water)" d="M0,17 L40,17 L48,4 L56,30 L64,17 L120,17 L128,8 L136,26 L144,17 L300,17 L340,17 L348,4 L356,30 L364,17 L420,17 L428,8 L436,26 L444,17 L600,17"/>
              </svg>
              <span className="val" style={{ color: 'var(--water)' }}>Stable</span>
            </div>
            <div className="channel">
              <span className="lbl" style={{ color: 'var(--health)' }}>VITAL SIGNS</span>
              <svg viewBox="0 0 300 34" preserveAspectRatio="none">
                <path className="mpath moving" stroke="var(--health)" d="M0,17 L10,17 L16,3 L22,31 L28,17 L60,17 L66,3 L72,31 L78,17 L300,17 L310,17 L316,3 L322,31 L328,17 L360,17 L366,3 L372,31 L378,17 L600,17"/>
              </svg>
              <span className="val" style={{ color: 'var(--health)' }}>72 bpm</span>
            </div>
          </div>
          <div className="monitor-foot">
            <span>NODE: SAVANNA‑01</span>
            <span id="clock">--:--:--</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
