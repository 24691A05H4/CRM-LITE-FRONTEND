import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, X, ShieldAlert, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose, navItems }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between md:justify-center lg:justify-between h-16 px-4 lg:px-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-1.5 rounded-lg flex-shrink-0">
            <ShieldAlert size={20} className="text-[#2563EB]" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-800 dark:text-white lg:block md:hidden block">
            CRM Lite
          </span>
        </div>
        {/* Mobile Close Button */}
        {onClose && (
          <button 
            onClick={onClose} 
            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Links (Secondary Drawer actions on Mobile, Main Nav on Desktop/Tablet) */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center md:justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px] ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'
                }`
              }
              title={item.name}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="lg:block md:hidden block">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer (Theme Toggle & Profile) */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-700 space-y-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center md:justify-center lg:justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg transition-colors duration-200 min-h-[44px]"
        >
          <span className="flex items-center justify-center gap-2">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="lg:block md:hidden block">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </span>
          <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400 lg:block md:hidden block">
            {isDarkMode ? 'dark' : 'light'}
          </span>
        </button>

        {/* Profile Card — shows real authenticated user info */}
        <div className="flex items-center md:justify-center lg:justify-start gap-3 px-2 min-h-[44px]">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 border-2 border-gray-100 dark:border-gray-700">
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1 min-w-0 lg:block md:hidden block">
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
              {user?.name || 'User'}
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center md:justify-center lg:justify-start w-full gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 min-h-[44px] cursor-pointer"
          title="Logout"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span className="lg:block md:hidden block">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Sidebar (hidden on mobile, slim on md, wide on lg) */}
      <aside className="hidden md:block md:w-20 lg:w-64 h-screen sticky top-0 flex-shrink-0 z-20 transition-all duration-300">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop blur overlay */}
          <div 
            onClick={onClose} 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
          />
          {/* Sidebar Drawer */}
          <div className="relative w-64 max-w-xs h-full flex-shrink-0 flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
