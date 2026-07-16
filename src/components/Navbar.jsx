import React from 'react';

const Navbar = ({ toggleTheme, isDark, openAuth, toggleDrawer, user, openPortal }) => {
  return (
    <nav id="navbar">
      <div className="nav-inner">
        <a href="#home" className="brand">
          <img 
            src="https://careers.techsavanna.technology/logo-dark.png" 
            alt="Techsavanna" 
            style={{ height: '35px', width: 'auto' }}
          />
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#tracks">Tracks</a>
          <a href="#schedule">Schedule</a>
          <a href="#prizes">Prizes</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#rules">Rules</a>
          <a href="#faqs">FAQs</a>
          <a href="#sponsors">Sponsors</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Toggle dark mode" onClick={toggleTheme} style={{ width: '32px', height: '32px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
            </svg>
          </button>
          {!user ? (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => openAuth('login')} style={{ padding: '6px 12px', fontSize: '12px' }}>Log in</button>
              <button className="btn btn-primary btn-sm" onClick={() => openAuth('register')} style={{ padding: '6px 12px', fontSize: '12px' }}>Register</button>
            </>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => openPortal('overview')} style={{ padding: '6px 12px', fontSize: '12px' }}>My Portal</button>
          )}
          <button className="icon-btn" id="hamburger" aria-label="Open menu" onClick={() => toggleDrawer(true)} style={{ width: '32px', height: '32px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
