import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import MobileDrawer from './components/MobileDrawer';
import Home from './components/Home';
import About from './components/About';
import Tracks from './components/Tracks';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import Opportunities from './components/Opportunities';
import Rules from './components/Rules';
import FAQs from './components/FAQs';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModalNew from './components/AuthModalNew';
import Portal from './components/Portal';
import Toast from './components/Toast';

const App = () => {
  const { user, isAdmin, login, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isDark, setIsDark] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [myTeam, setMyTeam] = useState(null);
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [announcements, setAnnouncements] = useState([
    { t: 'Registration is now open', b: 'Sign up before slots run out — 128 seats total.', badge: 'General', time: '2h ago' },
    { t: 'Sensor kits confirmed', b: 'Air, water and biometric starter kits will be available at check‑in.', badge: 'Logistics', time: '1d ago' },
    { t: 'Mentor list published', b: 'See the Mentors section for track‑specific mentors.', badge: 'Mentors', time: '2d ago' }
  ]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  const toggleTheme = () => setIsDark(!isDark);
  const toggleDrawer = (open) => setMobileDrawerOpen(open);
  
  const openAuth = (tab) => {
    setAuthModalOpen(true);
    setAuthTab(tab || 'login');
  };
  
  const closeAuth = () => setAuthModalOpen(false);

  const handleLogin = (email) => {
    login(email);
    closeAuth();
    showToastMessage('✅ Logged in as ' + email);
    navigate('/portal');
  };

  const handleRegister = (name, email) => {
    login(email, name);
    closeAuth();
    showToastMessage('✅ Account created! Welcome ' + name);
    navigate('/portal');
  };

  const handleLogout = () => {
    logout();
    showToastMessage('Logged out');
    navigate('/');
  };

  const updateAnnouncements = (newAnnouncement) => {
    setAnnouncements([newAnnouncement, ...announcements]);
  };

  return (
    <div className="App">
      <Navbar 
        toggleTheme={toggleTheme}
        isDark={isDark}
        openAuth={openAuth}
        toggleDrawer={toggleDrawer}
        user={user}
      />
      
      <MobileDrawer isOpen={mobileDrawerOpen} toggleDrawer={toggleDrawer} />

      <Routes>
        <Route path="/" element={
          <>
            <Home openAuth={openAuth} />
            <About />
            <Tracks />
            <Schedule />
            <Prizes />
            <Opportunities />
            <Rules />
            <FAQs />
            <Sponsors />
            <Contact showToast={showToastMessage} />
            <Footer openAuth={openAuth} />
          </>
        } />
        
        <Route path="/portal" element={
          <Portal 
            user={user}
            isAdmin={isAdmin}
            onLogout={handleLogout}
            myTeam={myTeam}
            setMyTeam={setMyTeam}
            projectSubmitted={projectSubmitted}
            setProjectSubmitted={setProjectSubmitted}
            announcements={announcements}
            onPostAnnouncement={updateAnnouncements}
            showToast={showToastMessage}
          />
        } />
      </Routes>

      <AuthModalNew 
        isOpen={authModalOpen}
        onClose={closeAuth}
        activeTab={authTab}
        onTabChange={setAuthTab}
        onLogin={handleLogin}
        onRegister={handleRegister}
        showToast={showToastMessage}
      />

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default App;
