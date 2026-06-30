// src/pages/Dashboard.jsx
// Performance Dashboard page — assembles KPI stat cards, pipeline overview,
// recent leads table, and quick action buttons using live data from LeadContext.

import React, { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import LeadModal from '../components/common/LeadModal';
import { Users, TrendingUp, Briefcase, UserCheck } from 'lucide-react';

/**
 * Dashboard Component
 * Main analytics overview page showing key performance indicators,
 * pipeline distribution, recent activity, and shortcut actions.
 *
 * @returns {React.JSX.Element}
 */
export default function Dashboard() {
  const { leads, addLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── KPI Calculations ──────────────────────────────────────
  const { totalLeads, activeDeals, winRate, recentNewLeads } = useMemo(() => {
    // Total count of all leads in the system
    const total = leads.length;

    // Count of leads in active pipeline stages (not Won or Lost)
    const active = leads.filter((l) => !['Won', 'Lost'].includes(l.status)).length;

    // Win rate calculation: Won / (Won + Lost)
    const wonCount = leads.filter((l) => l.status === 'Won').length;
    const closedCount = leads.filter((l) => ['Won', 'Lost'].includes(l.status)).length;
    const rate = closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;

    // Count of new leads added in the last 7 days
    const recent = leads.filter((l) => {
      const created = new Date(l.createdAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return created >= weekAgo;
    }).length;

    return { totalLeads: total, activeDeals: active, winRate: rate, recentNewLeads: recent };
  }, [leads]);

  // Change percentages (mocked — real analytics would compare vs previous period)
  const leadsChange = 12.4;
  const activeChange = 4.8;
  const winRateChange = -1.5;
  const recentChange = 8.2;

  // ── Modal Handlers ─────────────────────────────────────────
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveNewLead = (leadData) => {
    addLead(leadData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header — Title and subtitle */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Performance Dashboard
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Overview of your customer pipeline, conversion rates, and action shortcuts.
        </p>
      </div>

      {/* Grid of 4 Stats Cards — Key performance indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Total Leads in database */}
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          change={leadsChange}
          color="blue"
        />
        {/* KPI 2: Active pipeline deals (not Won/Lost) */}
        <StatsCard
          title="Active Deals"
          value={activeDeals}
          icon={Briefcase}
          change={activeChange}
          color="purple"
        />
        {/* KPI 3: Win rate percentage */}
        <StatsCard
          title="Win Rate"
          value={`${winRate}%`}
          icon={TrendingUp}
          change={winRateChange}
          color="amber"
        />
        {/* KPI 4: New leads this week */}
        <StatsCard
          title="New This Week"
          value={recentNewLeads}
          icon={UserCheck}
          change={recentChange}
          color="green"
        />
      </div>

      {/* Main Grid: Left analytics + items, Right shortcuts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Side (2/3 width): Pipeline visualization and recent leads */}
        <div className="xl:col-span-2 space-y-6">
          {/* Pipeline funnel — stacked horizontal bar by status */}
          <PipelineOverview leads={leads} />

          {/* Table of 5 most recently added leads */}
          <RecentLeads leads={leads} />
        </div>

        {/* Right Side (1/3 width): Quick action buttons */}
        <div>
          <QuickActions onAddLeadClick={handleOpenModal} leads={leads} />
        </div>
      </div>

      {/* Modal popup to add new leads from dashboard */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNewLead}
      />
    </div>
  );
}
