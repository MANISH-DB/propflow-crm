import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
import { j as jsxRuntimeExports } from "./index-BYjlLTrJ.js";
import { u as useCallHistory, b as useSalesCallHistory } from "./useCallHistory-CuOV2oBp.js";
import { c as formatDateForDisplay, P as Phone, X } from "./dateUtils-CEWG1Xtm.js";
import { S as StatusBadge } from "./StatusBadge-h7_1FjPG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
function DateDisplay({
  value,
  className = "",
  showEmpty = "—"
}) {
  const display = formatDateForDisplay(value);
  const isEmpty = display === "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `font-mono text-xs tabular-nums ${isEmpty ? "text-muted-foreground" : "text-foreground"} ${className}`,
      children: isEmpty ? showEmpty : display
    }
  );
}
function CallHistoryModal({
  mobileNo,
  leadName,
  onClose
}) {
  const { data: allHistory = [], isLoading } = useCallHistory(null);
  const history = allHistory.filter((h) => h.mobile === mobileNo).sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CallHistoryPanel,
    {
      title: leadName,
      mobileNo,
      isLoading,
      onClose,
      count: history.length,
      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {}) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-3 p-3 rounded-lg bg-background border border-border",
          "data-ocid": `call-history-row-${idx}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, { idx, total: history.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: entry.status, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DateDisplay, { value: entry.date, className: "text-[10px]" }),
                entry.projectName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-body", children: entry.projectName })
              ] }),
              entry.remark && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground mt-1 font-body leading-relaxed break-words", children: entry.remark }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 font-body", children: [
                "By: ",
                entry.telecaller
              ] })
            ] })
          ]
        },
        `${entry.date}-${entry.status}-${idx}`
      ))
    }
  );
}
function SalesCallHistoryModal({
  mobileNo,
  leadName,
  salesPerson,
  onClose
}) {
  const { data: allHistory = [], isLoading } = useSalesCallHistory(salesPerson);
  const history = allHistory.filter((h) => h.mobile === mobileNo).sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CallHistoryPanel,
    {
      title: leadName,
      mobileNo,
      isLoading,
      onClose,
      count: history.length,
      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {}) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-3 p-3 rounded-lg bg-background border border-border",
          "data-ocid": `sales-call-history-row-${idx}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIcon, { idx, total: history.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: entry.status, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DateDisplay, { value: entry.date, className: "text-[10px]" }),
                entry.projectName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-body", children: entry.projectName })
              ] }),
              entry.remark && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground mt-1 font-body leading-relaxed break-words", children: entry.remark }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 font-body", children: [
                "By: ",
                entry.salesPerson
              ] })
            ] })
          ]
        },
        `${entry.date}-${entry.status}-${idx}`
      ))
    }
  );
}
function FullCallLogModal({
  salesPerson,
  todayOnly = false,
  onClose
}) {
  const { data: allHistory = [], isLoading } = useSalesCallHistory(salesPerson);
  const today = /* @__PURE__ */ new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const months = [
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
  const todayDDMMMYYYY = `${dd}/${months[today.getMonth()]}/${today.getFullYear()}`;
  const history = (todayOnly ? allHistory.filter((h) => h.date === todayDDMMMYYYY) : [...allHistory]).sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      "aria-label": todayOnly ? "Today's call log" : "Full call log",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default",
            onClick: onClose,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-2xl bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl max-h-[90vh] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: todayOnly ? "Today's Call Log" : "Full Call Log" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
                  salesPerson,
                  " · ",
                  history.length,
                  " record",
                  history.length !== 1 ? "s" : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {}) }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 32, className: "text-muted-foreground/40 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: todayOnly ? "No calls made today" : "No call history found" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-muted/80 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
              "Date",
              "Name",
              "Mobile",
              "Project",
              "Status",
              "Remarks"
            ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-3 py-2.5 text-left text-[10px] font-display font-semibold text-primary uppercase tracking-wider whitespace-nowrap",
                children: col
              },
              col
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: history.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border/60 hover:bg-muted/40 ${i % 2 === 1 ? "bg-muted/10" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono whitespace-nowrap text-muted-foreground", children: h.date || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground font-medium whitespace-nowrap", children: h.name || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `tel:${h.mobile}`,
                      className: "text-primary hover:underline font-mono",
                      children: h.mobile
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-muted-foreground", children: h.projectName || "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: h.status, size: "sm" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1 text-muted-foreground", children: h.remark || "—" }) })
                ]
              },
              `${h.date}-${h.mobile}-${i}`
            )) })
          ] }) }) })
        ] })
      ]
    }
  );
}
function CallHistoryPanel({
  title,
  mobileNo,
  isLoading,
  onClose,
  count,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      "aria-label": `Call history for ${title}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default",
            onClick: onClose,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl max-h-[90vh] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `tel:${mobileNo}`,
                    className: "text-xs text-muted-foreground font-mono hover:text-primary transition-smooth",
                    children: mobileNo
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 px-5 py-3 border-t border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center font-body", children: isLoading ? "Loading…" : `${count} call record${count !== 1 ? "s" : ""} for this lead` }) })
        ] })
      ]
    }
  );
}
function PhoneIcon({ idx, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-shrink-0 pt-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10, className: "text-primary" }) }),
    idx < total - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-px bg-border min-h-[12px]" })
  ] });
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-lg bg-muted animate-pulse" }, i)) });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-10 text-center",
      "data-ocid": "call-history-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 32, className: "text-muted-foreground/40 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: "No call history found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Calls logged via Lead Update will appear here" })
      ]
    }
  );
}
export {
  CallHistoryModal as C,
  DateDisplay as D,
  FullCallLogModal as F,
  History as H,
  SalesCallHistoryModal as S
};
