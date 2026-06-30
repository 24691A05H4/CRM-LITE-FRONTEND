import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in duration-200">
      {/* Icon with glowing aura */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#EF4444]/20 blur-xl rounded-full" />
        <div className="relative p-4 bg-rose-50 dark:bg-rose-950/20 text-[#EF4444] rounded-2xl border border-rose-200/50 dark:border-rose-900/30">
          <ShieldAlert size={48} />
        </div>
      </div>

      {/* Heading & description */}
      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight sm:text-4xl">
        Page Not Found
      </h1>
      <p className="max-w-md mt-3 text-sm text-slate-500 dark:text-slate-400">
        We couldn't find the page you are looking for. It might have been moved, deleted, or the URL might be typed incorrectly.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white hover:bg-slate-50 dark:bg-[#12131C] dark:hover:bg-[#1C1E2D] border border-slate-200 dark:border-[#1F2232] rounded-xl transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-sm hover:shadow active:scale-98 transition-colors duration-200 cursor-pointer"
        >
          <Home size={16} />
          Return Dashboard
        </button>
      </div>
    </div>
  );
}
