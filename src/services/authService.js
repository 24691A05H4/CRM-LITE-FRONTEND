// src/services/authService.js
// API calls for authentication endpoints
import api from './api';

/**
 * Register a new user.
 * POST /api/auth/register
 * @returns {{ token: string, user: object }}
 */
export const register = async (name, email, password) => {
  const res = await api.post('/api/auth/register', { name, email, password });
  return res.data.data; // { token, user }
};

/**
 * Login with email and password.
 * POST /api/auth/login
 * @returns {{ token: string, user: object }}
 */
export const login = async (email, password) => {
  const res = await api.post('/api/auth/login', { email, password });
  return res.data.data; // { token, user }
};

/**
 * Get the current authenticated user's profile.
 * GET /api/auth/profile
 * @returns {object} user
 */
export const getProfile = async () => {
  const res = await api.get('/api/auth/profile');
  return res.data.data; // user object
};

/**
 * Update user profile (name or password).
 * PUT /api/auth/profile
 * @returns {object} updated user
 */
export const updateProfile = async (data) => {
  const res = await api.put('/api/auth/profile', data);
  return res.data.data;
};
