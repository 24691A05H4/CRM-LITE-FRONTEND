// src/components/leads/LeadScoreBadge.jsx
// Displays a lead's auto-calculated quality score as a coloured pill.
// Score is computed from status, deal value, and acquisition source.

import React from 'react';
import { calculateLeadScore } from '../../utils/leadScoring';

/**
 * Color mappings for each grade letter.
 * Tailwind classes for background, text, and border.
 */
const GRADE_STYLES = {
  A: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/30',
  B: 'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/30',
  C: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/30',
  D: 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/30',
};

/**
 * LeadScoreBadge Component
 * Renders a small pill showing the numeric score and letter grade.
 *
 * @param {{ lead: Object, className?: string }} props
 */
export default function LeadScoreBadge({ lead, className = '' }) {
  const { score, grade } = calculateLeadScore(lead);
  const style = GRADE_STYLES[grade] || GRADE_STYLES.D;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${style} ${className}`}
      title={`Lead Score: ${score}/100 (Grade ${grade})`}
    >
      <span>{score}</span>
      <span className="opacity-70">·</span>
      <span>{grade}</span>
    </span>
  );
}
