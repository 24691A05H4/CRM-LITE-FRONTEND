// src/context/LeadContext.jsx
// Centralized state management for all lead records using React Context API.
// Now fetches data from the backend API instead of localStorage.
import React, { createContext, useContext, useState, useCallback } from 'react';
import * as leadService from '../services/leadService';
import toast from 'react-hot-toast';

const LeadContext = createContext();

/**
 * Lead Object Shape (from MongoDB):
 * {
 *   _id: string,
 *   name: string,
 *   company: string,
 *   email: string,
 *   phone: string,
 *   status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost',
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other',
 *   value: number,
 *   owner: ObjectId (populated as user ref),
 *   followUpDate: string | null,
 *   createdAt: string,
 *   notes: Array<{ id, text, createdAt }>,
 * }
 */

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 0 });
  const [stats, setStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);

  /**
   * fetchLeads - Loads leads from the backend with optional filters/pagination.
   * @param {object} params - { page, limit, status, search, source, sortBy, sortOrder }
   */
  const fetchLeads = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const { data, pagination: pag } = await leadService.getLeads(params);
      setLeads(data);
      setPagination(pag);
    } catch (error) {
      // Error toast is handled by the Axios interceptor
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * fetchStats - Loads dashboard summary stats from the backend.
   */
  const fetchStats = useCallback(async () => {
    try {
      const data = await leadService.getLeadStats();
      setStats(data);
    } catch (error) {
      // handled by interceptor
    }
  }, []);

  /**
   * fetchMonthlyStats - Loads the last 6 months trend data.
   */
  const fetchMonthlyStats = useCallback(async () => {
    try {
      const data = await leadService.getMonthlyStats();
      setMonthlyStats(data);
    } catch (error) {
      // handled by interceptor
    }
  }, []);

  /**
   * addLead - Creates a new lead via the backend API.
   * @param {Object} leadData - The lead details
   */
  const addLead = async (leadData) => {
    try {
      const newLead = await leadService.createLead(leadData);
      setLeads((prev) => [newLead, ...prev]);
      toast.success('Lead created successfully');
      return newLead;
    } catch (error) {
      // handled by interceptor
    }
  };

  /**
   * updateLead - Updates an existing lead by ID via the backend.
   * @param {string} id - The ID of the lead to update
   * @param {Object} updatedFields - The fields to update
   */
  const updateLead = async (id, updatedFields) => {
    try {
      const updated = await leadService.updateLead(id, updatedFields);
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? updated : lead))
      );
      toast.success('Lead updated successfully');
      return updated;
    } catch (error) {
      // handled by interceptor
    }
  };

  /**
   * updateLeadStatus - Updates only the status of a lead.
   * @param {string} id
   * @param {string} status
   */
  const updateLeadStatus = async (id, status) => {
    try {
      const updated = await leadService.updateLeadStatus(id, status);
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? updated : lead))
      );
      toast.success('Status updated');
      return updated;
    } catch (error) {
      // handled by interceptor
    }
  };

  /**
   * deleteLead - Deletes a lead by ID via the backend.
   * @param {string} id - The ID of the lead to delete
   */
  const deleteLead = async (id) => {
    try {
      await leadService.deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      toast.success('Lead deleted');
    } catch (error) {
      // handled by interceptor
    }
  };

  /**
   * getLeadById - Retrieves a single lead by its ID from local state.
   * @param {string} id - The ID of the lead
   * @returns {Object|undefined}
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead._id === id);
  };

  /**
   * bulkDelete - Deletes multiple leads by their IDs.
   * @param {string[]} ids - Array of lead IDs to delete
   */
  const bulkDelete = async (ids) => {
    try {
      await Promise.all(ids.map((id) => leadService.deleteLead(id)));
      const idSet = new Set(ids);
      setLeads((prev) => prev.filter((lead) => !idSet.has(lead._id)));
      toast.success(`${ids.length} leads deleted`);
    } catch (error) {
      // handled by interceptor
    }
  };

  /**
   * bulkUpdateStatus - Changes the pipeline status of multiple leads.
   * @param {string[]} ids - Array of lead IDs to update
   * @param {string} status - The new status value
   */
  const bulkUpdateStatus = async (ids, status) => {
    try {
      const results = await Promise.all(
        ids.map((id) => leadService.updateLeadStatus(id, status))
      );
      const updatedMap = new Map(results.map((r) => [r._id, r]));
      setLeads((prev) =>
        prev.map((lead) => updatedMap.get(lead._id) || lead)
      );
      toast.success(`${ids.length} leads updated to ${status}`);
    } catch (error) {
      // handled by interceptor
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        isLoading,
        pagination,
        stats,
        monthlyStats,
        fetchLeads,
        fetchStats,
        fetchMonthlyStats,
        addLead,
        updateLead,
        updateLeadStatus,
        deleteLead,
        getLeadById,
        bulkDelete,
        bulkUpdateStatus,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

/**
 * useLeads - Custom hook to consume the LeadContext
 * @returns {Object} All lead CRUD methods and state
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}
