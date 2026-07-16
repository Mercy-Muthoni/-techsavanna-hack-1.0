import React from 'react';

const MobileDrawer = ({ isOpen, toggleDrawer }) => {
  return (
    <div id="mobileDrawer" className={isOpen ? 'open' : ''} onClick={(e) => { if (e.target === e.currentTarget) toggleDrawer(false); }}>
      <div className="drawer-panel">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button className="icon-btn" onClick={() => toggleDrawer(false)} aria-label="Close menu">✕</button>
        </div>
        <a href="#home" onClick={() => toggleDrawer(false)}>Home</a>
        <a href="#about" onClick={() => toggleDrawer(false)}>About</a>
        <a href="#tracks" onClick={() => toggleDrawer(false)}>Theme & Tracks</a>
        <a href="#schedule" onClick={() => toggleDrawer(false)}>Schedule</a>
        <a href="#prizes" onClick={() => toggleDrawer(false)}>Prizes</a>
        <a href="#opportunities" onClick={() => toggleDrawer(false)}>Opportunities</a>
        <a href="#rules" onClick={() => toggleDrawer(false)}>Rules</a>
        <a href="#faqs" onClick={() => toggleDrawer(false)}>FAQs</a>
        <a href="#sponsors" onClick={() => toggleDrawer(false)}>Sponsors</a>
        <a href="#mentors" onClick={() => toggleDrawer(false)}>Mentors</a>
        <a href="#announcements" onClick={() => toggleDrawer(false)}>Announcements</a>
        <a href="#contact" onClick={() => toggleDrawer(false)}>Contact</a>
      </div>
    </div>
  );
};

export default MobileDrawer;