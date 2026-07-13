// src/main.jsx
// Application entry point — mounts the React root and wraps
// the entire app with global context providers.

import { StrictMode } from 'react';                   // Enables development-mode checks
import { createRoot } from 'react-dom/client';         // React 19 createRoot API
import './index.css';                                   // Global stylesheet (Tailwind + custom)
import App from './App.jsx';                            // Root application component

// Import global context providers
import { AuthProvider } from './context/AuthContext';    // JWT authentication state management
import { LeadProvider } from './context/LeadContext';   // Centralized lead state management
import { ThemeProvider } from './context/ThemeContext';  // Dark/light theme management

// Mount the React application to the DOM
// Provider order: AuthProvider (outer) > LeadProvider > ThemeProvider (inner) > App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LeadProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LeadProvider>
    </AuthProvider>
  </StrictMode>,
);
