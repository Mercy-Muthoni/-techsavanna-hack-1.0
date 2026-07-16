import React from 'react';

const Tracks = () => {
  return (
    <section id="tracks" className="alt">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Theme & tracks</span>
          <h2>Three signals worth watching</h2>
          <p>Pick a track and design a monitoring system — from raw sensor to actionable alert.</p>
        </div>
        <div className="grid3">
          <div className="track-card reveal">
            <span className="tag">TRACK 01</span>
            <div className="ic" style={{ background: 'rgba(34,193,164,.15)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15916f" strokeWidth="2" strokeLinecap="round">
                <path d="M9 4a3 3 0 1 1 3 3H2"/>
                <path d="M13 20a3 3 0 1 0 3-3H2"/>
                <path d="M17 12a3 3 0 1 1 3 3H2"/>
              </svg>
            </div>
            <h3>Air Quality & Environmental Hazard Monitoring</h3>
            <p>Sense particulate matter, gases and industrial emissions; predict and alert before air becomes unsafe to breathe.</p>
          </div>
          <div className="track-card reveal">
            <span className="tag">TRACK 02</span>
            <div className="ic" style={{ background: 'rgba(25,118,210,.15)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976D2" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2.69s-6 6.6-6 10.71a6 6 0 0 0 12 0c0-4.11-6-10.71-6-10.71Z"/>
              </svg>
            </div>
            <h3>Drowning Prevention & Water Safety</h3>
            <p>Detect distress in open water or pools, monitor water quality, and trigger real‑time rescue alerts.</p>
          </div>
          <div className="track-card reveal">
            <span className="tag">TRACK 03</span>
            <div className="ic" style={{ background: 'rgba(224,93,93,.15)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c23f3f" strokeWidth="2" strokeLinecap="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
              </svg>
            </div>
            <h3>Personal Health Monitoring</h3>
            <p>Wearables and ambient sensors that track vitals and flag early warning signs for chronic or acute conditions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracks;
