import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email) => {
    const newUser = { 
      name: email.split('@')[0].replace(/\./g, ' ') || 'Participant', 
      email 
    };
    setUser(newUser);
    setIsAdmin(email.trim().toLowerCase() === 'admin@techsavanna.tech');
  };

  const register = (name, email) => {
    const newUser = { name, email };
    setUser(newUser);
    setIsAdmin(false);
    // You could also save to localStorage or make an API call here
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};