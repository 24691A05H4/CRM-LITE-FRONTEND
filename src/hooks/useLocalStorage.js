import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage.
 * Handles edge cases like JSON parsing errors and unavailable localStorage
 * (e.g., in private browsing mode or when quota is exceeded).
 *
 * @param {string} key - The key under which to store the value in localStorage.
 * @param {*} initialValue - The default value to use if no value is stored or if localStorage is unavailable.
 * @returns {[any, Function]} A stateful value and a function to update it, identical to useState.
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue (e.g., restricted access)
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync value changes to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Save state
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Handle quota exceeded or private browsing exceptions
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
