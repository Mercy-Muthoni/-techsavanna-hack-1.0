import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="reveal">
          <span className="eyebrow">About the hackathon</span>
          <h2 className="section-head" style={{ marginBottom: 0 }}>AI and IoT for Human Safety and Environmental Wellbeing Monitoring</h2>
          <p style={{ opacity: 0.72, marginTop: '16px', fontSize: '15.5px' }}>Organized by TechSavanna, Hack 1.0 gathers developers, data scientists, hardware tinkerers and designers for three days of focused, in‑person building. Teams pair sensors with intelligence to catch danger before it becomes disaster — in the air we breathe, the water we drink, and the vitals we carry.</p>
          <div style={{ marginTop: '26px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <span className="chip sel">AI / ML</span>
            <span className="chip">IoT Hardware</span>
            <span className="chip">Edge Sensing</span>
            <span className="chip">Public Health</span>
            <span className="chip">Climate Resilience</span>
          </div>
        </div>
        <div className="reveal">
          <div className="about-obj">
            <span className="n">01</span>
            <div>
              <h4 style={{ fontSize: '15px' }}>Build AI + IoT solutions</h4>
              <p style={{ fontSize: '13.5px', opacity: 0.68 }}>for real‑world safety challenges facing Kenyan communities.</p>
            </div>
          </div>
          <div className="about-obj">
            <span className="n">02</span>
            <div>
              <h4 style={{ fontSize: '15px' }}>Promote innovation & collaboration</h4>
              <p style={{ fontSize: '13.5px', opacity: 0.68 }}>across disciplines — hardware, software, and design working as one team.</p>
            </div>
          </div>
          <div className="about-obj">
            <span className="n">03</span>
            <div>
              <h4 style={{ fontSize: '15px' }}>Deliver functional prototypes</h4>
              <p style={{ fontSize: '13.5px', opacity: 0.68 }}>that create measurable impact beyond demo day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
