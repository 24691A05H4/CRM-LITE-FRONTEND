import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function LineChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 flex flex-col transition-colors duration-200 group relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Monthly Conversion</h3>
          <span className="inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50">
            Last 6 Months
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lead status distribution over time</p>
      </div>

      <div className="h-64 w-full text-xs relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-gray-700/50" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              dy={10}
            />
            <YAxis 
              stroke="#94A3B8" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(55, 65, 81, 0.5)', 
                borderRadius: '12px', 
                color: '#fff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: 600 }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            />
            <Bar 
              dataKey="lost" 
              name="Lost" 
              stackId="a" 
              fill="#7DD3FC" 
              radius={[0, 0, 4, 4]} 
              animationDuration={1500}
            />
            <Bar 
              dataKey="open" 
              name="Open" 
              stackId="a" 
              fill="#3B82F6" 
              animationDuration={1500}
            />
            <Bar 
              dataKey="won" 
              name="Won" 
              stackId="a" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
