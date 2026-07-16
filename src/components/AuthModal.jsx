import React, { useState } from 'react';

const AuthModal = ({ 
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

  const modalClass = 'modal-bg' + (isOpen ? ' open' : '');
  const loginTabClass = 'tab-switch button' + (activeTab === 'login' ? ' active' : '');
  const registerTabClass = 'tab-switch button' + (activeTab === 'register' ? ' active' : '');

  return (
    React.createElement('div', { className: modalClass, id: 'authModal' },
      React.createElement('div', { className: 'modal-card' },
        React.createElement('button', { className: 'modal-close', onClick: onClose, 'aria-label': 'Close' }, '✕'),
        React.createElement('div', { className: 'tab-switch' },
          React.createElement('button', { className: activeTab === 'login' ? 'active' : '', onClick: () => onTabChange('login') }, 'Log in'),
          React.createElement('button', { className: activeTab === 'register' ? 'active' : '', onClick: () => onTabChange('register') }, 'Register')
        ),
        activeTab === 'login' && React.createElement('div', { id: 'loginForm' },
          React.createElement('h3', { style: { marginBottom: '18px' } }, 'Welcome back'),
          React.createElement('form', { onSubmit: handleLogin },
            React.createElement('div', { className: 'field' },
              React.createElement('label', null, 'Email'),
              React.createElement('input', { required: true, type: 'email', placeholder: 'you@email.com', value: email, onChange: (e) => setEmail(e.target.value) })
            ),
            React.createElement('div', { className: 'field' },
              React.createElement('label', null, 'Password'),
              React.createElement('input', { required: true, type: 'password', placeholder: '••••••••', minLength: '6', value: password, onChange: (e) => setPassword(e.target.value) })
            ),
            React.createElement('button', { type: 'button', onClick: () => onTabChange('forgot'), style: { fontSize: '12.5px', color: 'var(--accent)', fontWeight: 600, marginBottom: '16px', display: 'inline-block', background: 'none', border: 'none' } }, 'Forgot password?'),
            React.createElement('button', { className: 'btn btn-primary btn-block', type: 'submit' }, 'Log in')
          ),
          React.createElement('p', { style: { fontSize: '12px', opacity: 0.55, marginTop: '16px', textAlign: 'center' } }, 
            'Demo mode — any email/password works. Use ', 
            React.createElement('b', null, 'admin@techsavanna.tech'), 
            ' for the admin view.'
          )
        ),
        activeTab === 'register' && React.createElement('div', { id: 'registerForm' },
          React.createElement('h3', { style: { marginBottom: '18px' } }, 'Create your account'),
          React.createElement('form', { onSubmit: handleRegister },
            React.createElement('div', { className: 'field' },
              React.createElement('label', null, 'Full name'),
              React.createElement('input', { required: true, placeholder: 'Jane Wanjiru', value: name, onChange: (e) => setName(e.target.value) })
            ),
            React.createElement('div', { className: 'field' },
              React.createElement('label', null, 'Email'),
              React.createElement('input', { required: true, type: 'email', placeholder: 'you@email.com', value: email, onChange: (e) => setEmail(e.target.value) })
            ),
            React.createElement('div', { className: 'field' },
              React.createElement('label', null, 'Password'),
              React.createElement('input', { required: true, type: 'password', minLength: '6', placeholder: '••••••••', value: password, onChange: (e) => setPassword(e.target.value) })
            ),
            React.createElement('button', { className: 'btn btn-primary btn-block', type: 'submit' }, 'Create account & verify email')
          )
        ),
        activeTab === 'forgot' && React.createElement('div', { id: 'forgotForm' },
          React.createElement('h3', { style: { marginBottom: '10px' } }, 'Reset your password'),
          React.createElement('p', { style: { fontSize: '13px', opacity: 0.65, marginBottom: '18px' } }, "Enter your email and we'll send a reset link."),
          React.createElement('form', { onSubmit: handleForgot },
            React.createElement('div', { className: 'field' },
              React.createElement('label', null, 'Email'),
              React.createElement('input', { required: true, type: 'email', placeholder: 'you@email.com' })
            ),
            React.createElement('button', { className: 'btn btn-primary btn-block', type: 'submit' }, 'Send reset link')
          ),
          React.createElement('button', { onClick: () => onTabChange('login'), style: { fontSize: '12.5px', color: 'var(--accent)', fontWeight: 600, marginTop: '14px', background: 'none', border: 'none' } }, '← Back to login')
        )
      )
    )
  );
};

export default AuthModal;
