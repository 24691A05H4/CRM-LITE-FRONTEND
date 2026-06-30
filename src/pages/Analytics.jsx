import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';

export default function Analytics() {
  const { dateFilter, setDateFilter, metrics, hasData } = useAnalytics();

  // Handle completely empty system state (no leads at all)
  if (!metrics) {
    return <LoadingSkeleton />;
  }

  if (!hasData && dateFilter === 'All Time') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Analytics Dashboard
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track sales performance and growth trends.
          </p>
        </div>
        <EmptyAnalyticsState />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Analytics Dashboard
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track sales performance and growth trends.
          </p>
        </div>
        <AnalyticsFilters dateFilter={dateFilter} setDateFilter={setDateFilter} />
      </div>

      {!hasData ? (
        <div className="py-12 flex items-center justify-center bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl transition-colors duration-200">
          <p className="text-slate-500 dark:text-slate-400">No data found for the selected date range.</p>
        </div>
      ) : (
        <>
          {/* Top KPI Cards */}
          <StatsCards metrics={metrics} />

          {/* Grid 1: Distribution & Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChartCard data={metrics.statusDistribution} totalLeads={metrics.totalLeads} />
            <FunnelChartCard data={metrics.funnelData} />
          </div>

          {/* Grid 2: Trends over time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChartCard data={metrics.monthlyLeads} />
            <LineChartCard data={metrics.conversionTrend} />
          </div>

          {/* Grid 3: Revenue & Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueChartCard data={metrics.revenueTrend} />
            <LeadSourceChart data={metrics.leadSources} />
          </div>

          {/* Grid 4: Heatmap & Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityHeatmap data={metrics.heatmapData} />
            <TopPerformersCard data={metrics.topPerformers} />
          </div>

          {/* Grid 5: Predictive Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <ForecastCard forecast={metrics.forecastRevenue} />
            <SalesVelocityCard velocity={metrics.salesVelocity} />
          </div>
        </>
      )}
    </div>
  );
}
