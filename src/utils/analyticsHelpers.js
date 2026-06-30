export const getPipelineValue = (leads) => {
  return leads
    .filter(l => !['Won', 'Lost'].includes(l.status))
    .reduce((sum, l) => sum + (l.value || 0), 0);
};

export const getWonRevenue = (leads) => {
  return leads
    .filter(l => l.status === 'Won')
    .reduce((sum, l) => sum + (l.value || 0), 0);
};

export const getAverageSalesCycle = (leads) => {
  const wonLeads = leads.filter(l => l.status === 'Won' && l.wonAt && l.createdAt);
  if (wonLeads.length === 0) return 0;
  
  const totalDays = wonLeads.reduce((sum, l) => {
    const start = new Date(l.createdAt);
    const end = new Date(l.wonAt);
    const diffTime = Math.abs(end - start);
    return sum + Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, 0);
  
  return Math.round(totalDays / wonLeads.length);
};

export const getLostRate = (leads) => {
  if (leads.length === 0) return 0;
  const lostLeads = leads.filter(l => l.status === 'Lost').length;
  return Math.round((lostLeads / leads.length) * 100);
};

export const getStatusDistribution = (leads) => {
  const distribution = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
};

export const getMonthlyLeads = (leads) => {
  const months = {};
  leads.forEach(l => {
    if (!l.createdAt) return;
    const date = new Date(l.createdAt);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    months[monthYear] = (months[monthYear] || 0) + 1;
  });
  
  return Object.entries(months)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([month, count]) => ({ month, count }));
};

export const getConversionByMonth = (leads) => {
  const stats = {};
  leads.forEach(l => {
    if (!l.createdAt) return;
    const date = new Date(l.createdAt);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!stats[monthYear]) stats[monthYear] = { total: 0, won: 0, lost: 0, open: 0 };
    stats[monthYear].total += 1;
    if (l.status === 'Won') {
      stats[monthYear].won += 1;
    } else if (l.status === 'Lost') {
      stats[monthYear].lost += 1;
    } else {
      stats[monthYear].open += 1;
    }
  });

  return Object.entries(stats)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([month, data]) => ({
      month,
      won: data.won,
      open: data.open,
      lost: data.lost,
      rate: Math.round((data.won / data.total) * 100)
    }));
};

export const getRevenueByMonth = (leads) => {
  const months = {};
  leads.forEach(l => {
    if (l.status === 'Won' && l.wonAt) {
      const date = new Date(l.wonAt);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      months[monthYear] = (months[monthYear] || 0) + (l.value || 0);
    }
  });

  return Object.entries(months)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([month, revenue]) => ({ month, revenue }));
};

export const getLeadSourceStats = (leads) => {
  const sources = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(sources)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }));
};

export const getFunnelData = (leads) => {
  const orderedStages = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won'];
  const funnel = orderedStages.map(stage => {
    return {
      stage: stage.replace(' Scheduled', '').replace(' Sent', ''),
      count: leads.filter(l => {
        if (stage === 'New') return true; // All start at new
        if (stage === 'Contacted') return l.contactedAt || l.meetingAt || l.proposalAt || l.wonAt;
        if (stage === 'Meeting Scheduled') return l.meetingAt || l.proposalAt || l.wonAt;
        if (stage === 'Proposal Sent') return l.proposalAt || l.wonAt;
        if (stage === 'Won') return l.wonAt;
        return false;
      }).length
    };
  });
  return funnel.filter(f => f.count > 0);
};

export const getSalesVelocity = (leads) => {
  const activeLeads = leads.filter(l => !['Won', 'Lost'].includes(l.status)).length;
  const wonLeads = leads.filter(l => l.status === 'Won');
  const closedLeads = leads.filter(l => ['Won', 'Lost'].includes(l.status)).length;
  
  const winRate = closedLeads > 0 ? wonLeads.length / closedLeads : 0;
  const avgDealSize = wonLeads.length > 0 
    ? wonLeads.reduce((sum, l) => sum + (l.value || 0), 0) / wonLeads.length 
    : 0;
    
  const avgSalesCycle = getAverageSalesCycle(leads);
  
  if (avgSalesCycle === 0) return 0;
  
  return Math.round((activeLeads * winRate * avgDealSize) / avgSalesCycle);
};

export const getForecastRevenue = (leads) => {
  const revenueByMonth = getRevenueByMonth(leads);
  if (revenueByMonth.length === 0) return 0;
  
  const last6Months = revenueByMonth.slice(-6);
  const avgMonthlyRev = last6Months.reduce((sum, m) => sum + m.revenue, 0) / last6Months.length;
  
  const activePipelineValue = getPipelineValue(leads);
  const closedLeads = leads.filter(l => ['Won', 'Lost'].includes(l.status)).length;
  const wonLeads = leads.filter(l => l.status === 'Won').length;
  const winRate = closedLeads > 0 ? wonLeads / closedLeads : 0;
  
  // Forecast = Historical run rate + probability weighted pipeline
  return Math.round((avgMonthlyRev * 0.4) + (activePipelineValue * winRate * 0.6));
};

export const getTopPerformers = (leads) => {
  const performers = {};
  leads.forEach(l => {
    if (l.status === 'Won' && l.owner) {
      if (!performers[l.owner]) performers[l.owner] = 0;
      performers[l.owner] += (l.value || 0);
    }
  });
  
  return Object.entries(performers)
    .sort((a, b) => b[1] - a[1])
    .map(([name, revenue]) => ({ name, revenue }));
};

export const getActivityHeatmapData = (leads) => {
  const days = {};
  leads.forEach(l => {
    if (l.createdAt) {
      const date = l.createdAt.split('T')[0];
      days[date] = (days[date] || 0) + 1;
    }
    if (l.contactedAt) {
      const date = l.contactedAt.split('T')[0];
      days[date] = (days[date] || 0) + 1;
    }
    if (l.meetingAt) {
      const date = l.meetingAt.split('T')[0];
      days[date] = (days[date] || 0) + 2; // Weight meetings higher
    }
  });
  
  return Object.entries(days).map(([date, count]) => ({ date, count }));
};
