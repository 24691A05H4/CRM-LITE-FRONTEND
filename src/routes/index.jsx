import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout wrapper component (contains Header, Sidebar, and global Modal)
import Layout from '../components/common/Layout';

// Lazy loading views for optimized performance and bundle code splitting
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Premium loading fallback spinner matching color tokens
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[45vh] w-full gap-3">
    <div className="relative flex items-center justify-center">
      {/* Pulse rings */}
      <div className="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-ping" />
      {/* Outer spinning ring */}
      <div className="w-8 h-8 border-2 border-slate-200 dark:border-[#1F2232] border-t-[#2563EB] rounded-full animate-spin" />
    </div>
    <span className="text-xs font-semibold text-slate-400 animate-pulse tracking-wide">
      Loading view...
    </span>
  </div>
);

// AppRoutes definition mapping endpoints to corresponding pages wrapped in Suspense
export default function AppRoutes() {
  return (
    <Routes>
      {/* Root layout wraps pages for shared navigation structure */}
      <Route path="/" element={<Layout />}>
        {/* Index redirects home users to dashboard views */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Main analytical dashboard */}
        <Route 
          path="dashboard" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          } 
        />
        
        {/* Customer leads directory (Table and Kanban views) */}
        <Route 
          path="leads" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Leads />
            </Suspense>
          } 
        />
        
        {/* Performance metrics & forecasts */}
        <Route 
          path="analytics" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Analytics />
            </Suspense>
          } 
        />
        
        {/* 404 Fallback routing endpoint for unknown links */}
        <Route 
          path="*" 
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } 
        />
      </Route>
    </Routes>
  );
}
