import React from 'react';
import { Award } from 'lucide-react';

export default function TopPerformersCard({ data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl shadow-sm flex flex-col transition-colors duration-200">
      <div className="p-5 border-b border-slate-100 dark:border-[#1F2232] flex items-center gap-2">
        <Award size={18} className="text-amber-500" />
        <h3 className="font-bold text-slate-800 dark:text-white">Top Performers</h3>
      </div>
      <div className="p-5 flex-1 overflow-y-auto">
        {data.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No won deals yet</p>
        ) : (
          <div className="space-y-4">
            {data.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1A1D2D] flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{performer.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Sales Rep</p>
                  </div>
                </div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(performer.revenue)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
