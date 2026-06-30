import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, ArrowRight } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { leads } = useLeads();
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Cmd+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // If closed, we can't open it from here easily unless we lift state,
          // but we can dispatch a custom event.
          window.dispatchEvent(new Event('open-global-search'));
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter leads based on query
  const filteredLeads = query.trim() === '' 
    ? [] 
    : leads.filter(lead => 
        lead.name.toLowerCase().includes(query.toLowerCase()) || 
        lead.company.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/40 dark:bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mx-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Area */}
        <div className="relative flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads by name or company..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() !== '' && filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found for "<span className="font-medium text-gray-800 dark:text-gray-200">{query}</span>"
            </div>
          ) : (
            filteredLeads.map(lead => (
              <button
                key={lead.id}
                onClick={onClose} // In a real app, this would navigate to the lead detail page
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{lead.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{lead.company}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </button>
            ))
          )}
          
          {query.trim() === '' && (
            <div className="p-6 text-center text-xs text-gray-400 dark:text-gray-500">
              Start typing to search your CRM database.
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4 text-[10px] text-gray-400 dark:text-gray-500">
          <span><kbd className="font-sans font-medium px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded mr-1">↑↓</kbd> to navigate</span>
          <span><kbd className="font-sans font-medium px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded mr-1">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
