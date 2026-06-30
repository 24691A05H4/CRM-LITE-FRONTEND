import React from 'react';
import { Users, TrendingUp, DollarSign, Target, Activity, AlertCircle } from 'lucide-react';

export default function StatsCards({ metrics }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads,
      icon: Users,
      color: 'blue',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate}%`,
      icon: Target,
      color: 'emerald',
      trend: '+2.4%',
      trendUp: true
    },
    {
      title: 'Pipeline Value',
      value: formatCurrency(metrics.pipelineValue),
      icon: Activity,
      color: 'purple',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Won Revenue',
      value: formatCurrency(metrics.wonRevenue),
      icon: DollarSign,
      color: 'emerald',
      trend: '+15%',
      trendUp: true
    },
    {
      title: 'Avg Sales Cycle',
      value: `${metrics.averageSalesCycle} Days`,
      icon: TrendingUp,
      color: 'amber',
      trend: '-2 Days',
      trendUp: true // Lower is better for cycle
    },
    {
      title: 'Lost Rate',
      value: `${metrics.lostRate}%`,
      icon: AlertCircle,
      color: 'rose',
      trend: '-1.2%',
      trendUp: true // Lower is better for loss rate
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {card.title}
                </p>
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                  {card.value}
                </h4>
              </div>
              <div className={`p-2 rounded-lg bg-${card.color}-50 dark:bg-${card.color}-950/30 text-${card.color}-600 dark:text-${card.color}-400`}>
                <Icon size={18} />
              </div>
            </div>
            {/* Trend indicator */}
            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
              <span className={card.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                {card.trend}
              </span>
              <span className="text-slate-400 dark:text-slate-500">vs last period</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
