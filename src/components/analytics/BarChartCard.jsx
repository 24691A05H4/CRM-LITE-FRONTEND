import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// Vibrant color palette inspired by the uploaded theme
const COLORS = [
  '#EA580C', // Orange
  '#BE123C', // Rose/Magenta
  '#6D28D9', // Deep Purple
  '#2563EB', // Blue
  '#0D9488', // Teal
  '#16A34A', // Green
  '#65A30D', // Light Green
  '#D97706', // Amber
  '#C2410C', // Burnt Orange
];

export default function BarChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 flex flex-col transition-colors duration-200">
      
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">Monthly Leads Trend</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total volume of generated leads over time</p>
      </div>

      <div className="h-64 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
              formatter={(value) => [value, 'Leads']}
              labelStyle={{ color: '#9CA3AF', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
            <Bar 
              dataKey="count" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList 
                dataKey="count" 
                position="top" 
                fill="#6B7280" 
                className="dark:fill-gray-400"
                fontSize={11} 
                fontWeight="bold" 
                offset={8}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
