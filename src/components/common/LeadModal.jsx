// src/components/common/LeadModal.jsx
// Global modal dialog for adding/editing leads.
// In edit mode, shows two tabs: Details (form) and Notes (activity log).

import React, { useState, useEffect } from 'react';
import { X, FileEdit, StickyNote } from 'lucide-react';
import LeadForm from '../leads/LeadForm';
import LeadNotesPanel from '../leads/LeadNotesPanel';
import { useLeads } from '../../context/LeadContext';
import toast from 'react-hot-toast';

/**
 * LeadModal Component
 * Full-screen overlay modal wrapping LeadForm and (in edit mode) LeadNotesPanel.
 *
 * @param {{ isOpen: boolean, onClose: function, lead?: Object, onSave: function }} props
 * @returns {React.JSX.Element|null}
 */
export default function LeadModal({ isOpen, onClose, lead, onSave }) {
  const { getLeadById } = useLeads();
  const [activeTab, setActiveTab] = useState('details');

  // Reset to details tab whenever the modal opens or the lead changes
  useEffect(() => {
    if (isOpen) setActiveTab('details');
  }, [isOpen, lead?.id]);

  if (!isOpen) return null;

  // Always get the freshest version of the lead from context (for live note updates)
  const freshLead = lead ? getLeadById(lead.id) : null;

  const isEditMode = !!lead;

  const handleSubmit = (formData) => {
    onSave(formData);
    toast.success(isEditMode ? 'Lead updated successfully' : 'Lead created successfully', {
      style: {
        background: '#12131C',
        color: '#fff',
        border: '1px solid #1F2232',
      },
    });
    onClose();
  };

  const tabClass = (tab) =>
    `flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors duration-200 cursor-pointer ${
      activeTab === tab
        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-950/40 dark:bg-black/60 backdrop-blur-xs transition-opacity hidden md:block"
      />

      {/* Modal Container */}
      <div className="relative w-full h-full md:h-auto md:max-w-lg bg-white dark:bg-gray-800 md:border md:border-gray-200 md:dark:border-gray-700 md:rounded-xl shadow-premium dark:shadow-premium-dark flex flex-col max-h-screen md:max-h-[90vh] overflow-hidden transition-colors duration-200 z-10 animate-in fade-in md:zoom-in-95 duration-150">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {isEditMode ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs — only shown in edit mode */}
        {isEditMode && (
          <div className="flex border-b border-gray-100 dark:border-gray-700 px-4 bg-white dark:bg-gray-800">
            <button className={tabClass('details')} onClick={() => setActiveTab('details')}>
              <FileEdit size={13} />
              Details
            </button>
            <button className={tabClass('notes')} onClick={() => setActiveTab('notes')}>
              <StickyNote size={13} />
              Notes
              {freshLead?.notes?.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 rounded-full">
                  {freshLead.notes.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'details' ? (
            <LeadForm
              initialData={freshLead || lead}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          ) : (
            <LeadNotesPanel lead={freshLead || lead} />
          )}
        </div>
      </div>
    </div>
  );
}
