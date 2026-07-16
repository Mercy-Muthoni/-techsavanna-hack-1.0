import React from 'react';

const Prizes = () => {
  return (
    <section id="prizes" className="alt">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Prizes</span>
          <h2>Rewarding real impact</h2>
          <p>Over <strong>KES 5M+</strong> across cash prizes, incubation and career support. Every tier below shares in the pool.</p>
        </div>

        <div className="prize-tiers reveal">
          <div className="prize-card prize-hero p1">
            <span className="prize-crown">🏆</span>
            <h3>Overall Winner</h3>
            <div className="amt amt-lg">KES 2,000,000</div>
            <p className="prize-sub">Awarded to the single best team across all three tracks.</p>
            <ul>
              <li>Cash prize + winner's trophy</li>
              <li>TechSavanna incubation slot</li>
              <li>6 months of dedicated mentorship</li>
              <li>Featured launch showcase</li>
            </ul>
          </div>
          <div className="prize-card p2 reveal">
            <h3>1st Runner‑Up</h3>
            <div className="amt">KES 1,000,000</div>
            <ul><li>Cash prize</li><li>3 months mentorship</li><li>Cloud credits package</li></ul>
          </div>
          <div className="prize-card p3 reveal">
            <h3>2nd Runner‑Up</h3>
            <div className="amt">KES 600,000</div>
            <ul><li>Cash prize</li><li>Hardware toolkit</li><li>Certificate of excellence</li></ul>
          </div>
        </div>

        <h3 className="tier-label reveal">Track & special category prizes</h3>
        <div className="grid4 reveal">
          <div className="track-prize-card">
            <div className="ic" style={{ background: 'rgba(34,193,164,.15)', color: '#15916f' }}>🌬️</div>
            <h4>Best Air Quality Solution</h4>
            <div className="amt-sm">KES 150,000</div>
          </div>
          <div className="track-prize-card">
            <div className="ic" style={{ background: 'rgba(25,118,210,.15)', color: '#1976D2' }}>💧</div>
            <h4>Best Water Safety Solution</h4>
            <div className="amt-sm">KES 150,000</div>
          </div>
          <div className="track-prize-card">
            <div className="ic" style={{ background: 'rgba(224,93,93,.15)', color: '#c23f3f' }}>❤️</div>
            <h4>Best Health Monitoring Solution</h4>
            <div className="amt-sm">KES 150,000</div>
          </div>
          <div className="track-prize-card">
            <div className="ic" style={{ background: 'rgba(232,185,35,.18)', color: '#8a6a10' }}>✨</div>
            <h4>Best Rookie / First‑Time Team</h4>
            <div className="amt-sm">KES 100,000</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
