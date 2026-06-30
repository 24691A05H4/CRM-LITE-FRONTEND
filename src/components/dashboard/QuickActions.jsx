// src/components/dashboard/QuickActions.jsx
// Quick action buttons for common CRM tasks — Add Lead, View All, Export CSV.
// Includes a functional CSV export that downloads all lead records.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ListCollapse, Download } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} Lead
 * @property {string} id        — Unique identifier
 * @property {string} name      — Contact name
 * @property {string} company   — Company name
 * @property {string} email     — Email address
 * @property {string} phone     — Phone number
 * @property {string} status    — Pipeline status
 * @property {string} source    — Acquisition source
 * @property {string} createdAt — ISO creation timestamp
 */

/**
 * @typedef {Object} QuickActionsProps
 * @property {function} onAddLeadClick — Callback when 'Add New Lead' is clicked
 * @property {Lead[]} leads            — Current leads array for CSV export
 */

/**
 * QuickActions Component
 * Provides three action buttons: Add New Lead, View All Leads, and Export CSV.
 * The export generates a downloadable CSV file from the leads array.
 *
 * @param {QuickActionsProps} props
 * @returns {React.JSX.Element}
 */
export default function QuickActions({ onAddLeadClick, leads = [] }) {
  const navigate = useNavigate();

  /**
   * handleExportData — Generates and downloads a CSV file from the leads array.
   * CSV columns match the lead object shape: ID, Name, Company, Email, Phone, Status, Source, Created At
   */
  const handleExportData = () => {
    if (leads.length === 0) {
      toast.error('No lead records to export.', {
        style: {
          background: '#12131C',
          color: '#fff',
          border: '1px solid #1F2232',
        },
      });
      return;
    }

    try {
      // CSV header row matching the lead object shape
      const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Status', 'Source', 'Created At'];

      // Map each lead to a CSV row, escaping names and companies that may contain commas
      const rows = leads.map((l) => [
        l.id,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.company.replace(/"/g, '""')}"`,
        l.email || '',
        l.phone || '',
        l.status,
        l.source || '',
        l.createdAt,
      ]);

      // Combine header and data rows into CSV string
      const csvContent = [
        headers.join(','),
        ...rows.map((e) => e.join(',')),
      ].join('\n');

      // Create a downloadable blob and trigger browser download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Leads database exported to CSV!', {
        style: {
          background: '#12131C',
          color: '#fff',
          border: '1px solid #1F2232',
        },
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to export leads data.');
    }
  };

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-6 shadow-sm transition-colors duration-200 flex flex-col h-full">
      {/* Section Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Quick Actions
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Common tasks and data actions
        </p>
      </div>

      {/* Action Buttons Stack */}
      <div className="flex-1 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
        {/* Add New Lead — Primary action button */}
        <button
          onClick={onAddLeadClick}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-98 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Lead</span>
        </button>

        {/* View All Leads — Navigate to leads page */}
        <button
          onClick={() => navigate('/leads')}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-[#0D0E15] dark:hover:bg-[#1C1E2D] border border-slate-200 dark:border-[#1F2232] rounded-lg active:scale-98 transition-colors duration-200 cursor-pointer"
        >
          <ListCollapse size={16} />
          <span>View All Leads</span>
        </button>

        {/* Export Data — Download leads as CSV */}
        <button
          onClick={handleExportData}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-[#0D0E15] dark:hover:bg-[#1C1E2D] border border-slate-200 dark:border-[#1F2232] rounded-lg active:scale-98 transition-colors duration-200 cursor-pointer"
        >
          <Download size={16} />
          <span>Export Leads Data</span>
        </button>
      </div>
    </div>
  );
}
