import React, { useState, useMemo, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import KanbanBoard from '../components/leads/KanbanBoard';
import LeadModal from '../components/common/LeadModal';
import BulkActionBar from '../components/leads/BulkActionBar';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { LayoutGrid, List, Plus, Download, Kanban } from 'lucide-react';
import toast from 'react-hot-toast';
import { leadsToCSV, downloadCSV } from '../utils/exportHelpers';

/**
 * Leads Page Component
 * Manages CRM directory listing with filters, three view modes (Table / Cards / Kanban),
 * CSV export, bulk actions, and CRUD modal updates.
 *
 * @returns {React.JSX.Element}
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead, bulkDelete, bulkUpdateStatus } = useLeads();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards' | 'kanban'

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState(new Set());

  // ── Modal Handlers ─────────────────────────────────────────
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
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.error('Lead record deleted.', {
        style: { background: '#12131C', color: '#fff', border: '1px solid #1F2232' },
      });
    }
  }, [deleteLead]);

  // ── CSV Export ─────────────────────────────────────────────
  const handleExportCSV = useCallback(() => {
    const csv = leadsToCSV(filteredLeads);
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCSV(csv, `leads-export-${timestamp}.csv`);
    toast.success(`Exported ${filteredLeads.length} leads to CSV`, {
      style: { background: '#12131C', color: '#fff', border: '1px solid #1F2232' },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Bulk Action Handlers ───────────────────────────────────
  const handleSelectAll = useCallback(() => {
    const visibleIds = filteredLeads.map((l) => l.id);
    const allSelected = visibleIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(visibleIds));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  const handleSelectOne = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleBulkDelete = useCallback(() => {
    bulkDelete([...selectedIds]);
    toast.error(`${selectedIds.size} leads deleted.`, {
      style: { background: '#12131C', color: '#fff', border: '1px solid #1F2232' },
    });
    setSelectedIds(new Set());
  }, [bulkDelete, selectedIds]);

  const handleBulkStatusChange = useCallback((status) => {
    bulkUpdateStatus([...selectedIds], status);
    toast.success(`${selectedIds.size} leads moved to "${status}"`, {
      style: { background: '#12131C', color: '#fff', border: '1px solid #1F2232' },
    });
    setSelectedIds(new Set());
  }, [bulkUpdateStatus, selectedIds]);

  // ── Derived filtered leads list ────────────────────────────
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

        <div className="flex items-center gap-2">
          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] hover:border-slate-300 dark:hover:border-slate-600 rounded-lg shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
            title="Export filtered leads to CSV"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Add Lead Button */}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-98 rounded-lg shadow-sm hover:shadow transition-colors duration-200 cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and View Toggles Bar */}
      <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* View mode toggle */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200/50 dark:border-gray-700">
          {/* Table view */}
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
          {/* Card view */}
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
          {/* Kanban view */}
          <button
            onClick={() => setViewMode('kanban')}
            className={`p-1.5 rounded-md transition-colors duration-200 cursor-pointer ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-[#12131C] text-slate-800 dark:text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title="Kanban View"
          >
            <Kanban size={16} />
          </button>
        </div>
      </div>

      {/* Clickable Filter Tabs */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={(f) => {
          setActiveFilter(f);
          setSelectedIds(new Set()); // clear selection on filter change
        }}
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
            {/* Kanban Board View */}
            {viewMode === 'kanban' && (
              <KanbanBoard leads={filteredLeads} onEdit={handleOpenEditModal} />
            )}

            {/* Desktop Table View */}
            {viewMode !== 'kanban' && (
              <div className={`${viewMode === 'table' ? 'hidden md:block' : 'hidden'}`}>
                <LeadTable
                  leads={filteredLeads}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteLead}
                  selectedIds={selectedIds}
                  onSelectAll={handleSelectAll}
                  onSelectOne={handleSelectOne}
                />
              </div>
            )}

            {/* Mobile Stack & Card Grid */}
            {viewMode !== 'kanban' && (
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
            )}
          </>
        )}
      </div>

      {/* Lead Add/Edit Modal */}
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

      {/* Bulk Action Floating Bar */}
      <BulkActionBar
        selectedCount={selectedIds.size}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
        onClearSelection={() => setSelectedIds(new Set())}
      />
    </div>
  );
}
