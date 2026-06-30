// src/components/dashboard/RecentLeads.jsx
// Table component displaying the 5 most recently added leads.
// Shows: Name, Company, Status badge, and Date Added.

import React from 'react';

/**
 * getStatusBadgeStyle — returns Tailwind classes for the status badge color
 * @param {string} status — Lead pipeline status
 * @returns {string} Tailwind CSS class string
 */
const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'New':               return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/30';
    case 'Contacted':         return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-800/30';
    case 'Meeting Scheduled': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/40 dark:border-amber-800/30';
    case 'Proposal Sent':     return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/40 dark:border-purple-800/30';
    case 'Won':               return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-800/30';
    case 'Lost':              return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/40 dark:border-rose-800/30';
    default:                  return 'bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400 border border-slate-200/40';
  }
};

/**
 * formatDate — Converts ISO date string to readable short format
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
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {string} status
 * @property {string} source
 * @property {string} createdAt
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads — Full list of leads (component sorts and slices internally)
 */

/**
 * RecentLeads Component
 * Sorts leads by createdAt descending and displays the 5 most recent
 * in a clean table with Name, Company, Status, and Date Added columns.
 *
 * @param {RecentLeadsProps} props
 * @returns {React.JSX.Element}
 */
export default function RecentLeads({ leads = [] }) {
  // Sort by creation date (newest first) and take the top 5
  const recentList = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl shadow-sm overflow-hidden transition-colors duration-200">
      {/* Section Header */}
      <div className="p-5 border-b border-slate-100 dark:border-[#1F2232]">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Recently Added Leads
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Review the latest contacts registered in the system
        </p>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Column Headers: Name, Company, Status, Date Added */}
          <thead>
            <tr className="border-b border-slate-100 dark:border-[#1F2232] bg-slate-50/50 dark:bg-[#0D0E15]/30">
              <th className="px-5 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</th>
              <th className="px-5 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Date Added</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-[#1F2232]">
            {recentList.length === 0 ? (
              /* Empty state row */
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                  No leads created yet.
                </td>
              </tr>
            ) : (
              recentList.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1C1E2D]/20 transition-colors duration-200 group">
                  {/* Name and email sub-row */}
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {lead.name}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px] mt-0.5">
                        {lead.email || 'No email'}
                      </span>
                    </div>
                  </td>
                  {/* Company name */}
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {lead.company}
                    </span>
                  </td>
                  {/* Status colored badge */}
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  {/* Creation date */}
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(lead.createdAt)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
