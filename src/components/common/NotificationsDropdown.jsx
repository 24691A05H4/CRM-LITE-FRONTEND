import React, { useRef, useEffect } from 'react';
import { Bell, CheckCircle2, MessageSquare, Briefcase } from 'lucide-react';

export default function NotificationsDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockNotifications = [
    {
      id: 1,
      title: 'New Lead Assigned',
      desc: 'Jane Smith from Acme Corp was assigned to you.',
      time: '10 min ago',
      icon: <Briefcase className="w-4 h-4 text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10'
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      desc: 'Discovery call with John Doe in 30 minutes.',
      time: '30 min ago',
      icon: <Bell className="w-4 h-4 text-amber-500" />,
      bg: 'bg-amber-50 dark:bg-amber-500/10'
    },
    {
      id: 3,
      title: 'Deal Won!',
      desc: 'TechFlow Solutions contract was signed.',
      time: '2 hours ago',
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      bg: 'bg-green-50 dark:bg-green-500/10'
    }
  ];

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Notifications</h3>
        <button 
          className="text-[10px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          onClick={onClose}
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {mockNotifications.map((notif, index) => (
          <div 
            key={notif.id}
            className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
              index !== mockNotifications.length - 1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''
            }`}
            onClick={onClose}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
              {notif.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{notif.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                {notif.desc}
              </p>
              <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-1 block">
                {notif.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-2 border-t border-gray-100 dark:border-gray-700">
        <button 
          className="w-full py-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
          onClick={onClose}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}
