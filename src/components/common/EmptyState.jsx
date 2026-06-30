import React from 'react';
import { Database, FilterX, HelpCircle } from 'lucide-react';

/**
 * @typedef {Object} EmptyStateProps
 * @property {number} totalLeadsCount - Size of the entire leads array before filtering.
 * @property {function(): void} onClearFilters - Callback function to reset active filters and searches.
 * @property {function(): void} [onAddLeadClick] - Callback to open the Lead modal if database is empty.
 */

/**
 * EmptyState Component
 * Displays helpful descriptions and action prompts when no database records match criteria.
 * 
 * @param {EmptyStateProps} props - Component properties.
 * @returns {React.JSX.Element}
 */
export default function EmptyState({ totalLeadsCount, onClearFilters, onAddLeadClick }) {
  const isDatabaseEmpty = totalLeadsCount === 0;

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-12 text-center transition-colors duration-200 flex flex-col items-center justify-center max-w-md mx-auto shadow-xs">
      
      {/* Icon Wrapper */}
      <div className="p-3 bg-slate-50 dark:bg-[#0D0E15] border border-slate-100 dark:border-[#1F2232] text-slate-400 dark:text-slate-500 rounded-2xl mb-4">
        {isDatabaseEmpty ? <Database size={32} /> : <FilterX size={32} />}
      </div>

      {/* Main text message */}
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
        {isDatabaseEmpty ? 'No Leads Registered Yet' : 'No Leads Found'}
      </h3>

      {/* Description helper */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
        {isDatabaseEmpty
          ? 'Get started by creating your very first customer contact to populate your dashboard pipeline.'
          : 'We couldn\'t find any leads matching your current search term or stage filter.'}
      </p>

      {/* Primary suggestion button */}
      <div className="mt-6">
        {isDatabaseEmpty ? (
          onAddLeadClick && (
            <button
              onClick={onAddLeadClick}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg shadow-sm hover:shadow transition-colors duration-200 cursor-pointer"
            >
              Add Your First Lead
            </button>
          )
        ) : (
          <button
            onClick={onClearFilters}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-[#0D0E15] dark:hover:bg-[#1C1E2D] border border-slate-200 dark:border-[#1F2232] rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

    </div>
  );
}
