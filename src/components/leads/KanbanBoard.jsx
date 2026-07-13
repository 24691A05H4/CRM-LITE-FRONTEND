// src/components/leads/KanbanBoard.jsx
// Kanban pipeline view — displays leads grouped into status columns.
// Cards can be moved between columns using a status dropdown in the card footer.

import React, { useMemo } from 'react';
import { Building2, Mail, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadScoreBadge from './LeadScoreBadge';
import FollowUpBadge from './FollowUpBadge';
import { STATUS_OPTIONS } from '../../constants';
import { useLeads } from '../../context/LeadContext';

/** Column header colour accents per status */
const COLUMN_ACCENT = {
  'New':                'border-t-blue-500',
  'Contacted':          'border-t-indigo-500',
  'Meeting Scheduled':  'border-t-amber-500',
  'Proposal Sent':      'border-t-purple-500',
  'Won':                'border-t-emerald-500',
  'Lost':               'border-t-rose-500',
};

const COLUMN_BADGE = {
  'New':                'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  'Contacted':          'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
  'Meeting Scheduled':  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  'Proposal Sent':      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  'Won':                'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  'Lost':               'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
};

/**
 * KanbanCard — single lead card within a column
 */
function KanbanCard({ lead, onStatusChange, onEdit }) {
  const otherStatuses = STATUS_OPTIONS.filter((s) => s !== lead.status);

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-3.5 shadow-xs hover:shadow-sm transition-all duration-200 group space-y-2.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <button
            onClick={() => onEdit(lead)}
            className="text-sm font-bold text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left leading-tight truncate block max-w-[140px] cursor-pointer"
            title={lead.name}
          >
            {lead.name}
          </button>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            <Building2 size={11} />
            <span className="truncate">{lead.company}</span>
          </div>
        </div>
        <LeadScoreBadge lead={lead} />
      </div>

      {/* Contact info */}
      {lead.email && (
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <Mail size={11} />
          <span className="truncate">{lead.email}</span>
        </div>
      )}

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5">
        {lead.value > 0 && (
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5">
            ₹{lead.value.toLocaleString('en-IN')}
          </span>
        )}
        <FollowUpBadge lead={lead} />
      </div>

      {/* Move to dropdown */}
      <div className="pt-2 border-t border-slate-100 dark:border-[#1F2232]">
        <div className="flex items-center gap-1.5">
          <ChevronRight size={11} className="text-slate-400 flex-shrink-0" />
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) onStatusChange(lead.id, e.target.value);
            }}
            className="flex-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-transparent border-none outline-none cursor-pointer appearance-none"
            title="Move to stage"
          >
            <option value="" disabled>Move to stage…</option>
            {otherStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

/**
 * KanbanBoard Component
 * Renders 6 status columns side-by-side with scrollable card stacks.
 *
 * @param {{ leads: Object[], onEdit: function }} props
 */
export default function KanbanBoard({ leads, onEdit }) {
  const { updateLead } = useLeads();

  const grouped = useMemo(() => {
    const map = {};
    STATUS_OPTIONS.forEach((s) => { map[s] = []; });
    leads.forEach((lead) => {
      if (map[lead.status] !== undefined) {
        map[lead.status].push(lead);
      }
    });
    return map;
  }, [leads]);

  const handleStatusChange = (leadId, newStatus) => {
    updateLead(leadId, { status: newStatus });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[480px]">
      {STATUS_OPTIONS.map((status) => {
        const columnLeads = grouped[status] || [];
        return (
          <div
            key={status}
            className={`flex-shrink-0 w-64 flex flex-col bg-slate-50 dark:bg-[#0D0E15] border border-slate-200 dark:border-[#1F2232] rounded-xl overflow-hidden border-t-4 ${COLUMN_ACCENT[status]}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-3.5 py-3 border-b border-slate-200 dark:border-[#1F2232]">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                {status}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${COLUMN_BADGE[status]}`}>
                {columnLeads.length}
              </span>
            </div>

            {/* Cards stack */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {columnLeads.length === 0 ? (
                <div className="flex items-center justify-center h-24 text-[11px] text-slate-400 dark:text-slate-600 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                  No leads
                </div>
              ) : (
                columnLeads.map((lead) => (
                  <KanbanCard
                    key={lead.id}
                    lead={lead}
                    onStatusChange={handleStatusChange}
                    onEdit={onEdit}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
