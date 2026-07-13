// src/components/leads/FollowUpBadge.jsx
// Displays a follow-up date status indicator: Overdue, Due Today, or Upcoming.
// Returns null if no followUpDate is set on the lead.

import React from 'react';
import { AlertCircle, Clock, Calendar } from 'lucide-react';

/**
 * Computes the follow-up status from a date string.
 * @param {string} dateStr - Date in 'YYYY-MM-DD' format
 * @returns {'overdue' | 'today' | 'upcoming' | null}
 */
const getFollowUpStatus = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followUp = new Date(dateStr);
  followUp.setHours(0, 0, 0, 0);

  const diffDays = Math.round((followUp - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  return 'upcoming';
};

/**
 * Formats a 'YYYY-MM-DD' date string to a short readable format.
 * @param {string} dateStr
 * @returns {string}
 */
const formatShortDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};

const STATUS_CONFIG = {
  overdue: {
    label: 'Overdue',
    Icon: AlertCircle,
    classes: 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/30',
  },
  today: {
    label: 'Due Today',
    Icon: Clock,
    classes: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/30',
  },
  upcoming: {
    label: '',
    Icon: Calendar,
    classes: 'bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/30',
  },
};

/**
 * FollowUpBadge Component
 * Shows a coloured pill indicating the follow-up urgency for a lead.
 *
 * @param {{ lead: Object, className?: string }} props
 * @returns {React.JSX.Element | null}
 */
export default function FollowUpBadge({ lead, className = '' }) {
  const status = getFollowUpStatus(lead?.followUpDate);
  if (!status) return null;

  const { label, Icon, classes } = STATUS_CONFIG[status];
  const displayDate = formatShortDate(lead.followUpDate);
  const displayLabel = status === 'upcoming' ? displayDate : label;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${classes} ${className}`}
      title={`Follow-up: ${displayDate}`}
    >
      <Icon size={10} />
      <span>{displayLabel}</span>
    </span>
  );
}
