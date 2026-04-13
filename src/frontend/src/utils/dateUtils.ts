/**
 * Date utilities — all dates in DD/MMM/YYYY format
 * e.g. 13/Apr/2026
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Format a Date object → DD/MMM/YYYY */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/** Today's date string in DD/MMM/YYYY */
export function todayStr(): string {
  return formatDate(new Date());
}

/**
 * Parse a DD/MMM/YYYY string → Date object.
 * Returns Invalid Date if parsing fails.
 */
export function parseDate(str: string): Date {
  if (!str) return new Date(Number.NaN);
  const parts = str.split("/");
  if (parts.length !== 3) return new Date(Number.NaN);
  const [day, monthStr, year] = parts;
  const monthIdx = MONTHS.findIndex(
    (m) => m.toLowerCase() === monthStr.toLowerCase(),
  );
  if (monthIdx === -1) return new Date(Number.NaN);
  return new Date(Number(year), monthIdx, Number(day));
}

/**
 * Display a DateStr (DD/MMM/YYYY) safely.
 * Returns "—" if empty or invalid.
 */
export function formatDateForDisplay(str: string): string {
  if (!str || str.trim() === "") return "—";
  // Validate structure quickly
  const parts = str.split("/");
  if (parts.length !== 3) return str;
  return str;
}

/** Calculate lead age in days from a DD/MMM/YYYY string */
export function leadAgeDays(leadDateStr: string): number {
  const parsed = parseDate(leadDateStr);
  if (Number.isNaN(parsed.getTime())) return 0;
  const now = new Date();
  const diff = now.getTime() - parsed.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/** Age bucket label for display */
export function ageBucket(days: number): string {
  if (days <= 9) return "0–9 Days";
  if (days <= 19) return "10–19 Days";
  if (days <= 29) return "20–29 Days";
  if (days <= 59) return "30–59 Days";
  if (days <= 90) return "60–90 Days";
  return "90+ Days";
}

/** Check if two DD/MMM/YYYY strings represent the same calendar day */
export function isSameDay(a: string, b: string): boolean {
  if (!a || !b) return false;
  return a === b;
}

/** Is this date string today? */
export function isToday(str: string): boolean {
  return str === todayStr();
}

/** Format a JS Date to an <input type="date"> compatible YYYY-MM-DD */
export function toInputDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Parse an <input type="date"> YYYY-MM-DD string → DD/MMM/YYYY */
export function fromInputDate(input: string): string {
  if (!input) return "";
  const [y, m, d] = input.split("-");
  const monthIdx = Number.parseInt(m, 10) - 1;
  const month = MONTHS[monthIdx] ?? "???";
  return `${d.padStart(2, "0")}/${month}/${y}`;
}

/** Convert DD/MMM/YYYY → YYYY-MM-DD for <input type="date"> */
export function toInputDateFromStr(str: string): string {
  if (!str) return "";
  const parsed = parseDate(str);
  if (Number.isNaN(parsed.getTime())) return "";
  return toInputDate(parsed);
}
