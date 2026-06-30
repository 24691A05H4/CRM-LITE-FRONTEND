import React from 'react';
import { Gauge, TrendingUp, TrendingDown } from 'lucide-react';

export default function SalesVelocityCard({ velocity }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const trendPositive = velocity >= 10000; // Mock trend logic

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 text-white flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-blue-100 text-sm font-medium mb-1">Sales Velocity</p>
          <h3 className="text-3xl font-bold">{formatCurrency(velocity)}<span className="text-lg font-medium text-blue-200">/day</span></h3>
        </div>
        <div className="p-2 bg-white/10 rounded-lg">
          <Gauge size={24} className="text-blue-100" />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className={`flex items-center gap-1 ${trendPositive ? 'text-emerald-300' : 'text-rose-300'}`}>
            {trendPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {trendPositive ? '+14.5%' : '-5.2%'}
          </span>
          <span className="text-blue-200">vs previous period</span>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-blue-100 flex justify-between">
          <span>Formula:</span>
          <span className="opacity-75">(Opp × Win% × DealSize) / Cycle</span>
        </div>
      </div>
    </div>
  );
}
