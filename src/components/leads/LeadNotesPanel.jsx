// src/components/leads/LeadNotesPanel.jsx
// Notes and activity log panel for a single lead.
// Displays a reverse-chronological list of notes with timestamps
// and provides a textarea for adding new notes.

import React, { useState } from 'react';
import { Trash2, MessageSquarePlus, StickyNote } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

/**
 * Formats an ISO timestamp to a relative time string (e.g. "3 hours ago").
 * @param {string} isoString
 * @returns {string}
 */
const formatRelativeTime = (isoString) => {
  if (!isoString) return '';
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * LeadNotesPanel Component
 * Renders a full notes log for a specific lead with add/delete functionality.
 *
 * @param {{ lead: Object }} props
 * @returns {React.JSX.Element}
 */
export default function LeadNotesPanel({ lead }) {
  const { addNote, deleteNote } = useLeads();
  const [noteText, setNoteText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notes = lead?.notes || [];

  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed || !lead?.id) return;

    setIsSubmitting(true);
    addNote(lead.id, trimmed);
    setNoteText('');
    setTimeout(() => setIsSubmitting(false), 300);
  };

  const handleKeyDown = (e) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleAddNote();
    }
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Delete this note?')) {
      deleteNote(lead.id, noteId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Note Input Area */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          Add Note
        </label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a note about this lead... (Ctrl+Enter to save)"
          rows={3}
          className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-[#1F2232] rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-[#0D0E15] text-slate-800 dark:text-white resize-none transition-colors duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddNote}
            disabled={!noteText.trim() || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <MessageSquarePlus size={14} />
            Save Note
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-[#1F2232]" />

      {/* Notes List */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          Activity Log ({notes.length})
        </h4>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <StickyNote size={18} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No notes yet. Add the first one above.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group relative bg-slate-50 dark:bg-[#0D0E15] border border-slate-200 dark:border-[#1F2232] rounded-lg p-3"
              >
                {/* Note text */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pr-8 whitespace-pre-wrap">
                  {note.text}
                </p>

                {/* Timestamp */}
                <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-1.5 font-medium">
                  {formatRelativeTime(note.createdAt)}
                </p>

                {/* Delete button — visible on hover */}
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 rounded transition-all duration-200 cursor-pointer"
                  title="Delete note"
                  aria-label="Delete note"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
