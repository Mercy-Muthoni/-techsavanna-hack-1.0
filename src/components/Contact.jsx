import React from 'react';

const Contact = ({ showToast }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent — we'll reply within a day");
    e.target.reset();
  };

  return (
    <section id="contact" className="alt">
      <div className="wrap grid2">
        <div className="reveal">
          <span className="eyebrow">Contact us</span>
          <h2 className="section-head" style={{ marginBottom: '16px' }}>Questions before you register?</h2>
          <p style={{ opacity: 0.7, fontSize: '14.5px', marginBottom: '20px' }}>
            Reach the organizing team directly — we usually respond within one business day.
          </p>
          <p style={{ fontSize: '14.5px', marginBottom: '8px' }}>📍 TechSavanna HQ, Nairobi, Kenya</p>
          <p style={{ fontSize: '14.5px', marginBottom: '8px' }}>✉️ hack@techsavanna.tech</p>
          <p style={{ fontSize: '14.5px' }}>📞 +254 700 000 000</p>
        </div>
        <div className="panel reveal">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full name</label>
              <input required placeholder="Jane Wanjiru" />
            </div>
            <div className="field">
              <label>Email</label>
              <input required type="email" placeholder="jane@email.com" />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea rows="4" required placeholder="How can we help?"></textarea>
            </div>
            <button className="btn btn-primary btn-block" type="submit">Send message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
