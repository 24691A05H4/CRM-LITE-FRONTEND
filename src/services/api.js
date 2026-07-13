// src/services/api.js
import axios from 'axios';
import { getToken, clearToken } from '../utils/authToken';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add auth header
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth errors and toast notifications
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
    } else if (error.response.status === 401) {
      // Unauthorized – clear token and redirect to login
      clearToken();
      window.location.href = '/login';
      toast.error('Session expired. Please log in again.');
    } else {
      const msg = error.response.data?.message || error.message;
      toast.error(msg);
    }
    return Promise.reject(error);
  }
);

export default api;
