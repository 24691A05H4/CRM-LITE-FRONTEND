import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * @typedef {Object} SearchBarProps
 * @property {string} value - Current parent search query value.
 * @property {function(string): void} onChange - Callback triggered after 300ms debounce.
 */

/**
 * SearchBar Component
 * Renders a debounced search input with dynamic clear controls.
 * 
 * @param {SearchBarProps} props - Component properties.
 * @returns {React.JSX.Element}
 */
export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  // Sync internal state when parent state changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debouncing effect: updates parent state 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative flex-1 w-full">
      {/* Search Icon */}
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
        <Search size={16} />
      </span>

      {/* Input Field */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search by name, company, or email..."
        aria-label="Search leads"
        className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 dark:border-[#1F2232] rounded-xl focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 bg-slate-50 dark:bg-[#0D0E15] text-slate-800 dark:text-white transition-colors duration-200 shadow-xs"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={handleClear}
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-250 cursor-pointer transition-colors duration-200"
          title="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
