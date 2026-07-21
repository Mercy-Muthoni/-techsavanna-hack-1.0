import React, { useState } from 'react';

const AuthModalNew = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  onTabChange, 
  onLogin, 
  onRegister,
  showToast 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields');
      return;
    }
    onLogin(email);
    setEmail('');
    setPassword('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill in all fields');
      return;
    }
    onRegister(name, email);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleForgot = (e) => {
    e.preventDefault();
    onClose();
    showToast('Reset link sent to your email (demo)');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-bg open" id="authModal">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="tab-switch">
          <button 
            className={activeTab === 'login' ? 'active' : ''} 
            onClick={() => onTabChange('login')}
          >
            Log in
          </button>
          <button 
            className={activeTab === 'register' ? 'active' : ''} 
            onClick={() => onTabChange('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'login' && (
          <div id="loginForm">
            <h3 style={{ marginBottom: '18px' }}>Welcome back</h3>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email</label>
                <input 
                  required 
                  type="email" 
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  minLength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="button" onClick={() => onTabChange('forgot')} style={{ fontSize: '12.5px', color: 'var(--accent)', fontWeight: 600, marginBottom: '16px', display: 'inline-block', background: 'none', border: 'none' }}>
                Forgot password?
              </button>
              <button className="btn btn-primary btn-block" type="submit">Log in</button>
            </form>
            <p style={{ fontSize: '12px', opacity: 0.55, marginTop: '16px', textAlign: 'center' }}>
              Demo mode — any email/password works. Use <b>admin@techsavanna.tech</b> for the admin view.
            </p>
          </div>
        )}

        {activeTab === 'register' && (
          <div id="registerForm">
            <h3 style={{ marginBottom: '18px' }}>Create your account</h3>
            <form onSubmit={handleRegister}>
              <div className="field">
                <label>Full name</label>
                <input 
                  required 
                  placeholder="Jane Wanjiru"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input 
                  required 
                  type="email" 
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input 
                  required 
                  type="password" 
                  minLength="6" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit">Create account & verify email</button>
            </form>
          </div>
        )}

        {activeTab === 'forgot' && (
          <div id="forgotForm">
            <h3 style={{ marginBottom: '10px' }}>Reset your password</h3>
            <p style={{ fontSize: '13px', opacity: 0.65, marginBottom: '18px' }}>Enter your email and we'll send a reset link.</p>
            <form onSubmit={handleForgot}>
              <div className="field">
                <label>Email</label>
                <input required type="email" placeholder="you@email.com" />
              </div>
              <button className="btn btn-primary btn-block" type="submit">Send reset link</button>
            </form>
            <button onClick={() => onTabChange('login')} style={{ fontSize: '12.5px', color: 'var(--accent)', fontWeight: 600, marginTop: '14px', background: 'none', border: 'none' }}>
              ← Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModalNew;
