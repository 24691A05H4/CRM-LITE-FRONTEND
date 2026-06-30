import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function LeadSourceChart({ data }) {
  // Use tailwind indigo/purple gradient map
  const getFillColor = (index) => {
    const colors = ['#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl shadow-sm p-6 flex flex-col transition-colors duration-200">
      <div className="mb-4">
        <h3 className="font-bold text-slate-800 dark:text-white">Lead Source Analytics</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Acquisition channel performance</p>
      </div>

      <div className="h-64 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" className="dark:stroke-[#1F2232]" />
            <XAxis type="number" stroke="#94A3B8" tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="source" stroke="#94A3B8" tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
              contentStyle={{ backgroundColor: '#12131C', borderColor: '#1F2232', borderRadius: '8px', color: '#fff' }}
              formatter={(value) => [value, 'Leads']}
            />
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
              barSize={20}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getFillColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
