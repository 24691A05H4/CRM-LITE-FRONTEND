import React, { useState, useMemo, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadModal from '../components/common/LeadModal';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { LayoutGrid, List, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Leads Page Component
 * Oversees the CRM Directory listing, managing filters, layouts (Table/Cards),
 * and triggering CRUD Modal updates.
 * 
 * @returns {React.JSX.Element}
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  // Modal Dialog Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleOpenAddModal = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilter('All');
  }, []);

  const handleDeleteLead = useCallback((id) => {
    if (window.confirm('Are you sure you want to permanently delete this lead?')) {
      deleteLead(id);
      toast.error('Lead record deleted.', {
        style: {
          background: '#12131C',
          color: '#fff',
          border: '1px solid #1F2232',
        },
      });
    }
  }, [deleteLead]);

  // Derived filtered leads list as requested
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
      .filter((lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [leads, activeFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Lead Management
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor prospects, schedule meetings, filter sources, and execute actions.
          </p>
        </div>
        
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-98 rounded-lg shadow-sm hover:shadow transition-colors duration-200 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Filter and View Toggles Bar */}
      <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">
        
        {/* Search Bar Component */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* View mode toggle (hidden on mobile) */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200/50 dark:border-gray-700">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-colors duration-200 cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white dark:bg-[#12131C] text-slate-800 dark:text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title="Table View"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-md transition-colors duration-200 cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-[#12131C] text-slate-800 dark:text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title="Card View"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Clickable Filter Tabs Component */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        leads={leads}
      />

      {/* Main Content Area */}
      <div>
        {filteredLeads.length === 0 ? (
          <EmptyState
            totalLeadsCount={leads.length}
            onClearFilters={handleClearFilters}
            onAddLeadClick={handleOpenAddModal}
          />
        ) : (
          <>
            {/* Desktop Table Rendering */}
            <div className={`${viewMode === 'table' ? 'hidden md:block' : 'hidden'}`}>
              <LeadTable
                leads={filteredLeads}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteLead}
              />
            </div>

            {/* Mobile Stack & Cards Grid Rendering */}
            <div className={`${viewMode === 'cards' ? 'block' : 'md:hidden'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteLead}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        lead={selectedLead}
        onSave={(leadData) => {
          if (selectedLead) {
            updateLead(selectedLead.id, leadData);
          } else {
            addLead(leadData);
          }
        }}
      />

    </div>
  );
}
