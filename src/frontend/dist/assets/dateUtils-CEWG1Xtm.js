import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
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
  "Dec"
];
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function todayStr() {
  return formatDate(/* @__PURE__ */ new Date());
}
function parseDate(str) {
  if (!str) return new Date(Number.NaN);
  const parts = str.split("/");
  if (parts.length !== 3) return new Date(Number.NaN);
  const [day, monthStr, year] = parts;
  const monthIdx = MONTHS.findIndex(
    (m) => m.toLowerCase() === monthStr.toLowerCase()
  );
  if (monthIdx === -1) return new Date(Number.NaN);
  return new Date(Number(year), monthIdx, Number(day));
}
function formatDateForDisplay(str) {
  if (!str || str.trim() === "") return "—";
  const parts = str.split("/");
  if (parts.length !== 3) return str;
  return str;
}
function leadAgeDays(leadDateStr) {
  const parsed = parseDate(leadDateStr);
  if (Number.isNaN(parsed.getTime())) return 0;
  const now = /* @__PURE__ */ new Date();
  const diff = now.getTime() - parsed.getTime();
  return Math.floor(diff / (1e3 * 60 * 60 * 24));
}
function ageBucket(days) {
  if (days <= 9) return "0–9 Days";
  if (days <= 19) return "10–19 Days";
  if (days <= 29) return "20–29 Days";
  if (days <= 59) return "30–59 Days";
  if (days <= 90) return "60–90 Days";
  return "90+ Days";
}
function isToday(str) {
  return str === todayStr();
}
function toInputDate(date) {
  return date.toISOString().slice(0, 10);
}
function fromInputDate(input) {
  if (!input) return "";
  const [y, m, d] = input.split("-");
  const monthIdx = Number.parseInt(m, 10) - 1;
  const month = MONTHS[monthIdx] ?? "???";
  return `${d.padStart(2, "0")}/${month}/${y}`;
}
function toInputDateFromStr(str) {
  if (!str) return "";
  const parsed = parseDate(str);
  if (Number.isNaN(parsed.getTime())) return "";
  return toInputDate(parsed);
}
export {
  Phone as P,
  X,
  todayStr as a,
  ageBucket as b,
  formatDateForDisplay as c,
  toInputDate as d,
  fromInputDate as f,
  isToday as i,
  leadAgeDays as l,
  parseDate as p,
  toInputDateFromStr as t
};
