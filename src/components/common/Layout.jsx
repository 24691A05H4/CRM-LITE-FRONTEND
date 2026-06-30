import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import LeadModal from './LeadModal';
import { useLeads } from '../../context/LeadContext';
import { LayoutDashboard, Users, TrendingUp } from 'lucide-react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const { addLead } = useLeads();

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const handleOpenLeadModal = () => setIsLeadModalOpen(true);
  const handleCloseLeadModal = () => setIsLeadModalOpen(false);

  const handleSaveLead = (leadData) => {
    addLead(leadData);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-[#090A0F] text-gray-800 dark:text-gray-100 transition-colors duration-200 overflow-x-hidden">
      {/* Sidebar navigation (hidden on mobile, visible on tablet+) */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} navItems={navItems} />

      {/* Main page frame */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header 
          onMenuClick={handleOpenSidebar} 
          onAddLeadClick={handleOpenLeadModal} 
        />
        
        {/* Scrollable View Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <BottomNav navItems={navItems} />

      {/* Global Add Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseLeadModal}
        onSave={handleSaveLead}
      />
    </div>
  );
}
