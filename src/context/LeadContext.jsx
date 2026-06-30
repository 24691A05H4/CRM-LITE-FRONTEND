// src/context/LeadContext.jsx
// Centralized state management for all lead records using React Context API.
import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

const LeadContext = createContext();

/**
 * Lead Object Shape:
 * {
 *   id: string,
 *   name: string,
 *   company: string,
 *   email: string,
 *   phone: string,
 *   status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost',
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other',
 *   createdAt: string
 * }
 */

export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * addLead - Creates a new lead with a unique ID and createdAt timestamp
   * @param {Object} leadData - The lead details (name, company, email, phone, status, source)
   */
  const addLead = (leadData) => {
    const newLead = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...leadData,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  /**
   * updateLead - Updates an existing lead by ID
   * @param {string} id - The ID of the lead to update
   * @param {Object} updatedFields - The fields to update
   */
  const updateLead = (id, updatedFields) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updatedFields } : lead))
    );
  };

  /**
   * deleteLead - Deletes a lead by ID
   * @param {string} id - The ID of the lead to delete
   */
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  /**
   * getLeadById - Retrieves a single lead by its ID
   * @param {string} id - The ID of the lead
   * @returns {Object|undefined} The lead object or undefined if not found
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * useLeads - Custom hook to consume the LeadContext
 * @returns {Object} { leads, addLead, updateLead, deleteLead, getLeadById }
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}

