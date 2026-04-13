import { h as useSearch, S as SV_STATUSES, r as reactExports, j as jsxRuntimeExports } from "./index-BYjlLTrJ.js";
import { a as Layout } from "./Layout-D8UrcW-o.js";
import { S as StatusBadge } from "./StatusBadge-h7_1FjPG.js";
import { u as useAllLeads } from "./useLeads-CFN0KzzB.js";
import { l as leadAgeDays, P as Phone, c as formatDateForDisplay } from "./dateUtils-CEWG1Xtm.js";
import { B as Building2 } from "./useBackendActor-CDUnFUXW.js";
import { S as Search } from "./search-DAVmEOeC.js";
import { U as Users } from "./users-8IJymAeF.js";
import { D as Download } from "./download-B4J0vQcp.js";
import { A as ArrowUpDown } from "./arrow-up-down-lmAc0bCI.js";
import { C as CalendarDays } from "./calendar-days-D_BuczMS.js";
import "./smartphone-CJQPGBQn.js";
import "./refresh-cw-C5sG_0Bc.js";
import "./chart-column-DnJLxgFx.js";
function parseDate(str) {
  if (!str) return 0;
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
  const parts = str.split("/");
  if (parts.length !== 3) return 0;
  const [d, m, y] = parts;
  const mi = months.findIndex((mo) => mo.toLowerCase() === (m == null ? void 0 : m.toLowerCase()));
  if (mi === -1) return 0;
  return new Date(Number(y), mi, Number(d)).getTime();
}
const SV_COLORS = {
  "Next Followup": "border-accent/40 bg-accent/10 text-accent-foreground",
  "SV Rescheduled": "border-amber-300 bg-amber-50 text-amber-700",
  "Booking Done": "border-emerald-300 bg-emerald-50 text-emerald-700",
  "Registration Done": "border-green-300 bg-green-50 text-green-700",
  "Lead Close": "border-muted-foreground/30 bg-muted text-muted-foreground"
};
const SV_STATUS_CONFIG = [
  {
    key: "All",
    label: "All",
    cls: "border-primary/30 bg-primary/5 text-primary"
  },
  {
    key: "Next Followup",
    label: "Next Followup",
    cls: SV_COLORS["Next Followup"]
  },
  {
    key: "SV Rescheduled",
    label: "SV Rescheduled",
    cls: SV_COLORS["SV Rescheduled"]
  },
  {
    key: "Booking Done",
    label: "Booking Done",
    cls: SV_COLORS["Booking Done"]
  },
  {
    key: "Registration Done",
    label: "Registration Done",
    cls: SV_COLORS["Registration Done"]
  },
  { key: "Lead Close", label: "Lead Close", cls: SV_COLORS["Lead Close"] }
];
function exportToCSV(leads) {
  const headers = [
    "Sr.No",
    "Name",
    "Mobile",
    "Project",
    "Telecaller",
    "SV Status",
    "SV Next Followup",
    "Status Date",
    "SV Remark",
    "Age (Days)",
    "Latest Status",
    "Assigned Sales"
  ];
  const rows = leads.map((l) => [
    Number(l.srNo),
    `${l.firstName} ${l.lastName}`.trim(),
    l.mobileNo,
    l.projectName,
    l.telecaller,
    l.svStatus,
    l.svNextFollowup,
    l.statusDate,
    l.svRemark,
    leadAgeDays(l.leadDate),
    l.latestStatus,
    l.assignedSales
  ]);
  const csv = [headers, ...rows].map(
    (row) => row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "PropFlow_SV_Overview.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function SVCountBox({
  label,
  count,
  cls,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `sv-filter-${label.toLowerCase().replace(/\s+/g, "-")}`,
      className: `flex flex-col items-center justify-center rounded-lg border-2 px-3 py-2.5 cursor-pointer select-none transition-all min-w-[90px]
        ${cls} ${active ? "ring-2 ring-offset-1 ring-current scale-105 shadow-md" : "hover:scale-102 hover:shadow-sm"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl leading-none", children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] mt-0.5 text-center whitespace-nowrap", children: label })
      ]
    }
  );
}
function SVLeadRow({ lead, viewMode }) {
  const age = leadAgeDays(lead.leadDate);
  if (viewMode === "mobile") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg p-3 space-y-2",
        "data-ocid": `sv-lead-row-${lead.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
                "#",
                Number(lead.srNo)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body font-semibold text-foreground text-sm truncate", children: [
                lead.firstName,
                " ",
                lead.lastName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${lead.mobileNo}`,
                  className: "text-xs text-primary font-body flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
                    lead.mobileNo
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: lead.svStatus || "—", size: "sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 text-xs font-body text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted px-1.5 py-0.5 rounded", children: lead.projectName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted px-1.5 py-0.5 rounded", children: lead.telecaller }),
            lead.assignedSales && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent/10 text-accent-foreground px-1.5 py-0.5 rounded", children: lead.assignedSales })
          ] }),
          lead.svNextFollowup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-body text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Next: ",
              formatDateForDisplay(lead.svNextFollowup)
            ] })
          ] }),
          lead.svRemark && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body truncate", children: lead.svRemark })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "hover:bg-muted/40 transition-colors",
      "data-ocid": `sv-lead-row-${lead.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground font-body whitespace-nowrap", children: Number(lead.srNo) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-body text-sm font-medium text-foreground truncate max-w-[130px]", children: [
          lead.firstName,
          " ",
          lead.lastName
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${lead.mobileNo}`,
            className: "text-xs text-primary font-body hover:underline flex items-center gap-1 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
              lead.mobileNo
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs font-body text-foreground whitespace-nowrap max-w-[100px] truncate", children: lead.projectName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap", children: lead.telecaller }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap", children: lead.assignedSales || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: lead.svStatus || "—", size: "sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap", children: formatDateForDisplay(lead.svNextFollowup) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap", children: formatDateForDisplay(lead.statusDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs font-body text-muted-foreground max-w-[150px] truncate", children: lead.svRemark || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-xs font-body text-muted-foreground text-right whitespace-nowrap", children: [
          age,
          "d"
        ] })
      ]
    }
  );
}
function AdminSVOverview() {
  const searchParams = useSearch({ strict: false });
  const initialSvFilter = (() => {
    const sv = searchParams == null ? void 0 : searchParams.svStatus;
    if (sv && SV_STATUSES.includes(sv))
      return sv;
    return "All";
  })();
  const { data: allLeads = [], isLoading } = useAllLeads();
  const [svFilter, setSvFilter] = reactExports.useState(initialSvFilter);
  const [salesFilter, setSalesFilter] = reactExports.useState("All");
  const [projectFilter, setProjectFilter] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [sortField, setSortField] = reactExports.useState("svNextFollowup");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [viewMode] = reactExports.useState(() => {
    try {
      const raw = sessionStorage.getItem("propflow_session");
      if (raw)
        return JSON.parse(raw).viewMode ?? "desktop";
    } catch {
    }
    return "desktop";
  });
  const svLeads = reactExports.useMemo(
    () => allLeads.filter((l) => !!l.svStatus || !!l.assignedSales),
    [allLeads]
  );
  const svCounts = reactExports.useMemo(() => {
    const counts = { All: svLeads.length };
    for (const sv of SV_STATUSES) counts[sv] = 0;
    for (const l of svLeads) {
      if (l.svStatus && counts[l.svStatus] !== void 0) counts[l.svStatus]++;
    }
    return counts;
  }, [svLeads]);
  const uniqueProjects = reactExports.useMemo(
    () => Array.from(new Set(svLeads.map((l) => l.projectName).filter(Boolean))),
    [svLeads]
  );
  const uniqueSales = reactExports.useMemo(
    () => Array.from(new Set(svLeads.map((l) => l.assignedSales).filter(Boolean))),
    [svLeads]
  );
  const filtered = reactExports.useMemo(() => {
    let result = [...svLeads];
    if (svFilter !== "All")
      result = result.filter((l) => l.svStatus === svFilter);
    if (projectFilter !== "All")
      result = result.filter((l) => l.projectName === projectFilter);
    if (salesFilter !== "All")
      result = result.filter((l) => l.assignedSales === salesFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (l) => {
          var _a, _b;
          return `${l.firstName} ${l.lastName}`.toLowerCase().includes(q) || l.mobileNo.includes(q) || ((_a = l.svRemark) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_b = l.assignedSales) == null ? void 0 : _b.toLowerCase().includes(q));
        }
      );
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "srNo") cmp = Number(a.srNo) - Number(b.srNo);
      else if (sortField === "name")
        cmp = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      else if (sortField === "svStatus")
        cmp = (a.svStatus || "").localeCompare(b.svStatus || "");
      else if (sortField === "svNextFollowup")
        cmp = parseDate(a.svNextFollowup) - parseDate(b.svNextFollowup);
      else if (sortField === "statusDate")
        cmp = parseDate(a.statusDate) - parseDate(b.statusDate);
      else if (sortField === "age")
        cmp = leadAgeDays(a.leadDate) - leadAgeDays(b.leadDate);
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [
    svLeads,
    svFilter,
    projectFilter,
    salesFilter,
    search,
    sortField,
    sortDir
  ]);
  function toggleSort(field) {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }
  const SortIcon = ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ArrowUpDown,
    {
      size: 11,
      className: `ml-0.5 inline ${sortField === field ? "text-primary" : "text-muted-foreground/40"}`
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Layout,
    {
      title: "SV Status Overview",
      headerRight: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => exportToCSV(filtered),
          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-body hover:bg-primary/90 transition-smooth",
          "data-ocid": "btn-export-sv",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Export CSV" })
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 18, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg", children: "Sales Person SV Leads" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "All leads with SV status assigned to Sales Persons" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "sv-count-boxes", children: SV_STATUS_CONFIG.map(({ key, label, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SVCountBox,
          {
            label,
            count: svCounts[key] ?? 0,
            cls,
            active: svFilter === key,
            onClick: () => setSvFilter((prev) => prev === key ? "All" : key)
          },
          key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: projectFilter,
              onChange: (e) => setProjectFilter(e.target.value),
              className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
              "data-ocid": "sv-filter-project",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Projects" }),
                uniqueProjects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: salesFilter,
              onChange: (e) => setSalesFilter(e.target.value),
              className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
              "data-ocid": "sv-filter-sales",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Sales" }),
                uniqueSales.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
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
                placeholder: "Search name, mobile, remark, sales…",
                className: "w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "sv-search"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: filtered.length }),
              " of",
              " ",
              svLeads.length,
              " leads"
            ] })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["sv1", "sv2", "sv3", "sv4", "sv5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-10 bg-muted/60 rounded-lg animate-pulse"
          },
          k
        )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "sv-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 40, className: "text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No SV leads found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: svFilter !== "All" ? `No leads with SV status "${svFilter}"` : "No leads have been assigned to a Sales Person yet." })
            ]
          }
        ) : viewMode === "mobile" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SVLeadRow,
          {
            lead,
            viewMode: "mobile"
          },
          lead.id.toString()
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-left border-collapse",
              "data-ocid": "sv-leads-table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: [
                  { label: "Sr", field: "srNo" },
                  { label: "Name", field: "name" },
                  { label: "Mobile", field: null },
                  { label: "Project", field: null },
                  { label: "Telecaller", field: null },
                  { label: "Sales", field: null },
                  { label: "SV Status", field: "svStatus" },
                  {
                    label: "Next Followup",
                    field: "svNextFollowup"
                  },
                  {
                    label: "Status Date",
                    field: "statusDate"
                  },
                  { label: "SV Remark", field: null },
                  { label: "Age", field: "age" }
                ].map(({ label, field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "th",
                  {
                    className: `px-3 py-2.5 text-xs font-body font-semibold text-muted-foreground whitespace-nowrap uppercase tracking-wide ${field ? "cursor-pointer hover:text-foreground select-none" : ""}`,
                    onClick: field ? () => toggleSort(field) : void 0,
                    onKeyDown: field ? (e) => {
                      if (e.key === "Enter") toggleSort(field);
                    } : void 0,
                    children: [
                      label,
                      field && /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field })
                    ]
                  },
                  label
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SVLeadRow,
                  {
                    lead,
                    viewMode: "desktop"
                  },
                  lead.id.toString()
                )) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-4 py-2 flex flex-wrap gap-4 bg-muted/20", children: SV_STATUSES.map((sv) => {
            const cnt = filtered.filter((l) => l.svStatus === sv).length;
            if (!cnt) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-body text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: sv, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-semibold text-foreground", children: cnt })
                ]
              },
              sv
            );
          }) })
        ] })
      ] })
    }
  );
}
export {
  AdminSVOverview as default
};
