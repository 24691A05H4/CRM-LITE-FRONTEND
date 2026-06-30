// src/components/leads/LeadTable.jsx
// Table component rendering all leads in a responsive database-style row view.
// Columns: Name, Company, Status, Contact Details, Source, Date Added, Actions.

import React from 'react';
import { Edit2, Trash2, Mail, Phone, Tag, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * Helper — formats an ISO date string to a readable short format.
 * @param {string} isoString — ISO 8601 date string
 * @returns {string} Formatted date like "Jun 20, 2026"
 */
const formatDate = (isoString) => {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return isoString;
  }
};

/**
 * @typedef {Object} Lead
 * @property {string} id        — Unique identifier
 * @property {string} name      — Contact person's name
 * @property {string} company   — Company name
 * @property {string} email     — Email address
 * @property {string} phone     — Phone number
 * @property {string} status    — Pipeline status
 * @property {string} source    — Acquisition source
 * @property {string} createdAt — ISO creation timestamp
 */

/**
 * @typedef {Object} LeadTableProps
 * @property {Lead[]} leads              — List of leads to render
 * @property {function(Lead): void} onEdit   — Callback when Edit is clicked
 * @property {function(string): void} onDelete — Callback when Delete is clicked
 */

/**
 * LeadTable Component
 * Renders all leads in a clean, horizontally scrollable table layout.
 *
 * @param {LeadTableProps} props
 * @returns {React.JSX.Element}
 */
const LeadTable = React.memo(function LeadTable({ leads = [], onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-[#12131C] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header — Column labels */}
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Name</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Details</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body — Lead rows */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {leads.length === 0 ? (
              /* Empty state row when no leads match filters */
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                  No lead records found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors duration-200 group">
                  {/* Contact Name */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                      {lead.name}
                    </span>
                  </td>

                  {/* Company with icon */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                      <Building2 size={13} className="text-gray-400" />
                      <span>{lead.company}</span>
                    </div>
                  </td>

                  {/* Status — colored badge */}
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>

                  {/* Contact Details — email and phone stacked */}
                  <td className="px-6 py-4 space-y-1">
                    {lead.email && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Mail size={12} className="text-gray-400" />
                        <span>{lead.email}</span>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Phone size={12} className="text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </td>

                  {/* Source — acquisition channel */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <Tag size={11} className="text-gray-400" />
                      {lead.source || 'Other'}
                    </span>
                  </td>

                  {/* Date Added — formatted creation date */}
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(lead.createdAt)}
                  </td>

                  {/* Action Buttons — Edit and Delete (visible on row hover) */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(lead)}
                        className="flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md transition-colors duration-200 cursor-pointer"
                        title="Edit Lead"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md transition-colors duration-200 cursor-pointer"
                        title="Delete Lead"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default LeadTable;
