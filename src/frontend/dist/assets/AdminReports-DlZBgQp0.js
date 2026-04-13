import { r as reactExports, j as jsxRuntimeExports, L as LEAD_STATUSES, S as SV_STATUSES } from "./index-BYjlLTrJ.js";
import { a as Layout } from "./Layout-D8UrcW-o.js";
import { B as Badge, d as Button } from "./button-CB_xvEci.js";
import { u as useCallHistory, b as useSalesCallHistory } from "./useCallHistory-CuOV2oBp.js";
import { u as useAllLeads } from "./useLeads-CFN0KzzB.js";
import { d as useUniqueTelecallers } from "./useProjects-DYXnZIVc.js";
import { P as Phone, l as leadAgeDays, i as isToday, a as todayStr, b as ageBucket } from "./dateUtils-CEWG1Xtm.js";
import { C as ChevronDown } from "./chevron-down-DWmfF_uF.js";
import { U as Users } from "./users-8IJymAeF.js";
import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
import { T as TrendingUp } from "./trending-up-zWv_5U-U.js";
import { F as Funnel } from "./funnel-X3E9s2sP.js";
import { C as Calendar } from "./calendar-6xntBkJe.js";
import { D as Download } from "./download-B4J0vQcp.js";
import "./smartphone-CJQPGBQn.js";
import "./refresh-cw-C5sG_0Bc.js";
import "./chart-column-DnJLxgFx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
];
const ChartPie = createLucideIcon("chart-pie", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function StatCard({
  label,
  value,
  sub,
  accent = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-4 flex flex-col gap-1 ${accent ? "bg-primary text-primary-foreground border-primary/30" : "bg-card border-border"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-2xl font-display font-bold ${accent ? "text-primary-foreground" : "text-foreground"}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs font-body ${accent ? "text-primary-foreground/70" : "text-muted-foreground"}`,
            children: label
          }
        ),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[11px] ${accent ? "text-primary-foreground/60" : "text-muted-foreground/70"}`,
            children: sub
          }
        )
      ]
    }
  );
}
function HBar({
  label,
  value,
  max,
  color = "bg-primary",
  pct
}) {
  const width = max > 0 ? Math.round(value / max * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-36 text-xs font-body text-foreground truncate flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all duration-500 ${color}`,
        style: { width: `${width}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 text-xs font-body text-right text-muted-foreground flex-shrink-0", children: pct ?? value })
  ] });
}
function SectionHeader({ title, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: title })
  ] });
}
function TableWrapper({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-sm font-body", children }) });
}
function Th({ children, right }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      className: `px-3 py-2.5 text-xs font-semibold text-muted-foreground bg-muted/60 border-b border-border whitespace-nowrap ${right ? "text-right" : "text-left"}`,
      children
    }
  );
}
function Td({
  children,
  right,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      className: `px-3 py-2 border-b border-border/50 text-foreground ${right ? "text-right" : ""} ${mono ? "font-mono text-xs" : "text-sm"}`,
      children
    }
  );
}
const TABS = [
  {
    id: "telecaller-perf",
    label: "Telecaller Performance",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 })
  },
  {
    id: "project-summary",
    label: "Project Summary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 14 })
  },
  {
    id: "source-analysis",
    label: "Source Analysis",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { size: 14 })
  },
  {
    id: "monthly-trend",
    label: "Monthly Trend",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 })
  },
  { id: "funnel", label: "Conversion Funnel", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 14 }) },
  { id: "export", label: "Export CSV", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 14 }) },
  { id: "lead-aging", label: "Lead Aging", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }) },
  { id: "today-calls", label: "Today Call History", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }) },
  {
    id: "today-call-count",
    label: "Today Call Count",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 14 })
  },
  {
    id: "date-call-count",
    label: "Date-wise Calls",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 })
  },
  { id: "sv-status", label: "SV Status Report", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 14 }) },
  { id: "lead-quality", label: "Lead Quality", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 14 }) },
  { id: "best-source", label: "Best Source", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14 }) }
];
const BAR_COLORS = [
  "bg-primary",
  "bg-accent",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-teal-500"
];
function downloadCSV(rows, filename) {
  const content = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function TelecallerPerf({ leads }) {
  const telecallers = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const tc = l.telecaller || "—";
      if (!map[tc]) map[tc] = { total: 0, svPlan: 0, svDone: 0, lost: 0 };
      map[tc].total++;
      if (l.latestStatus === "SV Plan") map[tc].svPlan++;
      if (l.latestStatus === "SV Done") map[tc].svDone++;
      if (l.latestStatus === "Lost") map[tc].lost++;
    }
    return Object.entries(map).map(([name, d]) => ({
      name,
      ...d,
      convRate: d.total > 0 ? (d.svDone / d.total * 100).toFixed(1) : "0.0"
    })).sort((a, b) => b.total - a.total);
  }, [leads]);
  const total = leads.length;
  const totalSVDone = leads.filter((l) => l.latestStatus === "SV Done").length;
  const totalLost = leads.filter((l) => l.latestStatus === "Lost").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Telecaller Performance",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Leads", value: total }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Telecallers Active", value: telecallers.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Avg SV Done Rate",
          value: `${total > 0 ? (totalSVDone / total * 100).toFixed(1) : 0}%`,
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Lost", value: totalLost })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Telecaller" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "SV Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "SV Done" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Lost" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Conv. Rate" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        telecallers.map((tc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: tc.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: tc.total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-600 font-medium", children: tc.svPlan }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 font-medium", children: tc.svDone }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: tc.lost }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: Number(tc.convRate) >= 10 ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-border text-muted-foreground",
              children: [
                tc.convRate,
                "%"
              ]
            }
          ) })
        ] }, tc.name)),
        telecallers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            className: "text-center py-6 text-muted-foreground text-sm",
            children: "No data"
          }
        ) })
      ] })
    ] })
  ] });
}
function ProjectSummary({ leads }) {
  const projects = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const p = l.projectName || "Unknown";
      if (!map[p]) map[p] = {};
      const s = l.latestStatus || "New";
      map[p][s] = (map[p][s] ?? 0) + 1;
    }
    return Object.entries(map).map(([name, counts]) => ({
      name,
      counts,
      total: Object.values(counts).reduce((a, b) => a + b, 0)
    })).sort((a, b) => b.total - a.total);
  }, [leads]);
  const maxTotal = Math.max(...projects.map((p) => p.total), 1);
  const statuses = [
    "New",
    "Not Connect",
    "Share Brochure",
    "Follow-up",
    "SV Plan",
    "SV Done",
    "Lost"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Project Summary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 16 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      HBar,
      {
        label: p.name,
        value: p.total,
        max: maxTotal,
        color: BAR_COLORS[i % BAR_COLORS.length]
      },
      p.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Total" }),
        statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: s }, s))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: p.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: p.total }) }),
          statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: p.counts[s] ?? 0 }, s))
        ] }, p.name)),
        projects.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: statuses.length + 2,
            className: "text-center py-6 text-muted-foreground text-sm",
            children: "No data"
          }
        ) })
      ] })
    ] })
  ] });
}
function SourceAnalysis({ leads }) {
  const sources = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const s = l.source || "Unknown";
      map[s] = (map[s] ?? 0) + 1;
    }
    const total = leads.length;
    return Object.entries(map).map(([name, count]) => ({
      name,
      count,
      pct: total > 0 ? (count / total * 100).toFixed(1) : "0"
    })).sort((a, b) => b.count - a.count);
  }, [leads]);
  const maxCount = Math.max(...sources.map((s) => s.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Source Analysis", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { size: 16 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: sources.slice(0, 4).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: s.name,
        value: s.count,
        sub: `${s.pct}% of total`,
        accent: i === 0
      },
      s.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      sources.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        HBar,
        {
          label: s.name,
          value: s.count,
          max: maxCount,
          color: BAR_COLORS[i % BAR_COLORS.length],
          pct: `${s.pct}%`
        },
        s.name
      )),
      sources.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-6", children: "No data" })
    ] })
  ] });
}
function MonthlyTrend({ leads }) {
  const months = reactExports.useMemo(() => {
    var _a;
    const MON = [
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
    const map = {};
    for (const l of leads) {
      const parts = (_a = l.leadDate) == null ? void 0 : _a.split("/");
      if (!parts || parts.length !== 3) continue;
      const [, mon, yr] = parts;
      const monIdx = MON.findIndex(
        (m) => m.toLowerCase() === mon.toLowerCase()
      );
      if (monIdx === -1) continue;
      const key = `${yr}-${String(monIdx + 1).padStart(2, "0")}`;
      if (!map[key]) map[key] = { total: 0, svDone: 0 };
      map[key].total++;
      if (l.latestStatus === "SV Done") map[key].svDone++;
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([key, d]) => {
      const [yr, mo] = key.split("-");
      return { label: `${MON[Number(mo) - 1]}/${yr}`, ...d };
    });
  }, [leads]);
  const maxTotal = Math.max(...months.map((m) => m.total), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Monthly Lead Trend",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4 text-xs font-body text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-2 rounded bg-primary" }),
        " Total Leads"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-2 rounded bg-emerald-500" }),
        " SV Done"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      months.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-xs font-body text-foreground flex-shrink-0", children: m.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full bg-primary transition-all duration-500",
                style: {
                  width: `${Math.round(m.total / maxTotal * 100)}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-xs text-right text-muted-foreground", children: m.total })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full bg-emerald-500 transition-all duration-500",
                style: {
                  width: `${Math.round(m.svDone / maxTotal * 100)}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-xs text-right text-emerald-600", children: m.svDone })
          ] })
        ] })
      ] }, m.label)),
      months.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-6", children: "No lead date data available" })
    ] })
  ] });
}
const FUNNEL_STAGES = [
  { key: "New", label: "New Leads", color: "bg-primary/80" },
  { key: "Not Connect", label: "Not Connect", color: "bg-rose-500/80" },
  { key: "Share Brochure", label: "Share Brochure", color: "bg-accent/80" },
  { key: "Follow-up", label: "Follow-up", color: "bg-blue-500/80" },
  { key: "SV Plan", label: "SV Plan", color: "bg-purple-500/80" },
  { key: "SV Done", label: "SV Done", color: "bg-emerald-500/80" }
];
function ConversionFunnel({ leads }) {
  const counts = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const s = l.latestStatus || "New";
      map[s] = (map[s] ?? 0) + 1;
    }
    return map;
  }, [leads]);
  const maxCount = Math.max(...FUNNEL_STAGES.map((s) => counts[s.key] ?? 0), 1);
  const firstCount = counts[FUNNEL_STAGES[0].key] ?? 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Conversion Funnel", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 16 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 items-center max-w-lg mx-auto", children: FUNNEL_STAGES.map((stage, i) => {
      const count = counts[stage.key] ?? 0;
      const pct = firstCount > 0 ? (count / firstCount * 100).toFixed(0) : "0";
      const widthPct = maxCount > 0 ? Math.max(20, Math.round(count / maxCount * 100)) : 20;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `${stage.color} text-white rounded-lg flex items-center justify-between px-4 py-2.5 text-sm font-body transition-all duration-500`,
            style: { width: `${widthPct}%`, minWidth: 200 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: stage.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: count }),
                i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/70 text-xs", children: [
                  "(",
                  pct,
                  "%)"
                ] })
              ] })
            ]
          }
        ),
        i < FUNNEL_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 h-3 bg-border" })
      ] }, stage.key);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4", children: "Percentages relative to New Leads" })
  ] });
}
function ExportCSV({
  leads,
  telecallers
}) {
  const [selStatuses, setSelStatuses] = reactExports.useState(
    new Set(LEAD_STATUSES)
  );
  const projects = reactExports.useMemo(
    () => [...new Set(leads.map((l) => l.projectName).filter(Boolean))].sort(),
    [leads]
  );
  const [selTelecallers, setSelTelecallers] = reactExports.useState(
    new Set(telecallers)
  );
  const [selProjects, setSelProjects] = reactExports.useState(
    new Set(projects)
  );
  function toggle(set, key) {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  }
  const filteredCount = reactExports.useMemo(
    () => leads.filter(
      (l) => selStatuses.has(l.latestStatus || "New") && selTelecallers.has(l.telecaller || "") && selProjects.has(l.projectName || "")
    ).length,
    [leads, selStatuses, selTelecallers, selProjects]
  );
  function handleDownload() {
    const filtered = leads.filter(
      (l) => selStatuses.has(l.latestStatus || "New") && selTelecallers.has(l.telecaller || "") && selProjects.has(l.projectName || "")
    );
    const header = [
      "Sr.No",
      "Lead Date",
      "First Name",
      "Last Name",
      "Mobile",
      "Project",
      "Source",
      "Telecaller",
      "Latest Status",
      "Status Date",
      "Budget",
      "Requirement",
      "Assigned Sales",
      "SV Status",
      "Remarks1",
      "Remarks2"
    ];
    const rows = filtered.map((l) => [
      String(l.srNo),
      l.leadDate,
      l.firstName,
      l.lastName,
      l.mobileNo,
      l.projectName,
      l.source,
      l.telecaller,
      l.latestStatus,
      l.statusDate,
      l.budget,
      l.requirement,
      l.assignedSales,
      l.svStatus,
      l.remarks1,
      l.remarks2
    ]);
    downloadCSV([header, ...rows], `PropFlow_Leads_${todayStr()}.csv`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Export CSV", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 16 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-5 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Lead Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-primary hover:underline",
              onClick: () => setSelStatuses(
                selStatuses.size === LEAD_STATUSES.length ? /* @__PURE__ */ new Set() : new Set(LEAD_STATUSES)
              ),
              children: selStatuses.size === LEAD_STATUSES.length ? "Deselect all" : "Select all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: LEAD_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-2 cursor-pointer text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: selStatuses.has(s),
                  onChange: () => setSelStatuses(toggle(selStatuses, s)),
                  className: "accent-primary",
                  "data-ocid": `export-status-${s.toLowerCase().replace(/\s+/g, "-")}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: s })
            ]
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Telecallers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-primary hover:underline",
              onClick: () => setSelTelecallers(
                selTelecallers.size === telecallers.length ? /* @__PURE__ */ new Set() : new Set(telecallers)
              ),
              children: selTelecallers.size === telecallers.length ? "Deselect all" : "Select all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-h-52 overflow-y-auto", children: [
          telecallers.map((tc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selTelecallers.has(tc),
                    onChange: () => setSelTelecallers(toggle(selTelecallers, tc)),
                    className: "accent-primary",
                    "data-ocid": `export-tc-${tc.toLowerCase().replace(/\s+/g, "-")}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: tc })
              ]
            },
            tc
          )),
          telecallers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No telecallers found" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Projects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-primary hover:underline",
              onClick: () => setSelProjects(
                selProjects.size === projects.length ? /* @__PURE__ */ new Set() : new Set(projects)
              ),
              children: selProjects.size === projects.length ? "Deselect all" : "Select all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-h-52 overflow-y-auto", children: [
          projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selProjects.has(p),
                    onChange: () => setSelProjects(toggle(selProjects, p)),
                    className: "accent-primary",
                    "data-ocid": `export-proj-${p.toLowerCase().replace(/\s+/g, "-")}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: p })
              ]
            },
            p
          )),
          projects.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No projects found" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleDownload,
          className: "flex items-center gap-2",
          "data-ocid": "btn-download-csv",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
            "Download CSV"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        filteredCount,
        " leads selected"
      ] })
    ] })
  ] });
}
const AGE_BUCKETS = [
  "0–9 Days",
  "10–19 Days",
  "20–29 Days",
  "30–59 Days",
  "60–90 Days",
  "90+ Days"
];
function LeadAgingReport({ leads }) {
  const data = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      if (l.latestStatus === "Lost" || l.latestStatus === "Qualified1")
        continue;
      const tc = l.telecaller || "—";
      const age = leadAgeDays(l.leadDate);
      const bucket = ageBucket(age);
      if (!map[tc]) map[tc] = {};
      map[tc][bucket] = (map[tc][bucket] ?? 0) + 1;
    }
    return Object.entries(map).map(([name, buckets]) => ({
      name,
      buckets,
      total: Object.values(buckets).reduce((a, b) => a + b, 0)
    })).sort((a, b) => b.total - a.total);
  }, [leads]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Telecaller-wise Lead Aging",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Excludes Lost & Qualified1 leads" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Telecaller" }),
        AGE_BUCKETS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: b }, b)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Total" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        data.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: row.name }) }),
          AGE_BUCKETS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: row.buckets[b] ? "text-foreground" : "text-muted-foreground/40",
              children: row.buckets[b] ?? 0
            }
          ) }, b)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: row.total }) })
        ] }, row.name)),
        data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: AGE_BUCKETS.length + 2,
            className: "text-center py-6 text-muted-foreground text-sm",
            children: "No data"
          }
        ) })
      ] })
    ] })
  ] });
}
function TodayCallHistory({
  calls,
  salesCalls
}) {
  const todayCalls = reactExports.useMemo(
    () => calls.filter((c) => isToday(c.date)),
    [calls]
  );
  const todaySalesCalls = reactExports.useMemo(
    () => salesCalls.filter((c) => isToday(c.date)),
    [salesCalls]
  );
  function exportToday() {
    const header = [
      "Date",
      "Name",
      "Mobile",
      "Status",
      "Remark",
      "Agent",
      "Project",
      "Type"
    ];
    const rows = [
      ...todayCalls.map((c) => [
        c.date,
        c.name,
        c.mobile,
        c.status,
        c.remark,
        c.telecaller,
        c.projectName,
        "Telecaller"
      ]),
      ...todaySalesCalls.map((c) => [
        c.date,
        c.name,
        c.mobile,
        c.status,
        c.remark,
        c.salesPerson,
        c.projectName,
        "Sales"
      ])
    ];
    downloadCSV([header, ...rows], `PropFlow_TodayCalls_${todayStr()}.csv`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Today Call History", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Telecaller Calls", value: todayCalls.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Sales Calls", value: todaySalesCalls.length, accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto self-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: exportToday,
          className: "flex items-center gap-2",
          "data-ocid": "btn-export-today",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
            " Export Today"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-2", children: [
      "Telecaller Calls (",
      todayCalls.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Mobile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Remark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Telecaller" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Project" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: todayCalls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 7,
          className: "text-center py-6 text-muted-foreground text-sm",
          children: "No telecaller calls today"
        }
      ) }) : todayCalls.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: c.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: c.mobile }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: c.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.remark }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.telecaller }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.projectName })
          ]
        },
        `${c.mobile}-${c.date}-${c.telecaller}`
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mt-6 mb-2", children: [
      "Sales Calls (",
      todaySalesCalls.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Mobile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Remark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Sales Person" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Project" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: todaySalesCalls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 7,
          className: "text-center py-6 text-muted-foreground text-sm",
          children: "No sales calls today"
        }
      ) }) : todaySalesCalls.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: c.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: c.mobile }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: c.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.remark }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.salesPerson }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: c.projectName })
          ]
        },
        `${c.mobile}-${c.date}-${c.salesPerson}`
      )) })
    ] })
  ] });
}
function TodayCallCount({ calls }) {
  const data = reactExports.useMemo(() => {
    const today = todayStr();
    const map = {};
    for (const c of calls) {
      if (c.date === today) {
        const tc = c.telecaller || "—";
        map[tc] = (map[tc] ?? 0) + 1;
      }
    }
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [calls]);
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Today Call Count per Telecaller",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6", children: [
      data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: d.name,
          value: d.count,
          sub: "calls today",
          accent: i === 0
        },
        d.name
      )),
      data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm col-span-4 py-4 text-center", children: "No calls logged today" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      HBar,
      {
        label: d.name,
        value: d.count,
        max: maxCount,
        color: BAR_COLORS[i % BAR_COLORS.length]
      },
      d.name
    )) })
  ] });
}
function DateCallCount({
  calls,
  telecallers
}) {
  const [selTc, setSelTc] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    const relevant = selTc ? calls.filter((c) => c.telecaller === selTc) : calls;
    const map = {};
    for (const c of relevant) {
      const d = c.date || "—";
      map[d] = (map[d] ?? 0) + 1;
    }
    return Object.entries(map).map(([date, count]) => ({ date, count })).sort((a, b) => b.date.localeCompare(a.date));
  }, [calls, selTc]);
  const maxCount = Math.max(...filtered.map((d) => d.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Date-wise Call Count",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "select-tc-date-count",
          className: "text-sm font-body text-muted-foreground",
          children: "Telecaller:"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "select-tc-date-count",
            value: selTc,
            onChange: (e) => setSelTc(e.target.value),
            className: "appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-input bg-background text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "select-tc-date-count",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Telecallers" }),
              telecallers.map((tc) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: tc, children: tc }, tc))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronDown,
          {
            size: 14,
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(HBar, { label: d.date, value: d.count, max: maxCount }, d.date)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-6", children: "No call history found" })
    ] })
  ] });
}
function SVStatusReport({ leads }) {
  const [expanded, setExpanded] = reactExports.useState(null);
  const statusGroups = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      if (!l.svStatus) continue;
      if (!map[l.svStatus]) map[l.svStatus] = [];
      map[l.svStatus].push(l);
    }
    return SV_STATUSES.map((s) => ({ status: s, leads: map[s] ?? [] }));
  }, [leads]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Site Visit Status Report",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6", children: statusGroups.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: g.status,
        value: g.leads.length,
        accent: i === 0
      },
      g.status
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: statusGroups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-border rounded-xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors",
              onClick: () => setExpanded(expanded === g.status ? null : g.status),
              "data-ocid": `sv-group-${g.status.toLowerCase().replace(/\s+/g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: g.leads.length }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: g.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 16,
                    className: `text-muted-foreground transition-transform ${expanded === g.status ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          expanded === g.status && g.leads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Sr.No" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Mobile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Telecaller" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Sales" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "SV Next Followup" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "SV Remark" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: g.leads.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: String(l.srNo) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Td, { children: [
                l.firstName,
                " ",
                l.lastName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: l.mobileNo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: l.projectName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: l.telecaller }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: l.assignedSales }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { mono: true, children: l.svNextFollowup || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: l.svRemark || "—" })
            ] }, String(l.id))) })
          ] }),
          expanded === g.status && g.leads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center py-4 text-muted-foreground text-sm", children: "No leads in this status" })
        ]
      },
      g.status
    )) })
  ] });
}
function LeadQuality({ leads }) {
  const budgetCounts = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const b = l.budget || "Not Set";
      map[b] = (map[b] ?? 0) + 1;
    }
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [leads]);
  const reqCounts = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const r = l.requirement || "Not Set";
      map[r] = (map[r] ?? 0) + 1;
    }
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, [leads]);
  const maxBudget = Math.max(...budgetCounts.map((b) => b.count), 1);
  const maxReq = Math.max(...reqCounts.map((r) => r.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Lead Quality Report", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 16 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-4", children: "Budget Distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          budgetCounts.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            HBar,
            {
              label: b.name,
              value: b.count,
              max: maxBudget,
              color: BAR_COLORS[i % BAR_COLORS.length]
            },
            b.name
          )),
          budgetCounts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-4", children: "No budget data" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-4", children: "Requirement Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: reqCounts.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          HBar,
          {
            label: r.name,
            value: r.count,
            max: maxReq,
            color: BAR_COLORS[i % BAR_COLORS.length]
          },
          r.name
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: reqCounts.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/50 rounded-lg p-2.5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-display font-bold text-foreground", children: r.count }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.name })
            ]
          },
          r.name
        )) })
      ] })
    ] })
  ] });
}
function BestSource({ leads }) {
  const data = reactExports.useMemo(() => {
    const map = {};
    for (const l of leads) {
      const s = l.source || "Unknown";
      if (!map[s]) map[s] = { total: 0, svDone: 0 };
      map[s].total++;
      if (l.latestStatus === "SV Done") map[s].svDone++;
    }
    return Object.entries(map).map(([name, d]) => ({
      name,
      ...d,
      convRate: d.total > 0 ? (d.svDone / d.total * 100).toFixed(1) : "0.0"
    })).sort((a, b) => Number(b.convRate) - Number(a.convRate));
  }, [leads]);
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Best Performing Source",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6", children: data.slice(0, 3).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `rounded-xl border p-4 ${i === 0 ? "bg-accent/10 border-accent/30" : "bg-card border-border"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground", children: [
              "#",
              i + 1,
              " Source"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: i === 0 ? "border-accent/40 text-accent-foreground" : "",
                children: [
                  s.convRate,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
            s.total,
            " leads · ",
            s.svDone,
            " SV Done"
          ] })
        ]
      },
      s.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableWrapper, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Total Leads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "SV Done" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { right: true, children: "Conversion Rate" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        data.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: s.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 bg-muted rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full bg-primary",
                style: {
                  width: `${Math.round(s.total / maxTotal * 100)}%`
                }
              }
            ) }),
            s.total
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 font-medium", children: s.svDone }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { right: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: Number(s.convRate) >= 15 ? "border-emerald-300 text-emerald-700 bg-emerald-50" : Number(s.convRate) >= 5 ? "border-amber-300 text-amber-700 bg-amber-50" : "border-border text-muted-foreground",
              children: [
                s.convRate,
                "%"
              ]
            }
          ) })
        ] }, s.name)),
        data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 5,
            className: "text-center py-6 text-muted-foreground text-sm",
            children: "No data"
          }
        ) })
      ] })
    ] })
  ] });
}
function AdminReports() {
  const [activeTab, setActiveTab] = reactExports.useState("telecaller-perf");
  const [mobileDropOpen, setMobileDropOpen] = reactExports.useState(false);
  const { data: leads = [] } = useAllLeads();
  const { data: calls = [] } = useCallHistory(null);
  const { data: salesCalls = [] } = useSalesCallHistory(null);
  const { data: telecallerNames = [] } = useUniqueTelecallers();
  const activeTabMeta = TABS.find((t) => t.id === activeTab);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Reports Dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex flex-col w-56 xl:w-64 bg-card border-r border-border flex-shrink-0 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-widest px-2", children: "Report Sections" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "px-2 pb-4 space-y-0.5", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.id),
          className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-body text-left transition-smooth ${activeTab === tab.id ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
          "data-ocid": `report-tab-${tab.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: tab.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: tab.label })
          ]
        },
        tab.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden fixed top-14 left-0 right-0 z-20 bg-card border-b border-border px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full flex items-center justify-between px-3 py-2 rounded-lg border border-input bg-background text-sm font-body text-foreground",
          onClick: () => setMobileDropOpen((v) => !v),
          "data-ocid": "mobile-report-dropdown",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              activeTabMeta == null ? void 0 : activeTabMeta.icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activeTabMeta == null ? void 0 : activeTabMeta.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                size: 16,
                className: `text-muted-foreground transition-transform ${mobileDropOpen ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ),
      mobileDropOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-30 overflow-hidden max-h-64 overflow-y-auto", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-body text-left transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`,
          onClick: () => {
            setActiveTab(tab.id);
            setMobileDropOpen(false);
          },
          children: [
            tab.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
          ]
        },
        tab.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 lg:p-7 pt-20 lg:pt-7 max-w-5xl", children: [
      activeTab === "telecaller-perf" && /* @__PURE__ */ jsxRuntimeExports.jsx(TelecallerPerf, { leads }),
      activeTab === "project-summary" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSummary, { leads }),
      activeTab === "source-analysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(SourceAnalysis, { leads }),
      activeTab === "monthly-trend" && /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlyTrend, { leads }),
      activeTab === "funnel" && /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionFunnel, { leads }),
      activeTab === "export" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExportCSV, { leads, telecallers: telecallerNames }),
      activeTab === "lead-aging" && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadAgingReport, { leads }),
      activeTab === "today-calls" && /* @__PURE__ */ jsxRuntimeExports.jsx(TodayCallHistory, { calls, salesCalls }),
      activeTab === "today-call-count" && /* @__PURE__ */ jsxRuntimeExports.jsx(TodayCallCount, { calls }),
      activeTab === "date-call-count" && /* @__PURE__ */ jsxRuntimeExports.jsx(DateCallCount, { calls, telecallers: telecallerNames }),
      activeTab === "sv-status" && /* @__PURE__ */ jsxRuntimeExports.jsx(SVStatusReport, { leads }),
      activeTab === "lead-quality" && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadQuality, { leads }),
      activeTab === "best-source" && /* @__PURE__ */ jsxRuntimeExports.jsx(BestSource, { leads })
    ] }) })
  ] }) });
}
export {
  AdminReports as default
};
