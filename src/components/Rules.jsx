import React from 'react';

const Rules = () => {
  return (
    <section id="rules">
      <div className="wrap grid2">
        <div className="reveal">
          <span className="eyebrow">Eligibility & rules</span>
          <h2 className="section-head" style={{ marginBottom: '20px' }}>Play fair, build fresh</h2>
          <ul className="rule-list">
            <li><span className="ico">✓</span>Open to developers, designers, hardware builders and students aged 18+.</li>
            <li><span className="ico">✓</span>Teams of 2–5 people; solo entries allowed but not recommended.</li>
            <li><span className="ico">✓</span>All code and hardware work must be built during the 72‑hour window.</li>
            <li><span className="ico">✓</span>Open‑source libraries and pre‑trained models are allowed with attribution.</li>
            <li><span className="ico">✓</span>Each team submits one project to exactly one track.</li>
            <li><span className="ico">✓</span>Projects are judged on impact, technical execution, AI/IoT integration, and demo quality.</li>
          </ul>
        </div>
        <div className="reveal">
          <span className="eyebrow">Judging criteria</span>
          <h2 className="section-head" style={{ marginBottom: '20px' }}>How scoring works</h2>
          <ul className="rule-list">
            <li><span className="ico">①</span><strong>Impact (25%)</strong> — does it solve a real safety or wellbeing problem?</li>
            <li><span className="ico">②</span><strong>Technical execution (25%)</strong> — is the AI/IoT integration sound and working?</li>
            <li><span className="ico">③</span><strong>Innovation (20%)</strong> — how original is the approach?</li>
            <li><span className="ico">④</span><strong>Usability (15%)</strong> — is it usable by the people it's meant to protect?</li>
            <li><span className="ico">⑤</span><strong>Presentation (15%)</strong> — clarity and quality of the live demo.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Rules;
