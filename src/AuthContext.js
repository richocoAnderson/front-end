// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { isAuthenticated, logout } from './services/authService'; // Impor fungsi-fungsi ini

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
