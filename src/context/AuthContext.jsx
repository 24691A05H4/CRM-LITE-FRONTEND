// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, clearToken } from '../utils/authToken';
import { login as apiLogin, register as apiRegister, getProfile } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setAuthToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (e) {
          clearToken();
          setAuthToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const login = async (email, password) => {
    const { token: newToken, user: loggedUser } = await apiLogin(email, password);
    setToken(newToken);
    setAuthToken(newToken);
    setUser(loggedUser);
    toast.success('Logged in successfully');
  };

  const register = async (name, email, password) => {
    const { token: newToken, user: newUser } = await apiRegister(name, email, password);
    setToken(newToken);
    setAuthToken(newToken);
    setUser(newUser);
    toast.success('Account created successfully');
  };

  const logout = () => {
    clearToken();
    setAuthToken(null);
    setUser(null);
    toast.success('Logged out');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
