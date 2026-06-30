import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Plus, Search, Bell } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import GlobalSearchModal from './GlobalSearchModal';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header({ onMenuClick, onAddLeadClick }) {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Determine page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/':
        return 'Dashboard';
      case '/leads':
        return 'Leads';
      case '/analytics':
        return 'Analytics';
      default:
        return 'CRM';
    }
  };

  // Global shortcut handler for Cmd+K
  useEffect(() => {
    const handleGlobalShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    
    // Also listen to custom event if fired from elsewhere
    const handleCustomEvent = () => setIsSearchOpen(true);

    window.addEventListener('keydown', handleGlobalShortcut);
    window.addEventListener('open-global-search', handleCustomEvent);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalShortcut);
      window.removeEventListener('open-global-search', handleCustomEvent);
    };
  }, []);

  return (
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 backdrop-blur-md transition-colors duration-200">
        {/* Left side: Hamburger (mobile) and Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
              <span>Home</span>
              <span>/</span>
              <span className="text-gray-500 dark:text-gray-400 capitalize">{getPageTitle().toLowerCase()}</span>
            </div>
            <h1 className="text-base font-semibold text-gray-800 dark:text-white mt-0.5">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right side: Global Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
            title="Search"
          >
            <Search size={14} />
            <span>Search...</span>
            <kbd className="font-mono text-[9px] bg-gray-200 dark:bg-gray-700 px-1 rounded text-gray-500 dark:text-gray-400">
              ⌘K
            </kbd>
          </button>

          {/* Dark Mode Toggle */}
          <div className="hidden sm:block border-r border-gray-200 dark:border-gray-700 pr-3 mr-1">
            <DarkModeToggle />
          </div>

          {/* Notifications Icon Button */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <NotificationsDropdown 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onAddLeadClick}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Lead</span>
          </button>
        </div>

        {/* Search Overlay */}
        <GlobalSearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      </header>
  );
}
