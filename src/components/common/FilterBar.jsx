import React from 'react';

const FILTER_STATUSES = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} status
 */

/**
 * @typedef {Object} FilterBarProps
 * @property {string} activeFilter - Active selected status filter.
 * @property {function(string): void} onFilterChange - Callback when filter is clicked.
 * @property {Lead[]} leads - List of leads to calculate status frequencies.
 */

/**
 * FilterBar Component
 * Renders status toggles displaying active counts per pipeline stage.
 * Includes horizontal scroll and smooth selection transition animations.
 * 
 * @param {FilterBarProps} props - Component properties.
 * @returns {React.JSX.Element}
 */
export default function FilterBar({ activeFilter, onFilterChange, leads = [] }) {
  
  /**
   * Helper to count leads for a specific status filter
   * @param {string} filter 
   * @returns {number}
   */
  const getFilterCount = (filter) => {
    if (filter === 'All') return leads.length;
    return leads.filter(l => l.status === filter).length;
  };

  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-1.5 min-w-max">
        {FILTER_STATUSES.map((status) => {
          const isActive = activeFilter === status;
          const count = getFilterCount(status);

          return (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              type="button"
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs active:scale-95'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 dark:bg-[#12131C] dark:hover:bg-[#1C1E2D] dark:border-[#1F2232] dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <span>{status}</span>
              <span className={`ml-1.5 px-1.5 py-0.5 text-[9px] rounded-full font-bold ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-500 dark:bg-[#1F2232] dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
