// src/utils/authToken.js
// Helper utilities to manage JWT token in localStorage

export const getToken = () => {
  return localStorage.getItem('crm-token');
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('crm-token', token);
  } else {
    localStorage.removeItem('crm-token');
  }
};

export const clearToken = () => {
  localStorage.removeItem('crm-token');
};
