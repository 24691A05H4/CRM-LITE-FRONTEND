import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-64 bg-slate-200 dark:bg-[#1F2232] rounded mb-2"></div>
          <div className="h-4 w-96 bg-slate-200 dark:bg-[#1F2232] rounded"></div>
        </div>
        <div className="h-10 w-48 bg-slate-200 dark:bg-[#1F2232] rounded-lg"></div>
      </div>

      {/* KPI Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 dark:bg-[#1F2232] rounded-xl"></div>
        ))}
      </div>

      {/* Grid 1 Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200 dark:bg-[#1F2232] rounded-xl"></div>
        <div className="h-80 bg-slate-200 dark:bg-[#1F2232] rounded-xl"></div>
      </div>
      
      {/* Grid 2 Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200 dark:bg-[#1F2232] rounded-xl"></div>
        <div className="h-80 bg-slate-200 dark:bg-[#1F2232] rounded-xl"></div>
      </div>
    </div>
  );
}
