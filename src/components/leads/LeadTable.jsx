// src/components/leads/LeadTable.jsx
// Table component rendering all leads in a responsive database-style row view.
// Columns: Checkbox, Name, Company, Status, Score, Follow-up, Contact Details, Source, Date, Actions.

import React from 'react';
import { Edit2, Trash2, Mail, Phone, Tag, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadScoreBadge from './LeadScoreBadge';
import FollowUpBadge from './FollowUpBadge';

/**
 * Helper — formats an ISO date string to a readable short format.
 * @param {string} isoString
 * @returns {string}
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
 * LeadTable Component
 * Renders all leads in a clean, horizontally scrollable table layout.
 *
 * @param {{
 *   leads: Object[],
 *   onEdit: function,
 *   onDelete: function,
 *   selectedIds: Set<string>,
 *   onSelectAll: function,
 *   onSelectOne: function(string): void,
 * }} props
 */
const LeadTable = React.memo(function LeadTable({
  leads = [],
  onEdit,
  onDelete,
  selectedIds = new Set(),
  onSelectAll,
  onSelectOne,
}) {
  const allSelected = leads.length > 0 && leads.every((l) => selectedIds.has(l.id));
  const someSelected = leads.some((l) => selectedIds.has(l.id));

  return (
    <div className="bg-white dark:bg-[#12131C] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
              {/* Select All Checkbox */}
              <th className="px-4 py-3.5 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                  aria-label="Select all leads"
                />
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Name</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Follow-up</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Details</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                  No lead records found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const isSelected = selectedIds.has(lead.id);
                return (
                  <tr
                    key={lead.id}
                    className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors duration-200 group ${isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(lead.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                        aria-label={`Select ${lead.name}`}
                      />
                    </td>

                    {/* Contact Name */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {lead.name}
                      </span>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                        <Building2 size={13} className="text-gray-400" />
                        <span>{lead.company}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status} />
                    </td>

                    {/* Score */}
                    <td className="px-6 py-4">
                      <LeadScoreBadge lead={lead} />
                    </td>

                    {/* Follow-up */}
                    <td className="px-6 py-4">
                      <FollowUpBadge lead={lead} />
                    </td>

                    {/* Contact Details */}
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

                    {/* Source */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <Tag size={11} className="text-gray-400" />
                        {lead.source || 'Other'}
                      </span>
                    </td>

                    {/* Date Added */}
                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(lead.createdAt)}
                    </td>

                    {/* Actions */}
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
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default LeadTable;
