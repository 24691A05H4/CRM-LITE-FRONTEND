import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * Mappings for preset colors to guarantee Tailwind v4 utility parsing
 */
const colorMap = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-[#2563EB] dark:text-blue-400',
    badgeBg: 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    text: 'text-[#22C55E] dark:text-emerald-400',
    badgeBg: 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    text: 'text-[#F59E0B] dark:text-amber-400',
    badgeBg: 'bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
  },
  red: {
    bg: 'bg-rose-50 dark:bg-rose-950/20',
    text: 'text-[#EF4444] dark:text-rose-400',
    badgeBg: 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
  }
};

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - The name of the metric displayed.
 * @property {string|number} value - The actual quantitative value of the metric.
 * @property {React.ComponentType} icon - Lucide React Icon component instance.
 * @property {number} change - Positive or negative percentage difference vs last period.
 * @property {'blue'|'green'|'amber'|'red'|'purple'} [color='blue'] - Visual theme color indicator.
 */

/**
 * StatsCard Component
 * Displays a critical KPI with change analysis and an icon.
 * 
 * @param {StatsCardProps} props - Component properties.
 * @returns {React.JSX.Element}
 */
export default function StatsCard({ title, value, icon: Icon, change, color = 'blue' }) {
  const styles = colorMap[color] || colorMap.blue;
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-5 shadow-sm hover:shadow transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-lg ${styles.bg} ${styles.text}`}>
          <Icon size={16} />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h4 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          {value}
        </h4>
        <div className={`flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          isPositive 
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20' 
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20'
        }`}>
          {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
        vs. previous month
      </p>
    </div>
  );
}
