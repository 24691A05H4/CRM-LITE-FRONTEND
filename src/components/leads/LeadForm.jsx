// src/components/leads/LeadForm.jsx
// Reusable form component for creating and editing lead records.
// Works in two modes: CREATE (no initialData) and EDIT (with initialData).
// Validates required fields and provides inline error feedback.

import React, { useState, useEffect } from 'react';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../../constants';

/**
 * @typedef {Object} LeadFormData
 * @property {string} name     — Contact person's full name (required)
 * @property {string} company  — Company or organization name (required)
 * @property {string} email    — Email address (required, validated format)
 * @property {string} phone    — Phone number (optional)
 * @property {string} status   — Pipeline status from STATUS_OPTIONS
 * @property {string} source   — Acquisition source from SOURCE_OPTIONS
 */

/**
 * @typedef {Object} LeadFormProps
 * @property {LeadFormData} [initialData] — Existing lead data for edit mode
 * @property {function(LeadFormData): void} onSubmit — Triggered on successful validation
 * @property {function(): void} onCancel — Triggered when user clicks Cancel
 */

/**
 * LeadForm Component
 * Renders input fields for all lead properties with validation.
 * Supports both CREATE and EDIT modes via the initialData prop.
 *
 * @param {LeadFormProps} props
 * @returns {React.JSX.Element}
 */
export default function LeadForm({ initialData, onSubmit, onCancel }) {
  // Form state — initialized with empty values for CREATE mode
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
  });

  // Validation error messages keyed by field name
  const [errors, setErrors] = useState({});

  // When initialData changes (edit mode), populate the form fields
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        company: initialData.company || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        status: initialData.status || 'New',
        source: initialData.source || 'Website',
      });
    }
  }, [initialData]);

  /**
   * handleChange — Updates individual form field and clears its error
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * validate — Checks all required fields and email format
   * @returns {boolean} True if form passes all validations
   */
  const validate = () => {
    const newErrors = {};

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = 'Contact Name is required';
    }
    // Company is required
    if (!formData.company.trim()) {
      newErrors.company = 'Company Name is required';
    }
    // Email is required and must match standard pattern
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * handleSubmit — Validates form and calls onSubmit with clean data
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...formData });
  };

  // Shared input base classes for consistent styling
  const inputBaseClass = 'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none transition-colors duration-200 bg-white dark:bg-[#0D0E15] text-slate-800 dark:text-white';
  const inputNormalBorder = 'border-slate-200 dark:border-[#1F2232] focus:border-[#2563EB] dark:focus:border-blue-500';
  const inputErrorBorder = 'border-red-500 focus:ring-1 focus:ring-red-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">

      {/* Row 1: Name and Company (2-column grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contact Name Input — Required */}
        <div>
          <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Contact Name *
          </label>
          <input
            id="lead-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            aria-invalid={!!errors.name}
            className={`${inputBaseClass} ${errors.name ? inputErrorBorder : inputNormalBorder}`}
          />
          {/* Inline error message for screen readers and visual feedback */}
          {errors.name && <p className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>}
        </div>

        {/* Company Input — Required */}
        <div>
          <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Company *
          </label>
          <input
            id="lead-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            aria-invalid={!!errors.company}
            className={`${inputBaseClass} ${errors.company ? inputErrorBorder : inputNormalBorder}`}
          />
          {errors.company && <p className="text-xs text-red-500 mt-1" role="alert">{errors.company}</p>}
        </div>
      </div>

      {/* Row 2: Email and Phone (2-column grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email Input — Required with format validation */}
        <div>
          <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Email Address *
          </label>
          <input
            id="lead-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            aria-invalid={!!errors.email}
            className={`${inputBaseClass} ${errors.email ? inputErrorBorder : inputNormalBorder}`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>}
        </div>

        {/* Phone Input — Optional field */}
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="555-0100"
            className={`${inputBaseClass} ${inputNormalBorder}`}
          />
        </div>
      </div>

      {/* Row 3: Status and Source (2-column grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Lead Status Dropdown */}
        <div>
          <label htmlFor="lead-status" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Lead Status
          </label>
          <select
            id="lead-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`${inputBaseClass} ${inputNormalBorder} cursor-pointer`}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Lead Source Dropdown */}
        <div>
          <label htmlFor="lead-source" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Lead Source
          </label>
          <select
            id="lead-source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className={`${inputBaseClass} ${inputNormalBorder} cursor-pointer`}
          >
            {SOURCE_OPTIONS.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons — Cancel and Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#1F2232]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1C1E2D] rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-lg shadow-sm hover:shadow transition-colors duration-200 cursor-pointer"
        >
          {/* Dynamic label: "Update Lead" in edit mode, "Create Lead" in create mode */}
          {initialData ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
