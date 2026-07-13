// src/utils/leadScoring.js
// Auto-calculates a lead quality score (0–100) based on status, deal value, and acquisition source.
// Score is computed on-the-fly — not stored in state.

/**
 * Points awarded per pipeline status stage.
 * Higher stages = more qualified = more points.
 */
const STATUS_POINTS = {
  'New':                5,
  'Contacted':          15,
  'Meeting Scheduled':  30,
  'Proposal Sent':      45,
  'Won':                50,
  'Lost':               0,
};

/**
 * Points awarded per acquisition source.
 * Higher-intent sources = more points.
 */
const SOURCE_POINTS = {
  'Referral':       20,
  'LinkedIn':       15,
  'Website':        10,
  'Email Campaign': 8,
  'Cold Call':      5,
  'Other':          3,
};

/** Maximum deal value used for normalization (₹5,00,000) */
const MAX_VALUE = 500000;

/** Maximum points from deal value component */
const MAX_VALUE_POINTS = 30;

/**
 * Calculates the lead quality score (0–100).
 *
 * Components:
 *   - Status stage  → 0–50 pts
 *   - Deal value    → 0–30 pts (normalized against ₹5L cap)
 *   - Source quality→ 0–20 pts
 *
 * @param {Object} lead - The lead object
 * @returns {{ score: number, grade: string, color: string }} Score details
 */
export const calculateLeadScore = (lead) => {
  if (!lead) return { score: 0, grade: 'D', color: 'rose' };

  // Status points (0–50)
  const statusPts = STATUS_POINTS[lead.status] ?? 0;

  // Value points (0–30) — normalized against MAX_VALUE, capped at MAX_VALUE_POINTS
  const value = Math.max(0, lead.value ?? 0);
  const valuePts = Math.min(
    MAX_VALUE_POINTS,
    Math.round((value / MAX_VALUE) * MAX_VALUE_POINTS)
  );

  // Source points (0–20)
  const sourcePts = SOURCE_POINTS[lead.source] ?? 3;

  const score = Math.min(100, statusPts + valuePts + sourcePts);

  // Derive letter grade
  let grade, color;
  if (score >= 80) {
    grade = 'A'; color = 'emerald';
  } else if (score >= 60) {
    grade = 'B'; color = 'blue';
  } else if (score >= 40) {
    grade = 'C'; color = 'amber';
  } else {
    grade = 'D'; color = 'rose';
  }

  return { score, grade, color };
};
