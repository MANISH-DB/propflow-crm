import { a as useAuth, b as useQueryClient, r as reactExports, j as jsxRuntimeExports } from "./index-BYjlLTrJ.js";
import { a as Layout } from "./Layout-D8UrcW-o.js";
import { u as useCallHistory, b as useSalesCallHistory } from "./useCallHistory-CuOV2oBp.js";
import { a as todayStr, p as parseDate, i as isToday, X, P as Phone } from "./dateUtils-CEWG1Xtm.js";
import { P as PhoneCall } from "./phone-call-VR0ERAEw.js";
import { D as Download } from "./download-B4J0vQcp.js";
import { R as RefreshCw } from "./refresh-cw-C5sG_0Bc.js";
import { S as Search } from "./search-DAVmEOeC.js";
import { C as Calendar } from "./calendar-6xntBkJe.js";
import "./useBackendActor-CDUnFUXW.js";
import "./smartphone-CJQPGBQn.js";
import "./chart-column-DnJLxgFx.js";
function toUnifiedFromCall(c) {
  return {
    date: c.date,
    name: c.name,
    mobile: c.mobile,
    status: c.status,
    remark: c.remark,
    person: c.telecaller,
    projectName: c.projectName,
    role: "Telecaller"
  };
}
function toUnifiedFromSales(s) {
  return {
    date: s.date,
    name: s.name,
    mobile: s.mobile,
    status: s.status,
    remark: s.remark,
    person: s.salesPerson,
    projectName: s.projectName,
    role: "Sales"
  };
}
function StatBox({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center px-5 py-3 rounded-xl border ${accent ? "bg-accent/10 border-accent/30 text-accent-foreground" : "bg-card border-border"} min-w-[100px]`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-2xl font-display font-bold ${accent ? "text-accent" : "text-primary"}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body mt-0.5 text-center", children: label })
      ]
    }
  );
}
function RoleBadge({ role }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-body font-medium border ${role === "Telecaller" ? "bg-primary/10 text-primary border-primary/20" : "bg-accent/20 text-accent-foreground border-accent/30"}`,
      children: role
    }
  );
}
function exportToCSV(rows, filename) {
  const header = [
    "Date",
    "Name",
    "Mobile",
    "Status",
    "Remark",
    "Person",
    "Project Name",
    "Role"
  ];
  const lines = rows.map(
    (r) => [
      r.date,
      r.name,
      r.mobile,
      r.status,
      r.remark,
      r.person,
      r.projectName,
      r.role
    ].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function CallLogPage() {
  const { session } = useAuth();
  const qc = useQueryClient();
  const role = (session == null ? void 0 : session.role) ?? "telecaller";
  const username = (session == null ? void 0 : session.username) ?? "";
  const telecallerName = role === "telecaller" ? username : null;
  const salesName = role === "sales" ? username : null;
  const { data: callData = [], isFetching: fetchingCalls } = useCallHistory(telecallerName);
  const { data: salesData = [], isFetching: fetchingSales } = useSalesCallHistory(role === "admin" ? null : salesName);
  const allRows = reactExports.useMemo(() => {
    if (role === "telecaller") {
      return callData.map(toUnifiedFromCall);
    }
    if (role === "sales") {
      return salesData.map(toUnifiedFromSales);
    }
    const calls = callData.map(toUnifiedFromCall);
    const sales = salesData.map(toUnifiedFromSales);
    return [...calls, ...sales].sort((a, b) => {
      return b.date.localeCompare(a.date);
    });
  }, [role, callData, salesData]);
  const [searchMobile, setSearchMobile] = reactExports.useState("");
  const [searchStatus, setSearchStatus] = reactExports.useState("");
  const [searchProject, setSearchProject] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [todayOnly, setTodayOnly] = reactExports.useState(false);
  const today = todayStr();
  const filteredRows = reactExports.useMemo(() => {
    return allRows.filter((r) => {
      if (todayOnly && r.date !== today) return false;
      if (searchMobile && !r.mobile.toLowerCase().includes(searchMobile.toLowerCase()))
        return false;
      if (searchStatus && !r.status.toLowerCase().includes(searchStatus.toLowerCase()))
        return false;
      if (searchProject && !r.projectName.toLowerCase().includes(searchProject.toLowerCase()))
        return false;
      if (dateFrom) {
        const fromDate = parseDate(dateFrom);
        const rowDate = parseDate(r.date);
        if (!Number.isNaN(fromDate.getTime()) && !Number.isNaN(rowDate.getTime()) && rowDate < fromDate)
          return false;
      }
      if (dateTo) {
        const toDate = parseDate(dateTo);
        const rowDate = parseDate(r.date);
        if (!Number.isNaN(toDate.getTime()) && !Number.isNaN(rowDate.getTime()) && rowDate > toDate)
          return false;
      }
      return true;
    });
  }, [
    allRows,
    todayOnly,
    searchMobile,
    searchStatus,
    searchProject,
    dateFrom,
    dateTo,
    today
  ]);
  const totalCalls = allRows.length;
  const todayCalls = allRows.filter((r) => isToday(r.date)).length;
  const isFetching = fetchingCalls || fetchingSales;
  const pageTitle = role === "admin" ? "Call Log" : role === "sales" ? "My Call Log" : "My Call Log";
  function clearFilters() {
    setSearchMobile("");
    setSearchStatus("");
    setSearchProject("");
    setDateFrom("");
    setDateTo("");
    setTodayOnly(false);
  }
  const hasFilters = searchMobile || searchStatus || searchProject || dateFrom || dateTo || todayOnly;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: pageTitle, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Total Calls", value: totalCalls }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Today Calls", value: todayCalls, accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "btn-today-calls",
            onClick: () => setTodayOnly((v) => !v),
            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body transition-smooth ${todayOnly ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border text-muted-foreground hover:bg-muted"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { size: 14 }),
              "Today Call"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "btn-export-calls",
            onClick: () => exportToCSV(filteredRows, `call-log-${today}.csv`),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted text-sm font-body transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
              "Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "btn-refresh-calls",
            onClick: () => qc.invalidateQueries({ queryKey: ["callHistory"] }),
            className: `p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-smooth ${isFetching ? "animate-spin" : ""}`,
            title: "Refresh",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[160px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "cl-mobile",
            className: "text-xs text-muted-foreground font-body block mb-1",
            children: "Mobile"
          }
        ),
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
              id: "cl-mobile",
              type: "text",
              "data-ocid": "filter-mobile",
              placeholder: "Search mobile…",
              value: searchMobile,
              onChange: (e) => setSearchMobile(e.target.value),
              className: "w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[140px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "cl-status",
            className: "text-xs text-muted-foreground font-body block mb-1",
            children: "Status"
          }
        ),
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
              id: "cl-status",
              type: "text",
              "data-ocid": "filter-status",
              placeholder: "Filter status…",
              value: searchStatus,
              onChange: (e) => setSearchStatus(e.target.value),
              className: "w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[160px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "cl-project",
            className: "text-xs text-muted-foreground font-body block mb-1",
            children: "Project Name"
          }
        ),
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
              id: "cl-project",
              type: "text",
              "data-ocid": "filter-project",
              placeholder: "Filter project…",
              value: searchProject,
              onChange: (e) => setSearchProject(e.target.value),
              className: "w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[130px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "cl-date-from",
            className: "text-xs text-muted-foreground font-body block mb-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11, className: "inline mr-1" }),
              "Date From"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "cl-date-from",
            type: "text",
            "data-ocid": "filter-date-from",
            placeholder: "DD/MMM/YYYY",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            className: "w-full px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[130px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "cl-date-to",
            className: "text-xs text-muted-foreground font-body block mb-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 11, className: "inline mr-1" }),
              "Date To"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "cl-date-to",
            type: "text",
            "data-ocid": "filter-date-to",
            placeholder: "DD/MMM/YYYY",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            className: "w-full px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
          }
        )
      ] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: clearFilters,
          className: "flex items-center gap-1 px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm font-body hover:bg-destructive/10 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 }),
            "Clear"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-body", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filteredRows.length }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: allRows.length }),
        " ",
        "records"
      ] }),
      isFetching && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground animate-pulse font-body", children: "Loading…" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm font-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Mobile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Remark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: role === "admin" ? "Telecaller / Sales" : role === "sales" ? "Sales Person" : "Telecaller" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Project Name" }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: "Role" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: role === "admin" ? 8 : 7,
          className: "py-16 text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 32, className: "text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "No call records found" }),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearFilters,
                className: "text-primary text-sm underline-offset-2 hover:underline",
                children: "Clear filters"
              }
            )
          ] })
        }
      ) }) : filteredRows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `call-row-${idx}`,
          className: "border-b border-border/60 hover:bg-muted/30 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 whitespace-nowrap text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: isToday(row.date) ? "text-accent font-semibold" : "",
                children: row.date || "—"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground font-medium max-w-[130px] truncate", children: row.name || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${row.mobile}`,
                className: "text-primary hover:underline flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                  row.mobile
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border bg-primary/8 text-primary border-primary/20", children: row.status || "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground max-w-[200px] truncate", children: row.remark || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 whitespace-nowrap text-foreground", children: row.person || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 whitespace-nowrap text-foreground", children: row.projectName || "—" }),
            role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: row.role }) })
          ]
        },
        `${row.date}-${row.mobile}-${idx}`
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground font-body py-2", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          target: "_blank",
          rel: "noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) });
}
export {
  CallLogPage as default
};
