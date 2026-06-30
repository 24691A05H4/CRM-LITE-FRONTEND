// src/components/common/LeadModal.jsx
// Global modal dialog for quickly adding new leads from anywhere in the app.
// Used by Layout.jsx, Dashboard.jsx, and Leads.jsx

import React from 'react';
import { X } from 'lucide-react';
import LeadForm from '../leads/LeadForm';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} LeadModalProps
 * @property {boolean} isOpen       — Whether the modal is currently visible
 * @property {function(): void} onClose — Callback to close the modal
 * @property {Object} [lead]        — Optional existing lead data for edit mode
 * @property {function(Object): void} onSave — Callback with form data on submit
 */

/**
 * LeadModal Component
 * Full-screen overlay modal acting as a wrapper for LeadForm.
 *
 * @param {LeadModalProps} props
 * @returns {React.JSX.Element|null}
 */
export default function LeadModal({ isOpen, onClose, lead, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (formData) => {
    onSave(formData);
    toast.success(lead ? 'Lead updated successfully' : 'Lead created successfully', {
      style: {
        background: '#12131C',
        color: '#fff',
        border: '1px solid #1F2232',
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      {/* Backdrop — click to close */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-950/40 dark:bg-black/60 backdrop-blur-xs transition-opacity hidden md:block"
      />

      {/* Modal Container */}
      <div className="relative w-full h-full md:h-auto md:max-w-lg bg-white dark:bg-gray-800 md:border md:border-gray-200 md:dark:border-gray-700 md:rounded-xl shadow-premium dark:shadow-premium-dark flex flex-col max-h-screen md:max-h-[90vh] overflow-hidden transition-colors duration-200 z-10 animate-in fade-in md:zoom-in-95 duration-150">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {lead ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Render Reusable LeadForm */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <LeadForm 
            initialData={lead} 
            onSubmit={handleSubmit} 
            onCancel={onClose} 
          />
        </div>
      </div>
    </div>
  );
}
