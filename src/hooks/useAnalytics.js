import { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  getPipelineValue,
  getWonRevenue,
  getAverageSalesCycle,
  getLostRate,
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData
} from '../utils/analyticsHelpers';

export function useAnalytics() {
  const { leads } = useLeads();
  const [dateFilter, setDateFilter] = useState('All Time'); // e.g. 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'All Time'

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    if (dateFilter === 'All Time') return leads;

    const now = new Date();
    let startDate = new Date();

    if (dateFilter === 'Last 7 Days') {
      startDate.setDate(now.getDate() - 7);
    } else if (dateFilter === 'Last 30 Days') {
      startDate.setDate(now.getDate() - 30);
    } else if (dateFilter === 'Last 90 Days') {
      startDate.setDate(now.getDate() - 90);
    } else if (dateFilter === 'This Year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    return leads.filter(lead => {
      if (!lead.createdAt) return false;
      const created = new Date(lead.createdAt);
      return created >= startDate;
    });
  }, [leads, dateFilter]);

  // Compute all metrics via useMemo for optimal performance
  const metrics = useMemo(() => {
    const totalLeads = filteredLeads.length;
    const closedLeads = filteredLeads.filter(l => ['Won', 'Lost'].includes(l.status)).length;
    const wonLeads = filteredLeads.filter(l => l.status === 'Won').length;
    const conversionRate = closedLeads > 0 ? Math.round((wonLeads / closedLeads) * 100) : 0;

    return {
      totalLeads,
      conversionRate,
      pipelineValue: getPipelineValue(filteredLeads),
      wonRevenue: getWonRevenue(filteredLeads),
      averageSalesCycle: getAverageSalesCycle(filteredLeads),
      lostRate: getLostRate(filteredLeads),
      statusDistribution: getStatusDistribution(filteredLeads),
      monthlyLeads: getMonthlyLeads(filteredLeads),
      conversionTrend: getConversionByMonth(filteredLeads),
      revenueTrend: getRevenueByMonth(filteredLeads),
      leadSources: getLeadSourceStats(filteredLeads),
      funnelData: getFunnelData(filteredLeads),
      salesVelocity: getSalesVelocity(filteredLeads),
      forecastRevenue: getForecastRevenue(filteredLeads),
      topPerformers: getTopPerformers(filteredLeads),
      heatmapData: getActivityHeatmapData(filteredLeads),
    };
  }, [filteredLeads]);

  return {
    dateFilter,
    setDateFilter,
    metrics,
    hasData: filteredLeads.length > 0
  };
}
