/**
 * Formats a given ISO date string or Date object into a human-readable format.
 *
 * - Accepts either a string (ISO format) or a Date object.
 * - Converts the input into a Date object if it’s a string.
 * - Uses the browser's default locale (or environment locale) for formatting.
 * - Output format includes:
 *   - Year (numeric)
 *   - Month (short, e.g. "Jan", "Feb")
 *   - Day (2-digit, e.g. "01", "25")
 *   - Hour (2-digit, 00–23 or 01–12 depending on locale)
 *   - Minute (2-digit)
 *
 * Example:
 *   formatDate("2025-09-19T14:35:00Z")
 *   → "Sep 19, 2025, 02:35 PM" (based on locale)
 */
function formatDate(iso: string | Date) {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export { formatDate };
