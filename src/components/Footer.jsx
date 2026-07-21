import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ openAuth }) => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    openAuth('register');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    openAuth('login');
  };

  const handlePortal = (e) => {
    e.preventDefault();
    navigate('/portal');
  };

  return (
    <footer>
      <div className="wrap foot-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <img 
              src="https://careers.techsavanna.technology/logo-dark.png" 
              alt="Techsavanna" 
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
          <p style={{ fontSize: '13.5px', opacity: 0.65, maxWidth: '280px' }}>
            TechSavanna Hack 1.0 — three days of AI and IoT built for human safety and environmental wellbeing.
          </p>
        </div>
        <div>
          <h4>Event</h4>
          <a href="/#about">About</a>
          <a href="/#tracks">Tracks</a>
          <a href="/#schedule">Schedule</a>
          <a href="/#prizes">Prizes</a>
        </div>
        <div>
          <h4>Info</h4>
          <a href="/#rules">Rules</a>
          <a href="/#faqs">FAQs</a>
          <a href="/#sponsors">Sponsors</a>
        </div>
        <div>
          <h4>Portal</h4>
          <a href="#" onClick={handleRegister}>Register</a>
          <a href="#" onClick={handleLogin}>Log in</a>
          <a href="#" onClick={handlePortal}>My Portal</a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 TechSavanna. All rights reserved.</span>
        <span>Built for TechSavanna Hack 1.0</span>
      </div>
    </footer>
  );
};

export default Footer;
