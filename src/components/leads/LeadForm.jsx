// src/components/leads/LeadForm.jsx
// Reusable form component for creating and editing lead records.
// Works in two modes: CREATE (no initialData) and EDIT (with initialData).
// Validates required fields and provides inline error feedback.

import React, { useState, useEffect } from 'react';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../../constants';

/**
 * @typedef {Object} LeadFormData
 * @property {string} name          — Contact person's full name (required)
 * @property {string} company       — Company or organization name (required)
 * @property {string} email         — Email address (required, validated format)
 * @property {string} phone         — Phone number (optional)
 * @property {string} status        — Pipeline status from STATUS_OPTIONS
 * @property {string} source        — Acquisition source from SOURCE_OPTIONS
 * @property {string|null} followUpDate — Optional follow-up date 'YYYY-MM-DD'
 */

/**
 * LeadForm Component
 * Renders input fields for all lead properties with validation.
 * Supports both CREATE and EDIT modes via the initialData prop.
 *
 * @param {{ initialData?: LeadFormData, onSubmit: function, onCancel: function }} props
 * @returns {React.JSX.Element}
 */
export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
    followUpDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        company: initialData.company || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        status: initialData.status || 'New',
        source: initialData.source || 'Website',
        followUpDate: initialData.followUpDate || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Contact Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company Name is required';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...formData,
      followUpDate: formData.followUpDate || null,
    });
  };

  const inputBaseClass = 'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none transition-colors duration-200 bg-white dark:bg-[#0D0E15] text-slate-800 dark:text-white';
  const inputNormalBorder = 'border-slate-200 dark:border-[#1F2232] focus:border-[#2563EB] dark:focus:border-blue-500';
  const inputErrorBorder = 'border-red-500 focus:ring-1 focus:ring-red-500';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">

      {/* Row 1: Name and Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          {errors.name && <p className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>}
        </div>

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

      {/* Row 2: Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* Row 3: Status and Source */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

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
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Follow-up Date */}
      <div>
        <label htmlFor="lead-followup" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
          Follow-up Date <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id="lead-followup"
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
          className={`${inputBaseClass} ${inputNormalBorder} cursor-pointer`}
        />
        {formData.followUpDate && (
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, followUpDate: '' }))}
            className="mt-1 text-[11px] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
          >
            Clear date
          </button>
        )}
      </div>

      {/* Action Buttons */}
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
          {initialData ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
