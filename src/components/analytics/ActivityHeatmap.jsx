import React from 'react';
import { Activity } from 'lucide-react';

export default function ActivityHeatmap({ data }) {
  // Simplified Heatmap mock representation
  // In a real prod environment we'd use a grid of blocks representing days
  
  // Generating a fake 12-week grid to mimic github contributions
  const weeks = 12;
  const daysInWeek = 7;
  const grid = Array.from({ length: daysInWeek }, () => Array(weeks).fill(0));

  // Randomize some blocks for visual effect based on if we have data
  const hasData = data && data.length > 0;
  
  if (hasData) {
    for (let d = 0; d < daysInWeek; d++) {
      for (let w = 0; w < weeks; w++) {
        // Randomly populate grid
        grid[d][w] = Math.floor(Math.random() * 5); 
      }
    }
  }

  const getColor = (level) => {
    switch (level) {
      case 1: return 'bg-emerald-200 dark:bg-emerald-900/40';
      case 2: return 'bg-emerald-300 dark:bg-emerald-800/60';
      case 3: return 'bg-emerald-400 dark:bg-emerald-600/80';
      case 4: return 'bg-emerald-500 dark:bg-emerald-500';
      default: return 'bg-slate-100 dark:bg-[#1A1D2D]';
    }
  };

  return (
    <div className="bg-white dark:bg-[#12131C] border border-slate-200 dark:border-[#1F2232] rounded-xl shadow-sm p-6 flex flex-col transition-colors duration-200">
      <div className="flex items-center gap-2 mb-6">
        <Activity size={18} className="text-slate-500" />
        <h3 className="font-bold text-slate-800 dark:text-white">Activity Heatmap</h3>
      </div>
      
      <div className="flex-1 overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-1.5 min-w-max">
          {grid.map((row, dIndex) => (
            <div key={dIndex} className="flex gap-1.5">
              {row.map((level, wIndex) => (
                <div 
                  key={`${dIndex}-${wIndex}`} 
                  className={`w-4 h-4 rounded-sm ${getColor(level)} transition-colors hover:ring-2 ring-slate-300 dark:ring-slate-600 cursor-pointer`}
                  title={`Activity Level: ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-[#1A1D2D]"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900/40"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-300 dark:bg-emerald-800/60"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-600/80"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-500"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
