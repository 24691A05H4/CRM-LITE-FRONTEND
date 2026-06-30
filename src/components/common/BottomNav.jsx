import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNav({ navItems }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full min-h-[56px] min-w-[44px] transition-colors duration-200 ${
                isActive
                  ? 'text-primary dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`
            }
          >
            <Icon size={20} className="mb-1" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
