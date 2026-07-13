// src/App.jsx
// Root application component — sets up BrowserRouter and global toast notifications.
// Context providers (LeadProvider, ThemeProvider) are mounted in main.jsx.

import React from 'react';
import { BrowserRouter } from 'react-router-dom';   // Client-side routing engine
import { Toaster } from 'react-hot-toast';           // Global toast notification system

// Route declarations — lazy-loaded page components
import AppRoutes from './routes';

/**
 * App Component
 * Top-level component rendering the routing layer and notification system.
 * Does NOT contain context providers — those are in main.jsx for better separation.
 *
 * @returns {React.JSX.Element}
 */
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Main system routes definition layer */}
      <AppRoutes />

      {/* Global toast notification layer — positioned bottom-right */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#12131C',
            color: '#fff',
            border: '1px solid #1F2232',
          },
        }}
      />
    </BrowserRouter>
  );
}
