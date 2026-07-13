// src/pages/Dashboard.jsx
// Performance Dashboard page — assembles KPI stat cards, pipeline overview,
// recent leads table, quick action buttons, and due follow-ups KPI.

import React, { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import LeadModal from '../components/common/LeadModal';
import { Users, TrendingUp, Briefcase, UserCheck, CalendarClock } from 'lucide-react';

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
  const { totalLeads, activeDeals, winRate, recentNewLeads, dueFollowUps } = useMemo(() => {
    const total = leads.length;

    // Active pipeline stages (not Won or Lost)
    const active = leads.filter((l) => !['Won', 'Lost'].includes(l.status)).length;

    // Win rate: Won / (Won + Lost)
    const wonCount = leads.filter((l) => l.status === 'Won').length;
    const closedCount = leads.filter((l) => ['Won', 'Lost'].includes(l.status)).length;
    const rate = closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;

    // New leads in the last 7 days
    const recent = leads.filter((l) => {
      const created = new Date(l.createdAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return created >= weekAgo;
    }).length;

    // Due follow-ups: overdue or due today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueCount = leads.filter((l) => {
      if (!l.followUpDate) return false;
      const followUp = new Date(l.followUpDate + 'T00:00:00');
      return followUp <= today;
    }).length;

    return {
      totalLeads: total,
      activeDeals: active,
      winRate: rate,
      recentNewLeads: recent,
      dueFollowUps: dueCount,
    };
  }, [leads]);

  // Change percentages (mocked — real analytics would compare vs previous period)
  const leadsChange   = 12.4;
  const activeChange  = 4.8;
  const winRateChange = -1.5;
  const recentChange  = 8.2;
  const followUpChange = dueFollowUps > 0 ? -dueFollowUps : 0; // negative = needs attention

  // ── Modal Handlers ─────────────────────────────────────────
  const handleOpenModal  = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveNewLead = (leadData) => { addLead(leadData); };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Performance Dashboard
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Overview of your customer pipeline, conversion rates, and action shortcuts.
        </p>
      </div>

      {/* Grid of 5 KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={Users}
          change={leadsChange}
          color="blue"
        />
        <StatsCard
          title="Active Deals"
          value={activeDeals}
          icon={Briefcase}
          change={activeChange}
          color="purple"
        />
        <StatsCard
          title="Win Rate"
          value={`${winRate}%`}
          icon={TrendingUp}
          change={winRateChange}
          color="amber"
        />
        <StatsCard
          title="New This Week"
          value={recentNewLeads}
          icon={UserCheck}
          change={recentChange}
          color="green"
        />
        {/* Feature 5: Due Follow-ups KPI */}
        <StatsCard
          title="Due Follow-ups"
          value={dueFollowUps}
          icon={CalendarClock}
          change={followUpChange}
          color={dueFollowUps > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Main Grid: Left analytics + Right shortcuts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <PipelineOverview leads={leads} />
          <RecentLeads leads={leads} />
        </div>
        <div>
          <QuickActions onAddLeadClick={handleOpenModal} leads={leads} />
        </div>
      </div>

      {/* Modal for adding leads from dashboard */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNewLead}
      />
    </div>
  );
}
