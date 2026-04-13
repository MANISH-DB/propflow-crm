import { j as jsxRuntimeExports, a as useAuth, b as useQueryClient, r as reactExports } from "./index-BYjlLTrJ.js";
import { D as DateDisplay, H as History, C as CallHistoryModal } from "./CallHistoryModal-BWtd_pjc.js";
import { P as PropFlowLogo, L as LogOut } from "./Layout-D8UrcW-o.js";
import { l as leadAgeDays, P as Phone, p as parseDate, f as fromInputDate, i as isToday } from "./dateUtils-CEWG1Xtm.js";
import { a as useAllProjects, u as useUniqueProjectNames } from "./useProjects-DYXnZIVc.js";
import { S as StatusBadge } from "./StatusBadge-h7_1FjPG.js";
import { P as Pencil, T as TelecallerTasksPage } from "./TelecallerTasksPage-BEgHcimx.js";
import { M as MessageCircle } from "./message-circle-CHSCirWY.js";
import { L as LeadUpdateModal } from "./LeadUpdateModal-exyH8Q5W.js";
import { u as useCallHistory } from "./useCallHistory-CuOV2oBp.js";
import { u as useAllLeads } from "./useLeads-CFN0KzzB.js";
import { C as ChevronDown } from "./chevron-down-DWmfF_uF.js";
import { S as Smartphone, E as Eye } from "./smartphone-CJQPGBQn.js";
import { R as RefreshCw } from "./refresh-cw-C5sG_0Bc.js";
import { S as Search } from "./search-DAVmEOeC.js";
import { C as Calendar } from "./calendar-6xntBkJe.js";
import { D as Download } from "./download-B4J0vQcp.js";
import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
import "./chart-column-DnJLxgFx.js";
import "./useTasks-DgilsZ2-.js";
import "./circle-check-DyAcnbJK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
const AGING_BOXES = [
  {
    key: "0-9",
    label: "0–9 Days",
    minDays: 0,
    maxDays: 9,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700"
  },
  {
    key: "10-19",
    label: "10–19 Days",
    minDays: 10,
    maxDays: 19,
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700"
  },
  {
    key: "20-29",
    label: "20–29 Days",
    minDays: 20,
    maxDays: 29,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700"
  },
  {
    key: "30-59",
    label: "30–59 Days",
    minDays: 30,
    maxDays: 59,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700"
  },
  {
    key: "60-90",
    label: "60–90 Days",
    minDays: 60,
    maxDays: 90,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700"
  },
  {
    key: "90+",
    label: "90+ Days",
    minDays: 91,
    maxDays: 99999,
    bgColor: "bg-destructive/8",
    borderColor: "border-destructive/20",
    textColor: "text-destructive"
  }
];
const EXCLUDED_STATUSES = ["Lost", "Qualified1"];
function countAgingLeads(leads, box) {
  return leads.filter((l) => !EXCLUDED_STATUSES.includes(l.latestStatus)).filter((l) => {
    const age = leadAgeDays(l.leadDate);
    return age >= box.minDays && age <= box.maxDays;
  }).length;
}
function LeadAgingBoxes({
  leads,
  activeFilter,
  onFilterChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: AGING_BOXES.map((box) => {
    const count = countAgingLeads(leads, box);
    const isActive = activeFilter === box.key;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onFilterChange(isActive ? null : box.key),
        "data-ocid": `aging-box-${box.key}`,
        className: `
              flex flex-col items-center justify-center min-w-[64px] px-2.5 py-1.5 rounded-md border cursor-pointer
              transition-smooth select-none
              ${isActive ? `${box.bgColor} ${box.borderColor} ring-2 ring-offset-1 ring-current ${box.textColor} shadow-sm` : `${box.bgColor} ${box.borderColor} ${box.textColor} hover:shadow-sm hover:scale-105`}
            `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base leading-none tabular-nums", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-body font-medium mt-0.5 text-center leading-tight whitespace-nowrap", children: box.label })
        ]
      },
      box.key
    );
  }) });
}
const STATUS_BOXES = [
  {
    key: "total",
    label: "Total",
    color: "primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    textColor: "text-primary"
  },
  {
    key: "New",
    label: "New",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700"
  },
  {
    key: "Not Connect",
    label: "Not Connect",
    color: "red",
    bgColor: "bg-destructive/8",
    borderColor: "border-destructive/20",
    textColor: "text-destructive"
  },
  {
    key: "Qualified",
    label: "Qualified",
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700"
  },
  {
    key: "Share Brochure",
    label: "Share Brochure",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700"
  },
  {
    key: "Follow-up",
    label: "Follow-up",
    color: "sky",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700"
  },
  {
    key: "SV Plan",
    label: "SV Plan",
    color: "violet",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-700"
  },
  {
    key: "SV Done",
    label: "SV Done",
    color: "emerald",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700"
  },
  {
    key: "Qualified1",
    label: "Qualified1",
    color: "teal",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-700"
  },
  {
    key: "Lost",
    label: "Lost",
    color: "gray",
    bgColor: "bg-muted",
    borderColor: "border-border",
    textColor: "text-muted-foreground"
  }
];
const QUALIFIED_STATUSES = ["Share Brochure", "Follow-up", "SV Plan"];
function countLeads(leads, key) {
  if (key === "total") return leads.length;
  if (key === "Qualified")
    return leads.filter((l) => QUALIFIED_STATUSES.includes(l.latestStatus)).length;
  if (key === "New")
    return leads.filter(
      (l) => !l.latestStatus || l.latestStatus === "" || l.latestStatus === "New"
    ).length;
  return leads.filter((l) => l.latestStatus === key).length;
}
function LeadStatusBoxes({
  leads,
  activeFilter,
  onFilterChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: STATUS_BOXES.map((box) => {
    const count = countLeads(leads, box.key);
    const isActive = activeFilter === box.key;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onFilterChange(isActive ? null : box.key),
        "data-ocid": `status-box-${box.key.toLowerCase().replace(/\s+/g, "-")}`,
        className: `
              flex flex-col items-center justify-center min-w-[72px] px-3 py-2 rounded-lg border cursor-pointer
              transition-smooth select-none
              ${isActive ? `${box.bgColor} ${box.borderColor} ring-2 ring-offset-1 ring-current ${box.textColor} shadow-md` : `${box.bgColor} ${box.borderColor} ${box.textColor} hover:shadow-sm hover:scale-105`}
            `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl leading-none tabular-nums", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body font-medium mt-0.5 text-center leading-tight whitespace-nowrap", children: box.label })
        ]
      },
      box.key
    );
  }) });
}
function buildLastCallMap(history) {
  const map = {};
  for (const h of history) {
    if (!h.mobile || !h.date) continue;
    const existing = map[h.mobile];
    if (!existing || h.date > existing) {
      map[h.mobile] = h.date;
    }
  }
  return map;
}
function daysAgo(dateStr) {
  const d = parseDate(dateStr);
  if (Number.isNaN(d.getTime())) return -1;
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1e3 * 60 * 60 * 24));
}
function WhatsAppButton({
  lead,
  brochureUrl
}) {
  const mobile = lead.mobileNo.replace(/\D/g, "");
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const brochureText = brochureUrl ? `

Brochure: ${brochureUrl}` : "";
  const text = encodeURIComponent(
    `Hi ${name}, Thank you for your interest in ${lead.projectName}. Please find the details below.${brochureText}`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: `https://wa.me/${mobile}?text=${text}`,
      target: "_blank",
      rel: "noopener noreferrer",
      title: "Send WhatsApp",
      className: "inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-smooth",
      "data-ocid": "btn-whatsapp",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 13 })
    }
  );
}
function ActionButtons({
  lead,
  brochureUrl,
  onLeadUpdate,
  onCallHistory
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        title: "Update Lead",
        onClick: () => onLeadUpdate(lead),
        className: "inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-smooth",
        "data-ocid": "btn-lead-update",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 12 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        title: "Call History",
        onClick: () => onCallHistory(lead),
        className: "inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth",
        "data-ocid": "btn-call-history",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 12 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppButton, { lead, brochureUrl })
  ] });
}
function AgeChip({ days }) {
  const cls = days <= 9 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : days <= 19 ? "bg-sky-50 text-sky-700 border-sky-200" : days <= 29 ? "bg-amber-50 text-amber-700 border-amber-200" : days <= 59 ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-destructive/10 text-destructive border-destructive/20";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-body font-semibold tabular-nums ${cls}`,
      children: [
        days,
        "d"
      ]
    }
  );
}
function LastCallCell({ dateStr }) {
  if (!dateStr) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "—" });
  }
  const days = daysAgo(dateStr);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xs font-mono whitespace-nowrap", children: dateStr }),
    days >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-body whitespace-nowrap", children: days === 0 ? "Today" : `${days}d ago` })
  ] });
}
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"].map(
    (col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-3 bg-muted rounded animate-pulse",
        style: { width: "60%" }
      }
    ) }, `skel-col-${i}-${col}`)
  ) }, `skel-row-${i}`)) });
}
function MobileCard({
  lead,
  brochureUrl,
  onLeadUpdate,
  onCallHistory,
  idx,
  lastCallDate
}) {
  const age = leadAgeDays(lead.leadDate);
  const days = lastCallDate ? daysAgo(lastCallDate) : -1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-3 space-y-2",
      "data-ocid": `lead-card-${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded flex-shrink-0", children: [
              "#",
              lead.srNo.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body font-semibold text-sm text-foreground truncate", children: [
                lead.firstName,
                " ",
                lead.lastName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${lead.mobileNo}`,
                  className: "flex items-center gap-1 text-xs text-primary hover:underline font-mono",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
                    lead.mobileNo
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: lead.latestStatus || "New", size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AgeChip, { days: age })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground font-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Project:" }),
            " ",
            lead.projectName || "—"
          ] }),
          lead.assignedSales && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Sales:" }),
            " ",
            lead.assignedSales
          ] }),
          lastCallDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Last Call:" }),
            " ",
            lastCallDate,
            days >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-muted-foreground/70", children: [
              "(",
              days === 0 ? "Today" : `${days}d ago`,
              ")"
            ] })
          ] }),
          lead.remarks1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Remark:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground line-clamp-1", children: lead.remarks1 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-body space-x-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Status:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DateDisplay,
              {
                value: lead.latestStatusDate,
                className: "text-[10px]"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButtons,
            {
              lead,
              brochureUrl,
              onLeadUpdate,
              onCallHistory
            }
          )
        ] })
      ]
    }
  );
}
function LeadTable({
  leads,
  viewMode,
  isLoading,
  onLeadUpdate,
  onCallHistory,
  callHistoryAll = []
}) {
  const { data: projects = [] } = useAllProjects();
  const brochureMap = {};
  for (const p of projects) {
    if (p.brochure) brochureMap[p.projectName] = p.brochure;
  }
  const lastCallMap = buildLastCallMap(callHistoryAll);
  if (viewMode === "mobile") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "lead-cards-list", children: isLoading ? ["s1", "s2", "s3", "s4", "s5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 bg-muted rounded-lg animate-pulse" }, sk)) : leads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "leads-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 28, className: "text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "No leads found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-body", children: "Try adjusting your filters or search terms" })
        ]
      }
    ) : leads.map((lead, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MobileCard,
      {
        lead,
        brochureUrl: brochureMap[lead.projectName],
        onLeadUpdate,
        onCallHistory,
        idx,
        lastCallDate: lastCallMap[lead.mobileNo] ?? ""
      },
      lead.id.toString()
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "overflow-x-auto rounded-xl border border-border bg-card",
      "data-ocid": "lead-table-desktop",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs font-body border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-primary/5 border-b border-border", children: [
            "SR.NO",
            "NAME",
            "MOBILE",
            "PROJECT",
            "TELECALLER",
            "STATUS",
            "LAST CALL",
            "STATUS DATE",
            "AGE",
            "REMARKS",
            "SALES",
            "ACTIONS"
          ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-3 py-2.5 text-left text-[10px] font-display font-semibold text-primary uppercase tracking-wider whitespace-nowrap sticky top-0 bg-primary/5",
              children: col
            },
            col
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}) : leads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 12, className: "px-3 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-3",
              "data-ocid": "leads-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 24, className: "text-muted-foreground/40" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-medium text-foreground", children: "No leads found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Try adjusting your filters or search terms" })
              ]
            }
          ) }) }) : leads.map((lead, idx) => {
            const age = leadAgeDays(lead.leadDate);
            const brochureUrl = brochureMap[lead.projectName];
            const lastCallDate = lastCallMap[lead.mobileNo] ?? "";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border transition-colors hover:bg-muted/40 ${idx % 2 === 1 ? "bg-muted/10" : "bg-card"}`,
                "data-ocid": `lead-row-${idx}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-muted-foreground whitespace-nowrap", children: lead.srNo.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-body font-medium text-foreground whitespace-nowrap max-w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "truncate block",
                      title: `${lead.firstName} ${lead.lastName}`,
                      children: lead.firstName
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `tel:${lead.mobileNo}`,
                      className: "flex items-center gap-1 text-primary hover:underline font-mono",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
                        lead.mobileNo
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap max-w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "truncate block text-foreground",
                      title: lead.projectName,
                      children: lead.projectName || "—"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-muted-foreground", children: lead.telecaller || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusBadge,
                    {
                      status: lead.latestStatus || "New",
                      size: "sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LastCallCell, { dateStr: lastCallDate }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DateDisplay, { value: lead.latestStatusDate }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgeChip, { days: age }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "line-clamp-1 text-muted-foreground",
                      title: lead.remarks1,
                      children: lead.remarks1 || "—"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-muted-foreground", children: lead.assignedSales || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ActionButtons,
                    {
                      lead,
                      brochureUrl,
                      onLeadUpdate,
                      onCallHistory
                    }
                  ) })
                ]
              },
              lead.id.toString()
            );
          }) })
        ] }),
        !isLoading && leads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-body", children: [
          "Showing",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: leads.length }),
          " ",
          "lead",
          leads.length !== 1 ? "s" : ""
        ] }) })
      ]
    }
  );
}
function exportLeadsCSV(rows, filename) {
  const headers = [
    "Sr.No",
    "Lead Date",
    "First Name",
    "Last Name",
    "Mobile",
    "Project",
    "Telecaller",
    "Status",
    "Status Date",
    "Age",
    "Remarks1",
    "Sales"
  ];
  const csvRows = [
    headers.join(","),
    ...rows.map(
      (l) => [
        l.srNo.toString(),
        l.leadDate,
        `"${l.firstName}"`,
        `"${l.lastName}"`,
        l.mobileNo,
        `"${l.projectName}"`,
        `"${l.telecaller}"`,
        `"${l.latestStatus}"`,
        l.latestStatusDate,
        leadAgeDays(l.leadDate).toString(),
        `"${l.remarks1.replace(/"/g, '""')}"`,
        `"${l.assignedSales}"`
      ].join(",")
    )
  ];
  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function CallReminders({
  leads,
  onUpdate
}) {
  const reminders = leads.filter((l) => {
    if (!l.latestStatusDate) return false;
    const latestIsToday = isToday(l.latestStatusDate);
    const lastCallIsToday = isToday(l.statusDate);
    return latestIsToday && !lastCallIsToday;
  });
  if (reminders.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-amber-200 bg-amber-50/60 p-3",
      "data-ocid": "call-reminders-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 14, className: "text-amber-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-display font-semibold text-amber-800 uppercase tracking-wide", children: [
            "Call Reminders (",
            reminders.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: reminders.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 bg-card border border-amber-200 rounded-lg px-3 py-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12, className: "text-amber-600 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-foreground", children: l.firstName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `tel:${l.mobileNo}`,
                  className: "text-xs text-primary font-mono hover:underline",
                  children: l.mobileNo
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onUpdate(l),
                  className: "text-[10px] px-2 py-0.5 rounded bg-amber-600 text-white hover:bg-amber-700 transition-smooth font-body",
                  "data-ocid": "btn-reminder-update",
                  children: "Update"
                }
              )
            ]
          },
          l.id.toString()
        )) })
      ]
    }
  );
}
function CallLogTable({ entries }) {
  const [search, setSearch] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(
      (e) => e.mobile.includes(q) || e.name.toLowerCase().includes(q) || e.status.toLowerCase().includes(q) || e.projectName.toLowerCase().includes(q)
    );
  }, [entries, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 13,
          className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search by name, mobile, status, project…",
          className: "w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-card text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "input-calllog-search"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs font-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-primary/5 border-b border-border", children: [
        "Date",
        "Name",
        "Mobile",
        "Status",
        "Remark",
        "Telecaller",
        "Project"
      ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-3 py-2.5 text-left text-[10px] font-display font-semibold text-primary uppercase tracking-wider whitespace-nowrap",
          children: col
        },
        col
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 7,
          className: "px-3 py-10 text-center text-muted-foreground",
          "data-ocid": "calllog-empty",
          children: "No call records found"
        }
      ) }) : filtered.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: `border-b border-border hover:bg-muted/40 ${i % 2 === 1 ? "bg-muted/10" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono whitespace-nowrap", children: e.date || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-body text-foreground", children: e.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${e.mobile}`,
                className: "text-primary hover:underline font-mono",
                children: e.mobile
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-body font-medium bg-primary/10 text-primary border-primary/20", children: e.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1 text-muted-foreground", children: e.remark || "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: e.telecaller }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: e.projectName })
          ]
        },
        `${e.date}-${e.mobile}-${i}`
      )) })
    ] }) })
  ] });
}
function TelecallerDashboard() {
  const { session, logout, setProjectFilter, setViewMode } = useAuth();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [statusFilter, setStatusFilter] = reactExports.useState(null);
  const [agingFilter, setAgingFilter] = reactExports.useState(null);
  const [searchText, setSearchText] = reactExports.useState("");
  const [statusDateFilter, setStatusDateFilter] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [selectedLead, setSelectedLead] = reactExports.useState(null);
  const [callHistoryLead, setCallHistoryLead] = reactExports.useState(null);
  const viewMode = (session == null ? void 0 : session.viewMode) ?? "desktop";
  const projectFilter = (session == null ? void 0 : session.projectFilter) ?? "All Projects";
  const username = (session == null ? void 0 : session.username) ?? "";
  const { data: allLeads = [], isLoading } = useAllLeads();
  const { data: projectNames = [] } = useUniqueProjectNames();
  const { data: callHistory = [] } = useCallHistory(username || null);
  function handleRefresh() {
    qc.invalidateQueries();
  }
  const myLeads = reactExports.useMemo(() => {
    if (!username) return allLeads;
    return allLeads.filter((l) => l.telecaller === username);
  }, [allLeads, username]);
  const projectFiltered = reactExports.useMemo(() => {
    if (!projectFilter || projectFilter === "All Projects") return myLeads;
    return myLeads.filter((l) => l.projectName === projectFilter);
  }, [myLeads, projectFilter]);
  const sortedLeads = reactExports.useMemo(
    () => [...projectFiltered].sort((a, b) => {
      if (a.latestStatusDate > b.latestStatusDate) return -1;
      if (a.latestStatusDate < b.latestStatusDate) return 1;
      return 0;
    }),
    [projectFiltered]
  );
  const QUALIFIED_STATUSES2 = ["Share Brochure", "Follow-up", "SV Plan"];
  const statusFiltered = reactExports.useMemo(() => {
    if (!statusFilter || statusFilter === "total") return sortedLeads;
    if (statusFilter === "Qualified")
      return sortedLeads.filter(
        (l) => QUALIFIED_STATUSES2.includes(l.latestStatus)
      );
    if (statusFilter === "New")
      return sortedLeads.filter(
        (l) => !l.latestStatus || l.latestStatus === "" || l.latestStatus === "New"
      );
    return sortedLeads.filter((l) => l.latestStatus === statusFilter);
  }, [sortedLeads, statusFilter]);
  const AGING_RANGES = {
    "0-9": [0, 9],
    "10-19": [10, 19],
    "20-29": [20, 29],
    "30-59": [30, 59],
    "60-90": [60, 90],
    "90+": [91, 99999]
  };
  const EXCLUDE_AGING = ["Lost", "Qualified1"];
  const agingFiltered = reactExports.useMemo(() => {
    if (!agingFilter) return statusFiltered;
    const [min, max] = AGING_RANGES[agingFilter] ?? [0, 99999];
    return statusFiltered.filter((l) => {
      if (EXCLUDE_AGING.includes(l.latestStatus)) return false;
      const age = leadAgeDays(l.leadDate);
      return age >= min && age <= max;
    });
  }, [statusFiltered, agingFilter]);
  const filteredLeads = reactExports.useMemo(() => {
    let result = agingFiltered;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(
        (l) => l.firstName.toLowerCase().includes(q) || l.lastName.toLowerCase().includes(q) || l.mobileNo.includes(q) || l.remarks1.toLowerCase().includes(q)
      );
    }
    if (statusDateFilter.trim()) {
      const q = statusDateFilter.trim().toLowerCase();
      result = result.filter(
        (l) => (l.latestStatusDate || "").toLowerCase().includes(q)
      );
    }
    if (dateFrom) {
      const fromStr = fromInputDate(dateFrom);
      result = result.filter((l) => l.leadDate >= fromStr);
    }
    if (dateTo) {
      const toStr = fromInputDate(dateTo);
      result = result.filter((l) => l.leadDate <= toStr);
    }
    return result;
  }, [agingFiltered, searchText, statusDateFilter, dateFrom, dateTo]);
  const myCallHistory = reactExports.useMemo(
    () => callHistory.filter((h) => !username || h.telecaller === username),
    [callHistory, username]
  );
  const todayCallCount = reactExports.useMemo(
    () => myCallHistory.filter((h) => isToday(h.date)).length,
    [myCallHistory]
  );
  const todayCallLog = reactExports.useMemo(
    () => myCallHistory.filter((h) => isToday(h.date)).sort((a, b) => b.date.localeCompare(a.date)),
    [myCallHistory]
  );
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "calllog", label: "My Call Log" },
    { key: "todaycalllog", label: "Today Call Log", badge: todayCallCount },
    { key: "tasks", label: "My Task" }
  ];
  const hasActiveFilters = !!searchText || !!statusDateFilter || !!dateFrom || !!dateTo || !!statusFilter || !!agingFilter;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-sidebar border-b border-sidebar-border flex-shrink-0 px-4 py-2.5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PropFlowLogo, { compact: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col leading-none border-l border-sidebar-border pl-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sidebar-foreground text-xs font-body font-medium truncate", children: username || "Telecaller" }),
          projectFilter && projectFilter !== "All Projects" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sidebar-primary text-[10px] font-body truncate", children: projectFilter })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: projectFilter,
              onChange: (e) => setProjectFilter(e.target.value),
              className: "appearance-none pl-2.5 pr-6 py-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground text-xs font-body focus:outline-none focus:ring-1 focus:ring-sidebar-ring cursor-pointer",
              "data-ocid": "select-project-filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All Projects", children: "All Projects" }),
                projectNames.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 12,
              className: "absolute right-1.5 top-1/2 -translate-y-1/2 text-sidebar-accent-foreground pointer-events-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setViewMode(viewMode === "desktop" ? "mobile" : "desktop"),
            className: "flex items-center gap-1 px-2 py-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground text-xs font-body hover:bg-sidebar-border transition-smooth",
            "data-ocid": "toggle-view-mode",
            title: `Switch to ${viewMode === "desktop" ? "Mobile" : "Desktop"} view`,
            children: [
              viewMode === "desktop" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: viewMode === "desktop" ? "Mobile" : "Desktop" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleRefresh,
            className: "p-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground hover:bg-sidebar-border transition-smooth",
            title: "Refresh data",
            "data-ocid": "btn-refresh",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: logout,
            className: "flex items-center gap-1 px-2 py-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-body transition-smooth",
            "data-ocid": "btn-logout",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border flex-shrink-0 px-4 flex items-center gap-1 overflow-x-auto", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.key),
        "data-ocid": `tab-${tab.key}`,
        className: `
              relative flex items-center gap-1.5 px-3 py-2.5 text-xs font-body font-medium whitespace-nowrap
              border-b-2 transition-smooth
              ${activeTab === tab.key ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/30"}
            `,
        children: [
          tab.label,
          tab.badge !== void 0 && tab.badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-bold leading-none", children: tab.badge })
        ]
      },
      tab.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-y-auto bg-background", children: [
      activeTab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeadStatusBoxes,
          {
            leads: projectFiltered,
            activeFilter: statusFilter,
            onFilterChange: setStatusFilter
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeadAgingBoxes,
          {
            leads: projectFiltered,
            activeFilter: agingFilter,
            onFilterChange: setAgingFilter
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CallReminders, { leads: projectFiltered, onUpdate: setSelectedLead }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-2 items-center",
            "data-ocid": "search-filter-bar",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    size: 13,
                    className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: searchText,
                    onChange: (e) => setSearchText(e.target.value),
                    placeholder: "Name, Mobile, Remark…",
                    className: "w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-card text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "input-search"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[160px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Calendar,
                  {
                    size: 13,
                    className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: statusDateFilter,
                    onChange: (e) => setStatusDateFilter(e.target.value),
                    placeholder: "Status Date (Apr/2026…)",
                    className: "w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-card text-xs font-mono text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "input-status-date-filter"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Calendar,
                  {
                    size: 12,
                    className: "text-muted-foreground flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "date",
                    value: dateFrom,
                    onChange: (e) => setDateFrom(e.target.value),
                    className: "px-2 py-1.5 rounded-md border border-input bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "input-date-from"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "date",
                    value: dateTo,
                    onChange: (e) => setDateTo(e.target.value),
                    className: "px-2 py-1.5 rounded-md border border-input bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "input-date-to"
                  }
                ),
                hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSearchText("");
                      setStatusDateFilter("");
                      setDateFrom("");
                      setDateTo("");
                      setStatusFilter(null);
                      setAgingFilter(null);
                    },
                    className: "text-xs text-muted-foreground hover:text-destructive underline transition-smooth font-body",
                    "data-ocid": "btn-clear-filters",
                    children: "Clear"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => exportLeadsCSV(
                    filteredLeads,
                    `leads-${username}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`
                  ),
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth",
                  "data-ocid": "btn-export-excel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 12 }),
                    "Export"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeadTable,
          {
            leads: filteredLeads,
            viewMode,
            isLoading,
            onLeadUpdate: setSelectedLead,
            onCallHistory: setCallHistoryLead,
            callHistoryAll: myCallHistory
          }
        )
      ] }),
      activeTab === "calllog" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "My Call Log" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: [
              "Total: ",
              myCallHistory.length,
              " entries"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => exportLeadsCSV(myLeads, `my-calllog-${username}`),
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-body text-muted-foreground hover:bg-muted transition-smooth",
              "data-ocid": "btn-export-calllog",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 12 }),
                " Export"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CallLogTable, { entries: myCallHistory })
      ] }),
      activeTab === "todaycalllog" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Today's Calls" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-body font-semibold", children: todayCallCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CallLogTable, { entries: todayCallLog })
      ] }),
      activeTab === "tasks" && /* @__PURE__ */ jsxRuntimeExports.jsx(TelecallerTasksPage, {})
    ] }),
    selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeadUpdateModal,
      {
        lead: selectedLead,
        onClose: () => setSelectedLead(null)
      }
    ),
    callHistoryLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CallHistoryModal,
      {
        mobileNo: callHistoryLead.mobileNo,
        leadName: `${callHistoryLead.firstName} ${callHistoryLead.lastName}`,
        onClose: () => setCallHistoryLead(null)
      }
    )
  ] });
}
export {
  TelecallerDashboard as default
};
