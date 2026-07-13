// src/components/leads/BulkActionBar.jsx
// A floating action bar that appears when leads are multi-selected.
// Provides bulk delete and bulk status change operations.

import React, { useState } from 'react';
import { Trash2, ChevronDown, X, CheckSquare } from 'lucide-react';
import { STATUS_OPTIONS } from '../../constants';

/**
 * BulkActionBar Component
 * Slides up from the bottom of the screen when 1+ leads are selected.
 * Dismissible — clearing the selection hides it.
 *
 * @param {{
 *   selectedCount: number,
 *   onBulkDelete: function,
 *   onBulkStatusChange: function(string): void,
 *   onClearSelection: function,
 * }} props
 */
export default function BulkActionBar({
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  onClearSelection,
}) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  if (selectedCount === 0) return null;

  const handleStatusSelect = (status) => {
    onBulkStatusChange(status);
    setIsStatusOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Permanently delete ${selectedCount} lead${selectedCount > 1 ? 's' : ''}?`)) {
      onBulkDelete();
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-5 py-3 bg-slate-900 dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 text-white">

        {/* Selection count */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
          <CheckSquare size={16} className="text-blue-400" />
          <span className="text-sm font-semibold whitespace-nowrap">
            {selectedCount} selected
          </span>
        </div>

        {/* Change Status dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Change Status
            <ChevronDown size={13} className={`transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} />
          </button>

          {isStatusOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsStatusOpen(false)}
              />
              <div className="absolute bottom-full mb-2 left-0 z-20 bg-white dark:bg-[#1C1E2D] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden min-w-[180px]">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap"
        >
          <Trash2 size={13} />
          Delete
        </button>

        {/* Clear selection */}
        <button
          onClick={onClearSelection}
          className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
          title="Clear selection"
          aria-label="Clear selection"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
