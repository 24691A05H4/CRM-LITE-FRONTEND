import React from 'react';

/**
 * StatusBadge Component
 * Renders a styled pill-shaped badge corresponding to the lead's status.
 *
 * @param {Object} props
 * @param {('New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost')} props.status - Lead status value.
 * @returns {React.JSX.Element}
 */
export default function StatusBadge({ status }) {
  let styles = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  switch (status) {
    case 'New':
      styles = 'bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/30';
      break;
    case 'Contacted':
      styles = 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/20';
      break;
    case 'Meeting Scheduled':
      styles = 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/20';
      break;
    case 'Proposal Sent':
      styles = 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/20';
      break;
    case 'Won':
      styles = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-450 border-emerald-200/50 dark:border-emerald-900/20';
      break;
    case 'Lost':
      styles = 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450 border-rose-200/50 dark:border-rose-900/20';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles} transition-colors duration-200`}>
      {status}
    </span>
  );
}
