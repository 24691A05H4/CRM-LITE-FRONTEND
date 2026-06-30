import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function EmptyAnalyticsState({ onAddLead }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-8 text-center transition-colors duration-200">
      <div className="w-16 h-16 bg-slate-50 dark:bg-[#1A1D2D] rounded-full flex items-center justify-center mb-6">
        <BarChart3 size={32} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
        No analytics available yet
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        Add your first lead to start tracking business performance, conversion rates, and sales velocity.
      </p>
      {onAddLead && (
        <button
          onClick={onAddLead}
          className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Add Lead
        </button>
      )}
    </div>
  );
}
