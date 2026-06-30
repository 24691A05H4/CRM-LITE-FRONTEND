import React from 'react';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

export default function FunnelChartCard({ data }) {
  // Pre-calculate colors based on a gradient map or predefined colors
  const updatedData = data.map((item, index) => ({
    ...item,
    fill: ['#3B82F6', '#6366F1', '#A855F7', '#D946EF', '#22C55E'][index % 5]
  }));

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl shadow-sm p-6 flex flex-col transition-colors duration-200">
      <div className="mb-4">
        <h3 className="font-bold text-slate-800 dark:text-white">Sales Funnel Visualization</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Drop-off tracking across key pipeline stages</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip 
              contentStyle={{ backgroundColor: '#12131C', borderColor: '#1F2232', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Funnel
              dataKey="count"
              data={updatedData}
              isAnimationActive
            >
              <LabelList position="right" fill="#94A3B8" stroke="none" dataKey="stage" />
              <LabelList position="center" fill="#fff" stroke="none" dataKey="count" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
      
      {/* Conversion Metrics */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {data.map((item, i) => {
          if (i === 0) return null;
          const prev = data[i - 1].count;
          const curr = item.count;
          const conv = prev > 0 ? Math.round((curr / prev) * 100) : 0;
          return (
            <div key={item.stage} className="bg-slate-50 dark:bg-[#1A1D2D] px-2 py-1 rounded text-slate-600 dark:text-slate-300">
              <span className="font-semibold">{conv}%</span> to {item.stage}
            </div>
          );
        })}
      </div>
    </div>
  );
}
