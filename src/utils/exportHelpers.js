// src/utils/exportHelpers.js
// Utility functions for exporting CRM data to various formats.

/**
 * Escapes a value for safe CSV cell inclusion.
 * Wraps in quotes if it contains commas, quotes, or newlines.
 * @param {*} value
 * @returns {string}
 */
const escapeCsvValue = (value) => {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

/**
 * Formats an ISO date string to a readable format for CSV output.
 * @param {string|null} isoString
 * @returns {string}
 */
const formatDateForCsv = (isoString) => {
  if (!isoString) return '';
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch {
    return isoString;
  }
};

/**
 * Converts an array of lead objects to a CSV string.
 * @param {Object[]} leads - Array of lead objects from LeadContext
 * @returns {string} Full CSV string with header row
 */
export const leadsToCSV = (leads) => {
  const headers = [
    'Name',
    'Company',
    'Email',
    'Phone',
    'Status',
    'Source',
    'Value (₹)',
    'Owner',
    'Score',
    'Follow-up Date',
    'Date Added',
  ];

  const rows = leads.map((lead) => [
    escapeCsvValue(lead.name),
    escapeCsvValue(lead.company),
    escapeCsvValue(lead.email),
    escapeCsvValue(lead.phone),
    escapeCsvValue(lead.status),
    escapeCsvValue(lead.source),
    escapeCsvValue(lead.value ?? ''),
    escapeCsvValue(lead.owner ?? ''),
    escapeCsvValue(lead.score ?? ''),
    escapeCsvValue(formatDateForCsv(lead.followUpDate)),
    escapeCsvValue(formatDateForCsv(lead.createdAt)),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

/**
 * Triggers a browser file download for the given CSV string.
 * @param {string} csvString - The CSV content to download
 * @param {string} [filename='leads-export.csv'] - The filename for the download
 */
export const downloadCSV = (csvString, filename = 'leads-export.csv') => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
