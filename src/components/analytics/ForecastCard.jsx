import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function ForecastCard({ forecast }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl shadow-sm p-6 flex flex-col transition-colors duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-purple-500" />
        <h3 className="font-bold text-slate-800 dark:text-white">Revenue Forecast</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Predicted Revenue Next Month</p>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">
          {formatCurrency(forecast)}
        </h2>
        
        <div className="mt-6 flex items-center justify-between bg-slate-50 dark:bg-[#1A1D2D] p-3 rounded-lg border border-slate-100 dark:border-[#1F2232]">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Confidence Score</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">85% (High)</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Growth Trend</p>
            <p className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1">
              <ArrowUpRight size={14} /> +12%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
