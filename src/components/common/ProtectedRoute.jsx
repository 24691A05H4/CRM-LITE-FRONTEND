// src/components/common/ProtectedRoute.jsx
// Route guard that redirects unauthenticated users to /login
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Show a loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 dark:bg-[#090A0F]">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-blue-500/30 rounded-full animate-ping" />
            <div className="w-10 h-10 border-2 border-slate-200 dark:border-[#1F2232] border-t-[#2563EB] rounded-full animate-spin" />
          </div>
          <span className="text-xs font-semibold text-slate-400 animate-pulse tracking-wide">
            Verifying session...
          </span>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render child routes
  return <Outlet />;
}
