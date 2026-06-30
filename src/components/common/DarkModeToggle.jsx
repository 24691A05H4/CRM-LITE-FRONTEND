import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between w-14 h-7 p-1 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <span className="sr-only">Toggle Dark Mode</span>
      {/* Sun Icon (Left side) */}
      <Sun 
        size={14} 
        className={`text-amber-500 z-10 transition-opacity duration-200 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} 
      />
      
      {/* Moon Icon (Right side) */}
      <Moon 
        size={14} 
        className={`text-blue-300 z-10 transition-opacity duration-200 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} 
      />
      
      {/* Toggle circle */}
      <div
        className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
          isDarkMode ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
