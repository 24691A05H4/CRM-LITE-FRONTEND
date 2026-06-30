import React from 'react';
import { Calendar } from 'lucide-react';

export default function AnalyticsFilters({ dateFilter, setDateFilter }) {
  const options = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'All Time'];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-lg px-3 py-1.5 shadow-sm transition-colors duration-200">
        <Calendar size={16} className="text-slate-400" />
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="dark:bg-[#12131C]">
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
