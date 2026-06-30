// src/components/dashboard/PipelineOverview.jsx
// Visual pipeline funnel component — shows a stacked horizontal bar
// with colored segments representing the count of leads per status stage.

import React from 'react';

// Pipeline status configuration with colors matching the lead schema statuses
const STATUS_CONFIG = {
  'New':               { label: 'New',               color: '#3B82F6', bgClass: 'bg-blue-500' },
  'Contacted':         { label: 'Contacted',         color: '#6366F1', bgClass: 'bg-indigo-500' },
  'Meeting Scheduled': { label: 'Meeting Scheduled', color: '#F59E0B', bgClass: 'bg-amber-500' },
  'Proposal Sent':     { label: 'Proposal Sent',     color: '#A855F7', bgClass: 'bg-purple-500' },
  'Won':               { label: 'Won',               color: '#10B981', bgClass: 'bg-emerald-500' },
  'Lost':              { label: 'Lost',              color: '#EF4444', bgClass: 'bg-rose-500' },
};

// Ordered list of status stages for consistent display order
const STAGES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} status
 * @property {string} source
 * @property {string} createdAt
 */

/**
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads — List of CRM leads to visualize
 */

/**
 * PipelineOverview Component
 * Renders a stacked horizontal segment bar showing how leads are
 * distributed across the pipeline stages, with a legend grid below.
 *
 * @param {PipelineOverviewProps} props
 * @returns {React.JSX.Element}
 */
export default function PipelineOverview({ leads = [] }) {
  const totalCount = leads.length;

  // Compute count and percentage for each pipeline stage
  const segments = STAGES.map((status) => {
    const count = leads.filter((l) => l.status === status).length;
    const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;

    return {
      status,
      count,
      percentage,
      ...STATUS_CONFIG[status],
    };
  });

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-6 shadow-sm transition-colors duration-200 flex flex-col h-full">
      {/* Section Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Pipeline Funnel Overview
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Distribution of {totalCount} leads across status stages
        </p>
      </div>

      {/* Visual Stacked Horizontal Bar */}
      <div className="w-full h-6 bg-slate-100 dark:bg-[#0D0E15] rounded-lg overflow-hidden flex shadow-inner border border-slate-200/50 dark:border-[#1F2232]">
        {totalCount === 0 ? (
          /* Empty state when no leads exist */
          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 dark:text-slate-500">
            No active leads in pipeline
          </div>
        ) : (
          /* Colored segments — width proportional to lead count percentage */
          segments.map((seg) => {
            if (seg.count === 0) return null;
            return (
              <div
                key={seg.status}
                style={{ width: `${seg.percentage}%` }}
                className={`${seg.bgClass} h-full transition-all duration-300 relative group cursor-pointer`}
                title={`${seg.status}: ${seg.count} leads`}
              />
            );
          })
        )}
      </div>

      {/* Segment Breakdown Legend Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {segments.map((seg) => (
          <div
            key={seg.status}
            className="flex flex-col p-2.5 rounded-lg bg-slate-50/50 dark:bg-[#0D0E15]/30 border border-slate-100 dark:border-[#1F2232]/50 hover:bg-slate-50 dark:hover:bg-[#1C1E2D]/40 transition-colors duration-200"
          >
            {/* Color dot and label */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate">
                {seg.label}
              </span>
            </div>
            {/* Lead count */}
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              {seg.count} <span className="text-[9px] font-normal text-slate-400">leads</span>
            </div>
            {/* Percentage share */}
            <div className="text-[10px] font-medium text-slate-400 mt-0.5">
              {seg.percentage.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
