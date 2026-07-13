// src/services/leadService.js
// API calls for lead CRUD and analytics endpoints
import api from './api';

/**
 * Fetch leads with pagination, filters, and search.
 * GET /api/leads
 * @param {object} params - { page, limit, status, search, source, sortBy, sortOrder, dateFrom, dateTo }
 * @returns {{ data: array, pagination: object }}
 */
export const getLeads = async (params = {}) => {
  const res = await api.get('/api/leads', { params });
  return { data: res.data.data, pagination: res.data.pagination };
};

/**
 * Create a new lead.
 * POST /api/leads
 * @returns {object} created lead
 */
export const createLead = async (leadData) => {
  const res = await api.post('/api/leads', leadData);
  return res.data.data;
};

/**
 * Get a single lead by ID.
 * GET /api/leads/:id
 * @returns {object} lead
 */
export const getLeadById = async (id) => {
  const res = await api.get(`/api/leads/${id}`);
  return res.data.data;
};

/**
 * Update a lead fully.
 * PUT /api/leads/:id
 * @returns {object} updated lead
 */
export const updateLead = async (id, leadData) => {
  const res = await api.put(`/api/leads/${id}`, leadData);
  return res.data.data;
};

/**
 * Update only the status of a lead.
 * PATCH /api/leads/:id/status
 * @returns {object} updated lead
 */
export const updateLeadStatus = async (id, status) => {
  const res = await api.patch(`/api/leads/${id}/status`, { status });
  return res.data.data;
};

/**
 * Delete a lead.
 * DELETE /api/leads/:id
 */
export const deleteLead = async (id) => {
  await api.delete(`/api/leads/${id}`);
};

/**
 * Get dashboard summary stats.
 * GET /api/leads/stats/summary
 * @returns {object} stats
 */
export const getLeadStats = async () => {
  const res = await api.get('/api/leads/stats/summary');
  return res.data.data;
};

/**
 * Get monthly trend data (last 6 months).
 * GET /api/leads/stats/monthly
 * @returns {array} monthly stats
 */
export const getMonthlyStats = async () => {
  const res = await api.get('/api/leads/stats/monthly');
  return res.data.data;
};

/**
 * Search leads (autocomplete).
 * GET /api/leads/search
 * @returns {array} matching leads
 */
export const searchLeads = async (q, limit = 5) => {
  const res = await api.get('/api/leads/search', { params: { q, limit } });
  return res.data.data;
};
