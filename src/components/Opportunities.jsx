import React from 'react';

const Opportunities = () => {
  return (
    <section id="opportunities">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Opportunities</span>
          <h2>More than a prize pool</h2>
          <p>What every participant walks away with, win or lose.</p>
        </div>
        <div className="grid4 reveal">
          <div className="opp-card">
            <div className="oic">💰</div>
            <h4>Compete for KES 5M+ in prizes</h4>
            <p>Cash awards across the overall, track and special‑category tiers.</p>
          </div>
          <div className="opp-card">
            <div className="oic">🤝</div>
            <h4>Connect with AI & IoT experts</h4>
            <p>Work directly with mentors from industry throughout the build.</p>
          </div>
          <div className="opp-card">
            <div className="oic">📣</div>
            <h4>Get recognized by industry leaders</h4>
            <p>Live demos judged and seen by TechSavanna's partner network.</p>
          </div>
          <div className="opp-card">
            <div className="oic">🚀</div>
            <h4>Advance your career & your idea</h4>
            <p>Top teams enter TechSavanna's incubation track after the event.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
