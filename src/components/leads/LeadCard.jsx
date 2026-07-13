// src/components/leads/LeadCard.jsx
// Card component displaying a single lead record in a compact visual block.
// Now includes LeadScoreBadge and FollowUpBadge.

import React from 'react';
import { Edit2, Trash2, Mail, Phone, Tag, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadScoreBadge from './LeadScoreBadge';
import FollowUpBadge from './FollowUpBadge';

/**
 * LeadCard Component
 * Renders a single lead as a card with name, company, status badge,
 * score, contact info, follow-up, source, and edit/delete action buttons.
 *
 * @param {{ lead: Object, onEdit: function, onDelete: function }} props
 */
const LeadCard = React.memo(function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-[#12131C] border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-xs hover:shadow-sm transition-colors duration-200 flex flex-col justify-between group">

      {/* Upper Section */}
      <div className="space-y-3">
        {/* Header row: Lead name + score + action icons */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {/* Lead contact name */}
            <h4 className="text-sm font-bold text-gray-800 dark:text-white leading-snug truncate">
              {lead.name}
            </h4>
            {/* Company name with icon */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Building2 size={13} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{lead.company}</span>
            </div>
          </div>

          {/* Edit and Delete action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => onEdit(lead)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md transition-colors duration-200 cursor-pointer"
              title="Edit Lead"
              aria-label={`Edit ${lead.name}`}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(lead.id)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md transition-colors duration-200 cursor-pointer"
              title="Delete Lead"
              aria-label={`Delete ${lead.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Status badge + Score badge row */}
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={lead.status} />
          <LeadScoreBadge lead={lead} />
        </div>

        {/* Divider line */}
        <div className="border-t border-gray-100 dark:border-gray-700" />

        {/* Contact Details */}
        <div className="space-y-1.5 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
          {lead.email && (
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-gray-400" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-gray-400" />
              <span>{lead.phone}</span>
            </div>
          )}
          {lead.source && (
            <div className="flex items-center gap-2">
              <Tag size={12} className="text-gray-400" />
              <span>{lead.source}</span>
            </div>
          )}
        </div>

        {/* Follow-up badge (if set) */}
        {lead.followUpDate && (
          <div>
            <FollowUpBadge lead={lead} />
          </div>
        )}
      </div>

      {/* Bottom Section — Creation date */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 uppercase font-semibold">Added</span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
    </div>
  );
});

export default LeadCard;
