import { useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpDown,
  Building2,
  CalendarDays,
  Download,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useAllLeads } from "../hooks/useLeads";
import { SV_STATUSES } from "../types";
import type { Lead } from "../types";
import { formatDateForDisplay, leadAgeDays } from "../utils/dateUtils";

// ── helpers ───────────────────────────────────────────────────────────────────

function parseDate(str: string): number {
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
    "Dec",
  ];
  const parts = str.split("/");
  if (parts.length !== 3) return 0;
  const [d, m, y] = parts;
  const mi = months.findIndex((mo) => mo.toLowerCase() === m?.toLowerCase());
  if (mi === -1) return 0;
  return new Date(Number(y), mi, Number(d)).getTime();
}

type SortField =
  | "srNo"
  | "name"
  | "svStatus"
  | "svNextFollowup"
  | "statusDate"
  | "age";
type SortDir = "asc" | "desc";

const SV_COLORS: Record<string, string> = {
  "Next Followup": "border-accent/40 bg-accent/10 text-accent-foreground",
  "SV Rescheduled": "border-amber-300 bg-amber-50 text-amber-700",
  "Booking Done": "border-emerald-300 bg-emerald-50 text-emerald-700",
  "Registration Done": "border-green-300 bg-green-50 text-green-700",
  "Lead Close": "border-muted-foreground/30 bg-muted text-muted-foreground",
};

const SV_STATUS_CONFIG = [
  {
    key: "All",
    label: "All",
    cls: "border-primary/30 bg-primary/5 text-primary",
  },
  {
    key: "Next Followup",
    label: "Next Followup",
    cls: SV_COLORS["Next Followup"],
  },
  {
    key: "SV Rescheduled",
    label: "SV Rescheduled",
    cls: SV_COLORS["SV Rescheduled"],
  },
  {
    key: "Booking Done",
    label: "Booking Done",
    cls: SV_COLORS["Booking Done"],
  },
  {
    key: "Registration Done",
    label: "Registration Done",
    cls: SV_COLORS["Registration Done"],
  },
  { key: "Lead Close", label: "Lead Close", cls: SV_COLORS["Lead Close"] },
] as const;

function exportToCSV(leads: Lead[]) {
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
    "Assigned Sales",
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
    l.assignedSales,
  ]);
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "PropFlow_SV_Overview.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ── SV Count Box ─────────────────────────────────────────────────────────────

function SVCountBox({
  label,
  count,
  cls,
  active,
  onClick,
}: {
  label: string;
  count: number;
  cls: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`sv-filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={`flex flex-col items-center justify-center rounded-lg border-2 px-3 py-2.5 cursor-pointer select-none transition-all min-w-[90px]
        ${cls} ${active ? "ring-2 ring-offset-1 ring-current scale-105 shadow-md" : "hover:scale-102 hover:shadow-sm"}`}
    >
      <span className="font-display font-bold text-2xl leading-none">
        {count}
      </span>
      <span className="font-body text-[11px] mt-0.5 text-center whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

// ── Lead Row ─────────────────────────────────────────────────────────────────

function SVLeadRow({ lead, viewMode }: { lead: Lead; viewMode: string }) {
  const age = leadAgeDays(lead.leadDate);

  if (viewMode === "mobile") {
    return (
      <div
        className="bg-card border border-border rounded-lg p-3 space-y-2"
        data-ocid={`sv-lead-row-${lead.id}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-xs text-muted-foreground font-body">
              #{Number(lead.srNo)}
            </span>
            <p className="font-body font-semibold text-foreground text-sm truncate">
              {lead.firstName} {lead.lastName}
            </p>
            <a
              href={`tel:${lead.mobileNo}`}
              className="text-xs text-primary font-body flex items-center gap-1"
            >
              <Phone size={10} />
              {lead.mobileNo}
            </a>
          </div>
          <StatusBadge status={lead.svStatus || "—"} size="sm" />
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-body text-muted-foreground">
          <span className="bg-muted px-1.5 py-0.5 rounded">
            {lead.projectName}
          </span>
          <span className="bg-muted px-1.5 py-0.5 rounded">
            {lead.telecaller}
          </span>
          {lead.assignedSales && (
            <span className="bg-accent/10 text-accent-foreground px-1.5 py-0.5 rounded">
              {lead.assignedSales}
            </span>
          )}
        </div>
        {lead.svNextFollowup && (
          <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
            <CalendarDays size={11} />
            <span>Next: {formatDateForDisplay(lead.svNextFollowup)}</span>
          </div>
        )}
        {lead.svRemark && (
          <p className="text-xs text-muted-foreground font-body truncate">
            {lead.svRemark}
          </p>
        )}
      </div>
    );
  }

  return (
    <tr
      className="hover:bg-muted/40 transition-colors"
      data-ocid={`sv-lead-row-${lead.id}`}
    >
      <td className="px-3 py-2.5 text-xs text-muted-foreground font-body whitespace-nowrap">
        {Number(lead.srNo)}
      </td>
      <td className="px-3 py-2.5">
        <div className="font-body text-sm font-medium text-foreground truncate max-w-[130px]">
          {lead.firstName} {lead.lastName}
        </div>
      </td>
      <td className="px-3 py-2.5">
        <a
          href={`tel:${lead.mobileNo}`}
          className="text-xs text-primary font-body hover:underline flex items-center gap-1 whitespace-nowrap"
        >
          <Phone size={10} />
          {lead.mobileNo}
        </a>
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-foreground whitespace-nowrap max-w-[100px] truncate">
        {lead.projectName}
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap">
        {lead.telecaller}
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap">
        {lead.assignedSales || "—"}
      </td>
      <td className="px-3 py-2.5">
        <StatusBadge status={lead.svStatus || "—"} size="sm" />
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap">
        {formatDateForDisplay(lead.svNextFollowup)}
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-muted-foreground whitespace-nowrap">
        {formatDateForDisplay(lead.statusDate)}
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-muted-foreground max-w-[150px] truncate">
        {lead.svRemark || "—"}
      </td>
      <td className="px-3 py-2.5 text-xs font-body text-muted-foreground text-right whitespace-nowrap">
        {age}d
      </td>
    </tr>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminSVOverview() {
  // Get svStatus from query string if present (for deep-link from dashboard)
  const searchParams = useSearch({ strict: false }) as { svStatus?: string };
  const initialSvFilter = (() => {
    const sv = searchParams?.svStatus;
    if (sv && SV_STATUSES.includes(sv as (typeof SV_STATUSES)[number]))
      return sv;
    return "All";
  })();

  const { data: allLeads = [], isLoading } = useAllLeads();

  const [svFilter, setSvFilter] = useState(initialSvFilter);
  const [salesFilter, setSalesFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("svNextFollowup");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [viewMode] = useState<"desktop" | "mobile">(() => {
    try {
      const raw = sessionStorage.getItem("propflow_session");
      if (raw)
        return (
          (JSON.parse(raw) as { viewMode?: "desktop" | "mobile" }).viewMode ??
          "desktop"
        );
    } catch {
      /* ignore */
    }
    return "desktop";
  });

  // Only leads that have an SV status (i.e. assigned to a sales person)
  const svLeads = useMemo(
    () => allLeads.filter((l) => !!l.svStatus || !!l.assignedSales),
    [allLeads],
  );

  const svCounts = useMemo(() => {
    const counts: Record<string, number> = { All: svLeads.length };
    for (const sv of SV_STATUSES) counts[sv] = 0;
    for (const l of svLeads) {
      if (l.svStatus && counts[l.svStatus] !== undefined) counts[l.svStatus]++;
    }
    return counts;
  }, [svLeads]);

  const uniqueProjects = useMemo(
    () =>
      Array.from(new Set(svLeads.map((l) => l.projectName).filter(Boolean))),
    [svLeads],
  );
  const uniqueSales = useMemo(
    () =>
      Array.from(new Set(svLeads.map((l) => l.assignedSales).filter(Boolean))),
    [svLeads],
  );

  const filtered = useMemo(() => {
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
        (l) =>
          `${l.firstName} ${l.lastName}`.toLowerCase().includes(q) ||
          l.mobileNo.includes(q) ||
          l.svRemark?.toLowerCase().includes(q) ||
          l.assignedSales?.toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "srNo") cmp = Number(a.srNo) - Number(b.srNo);
      else if (sortField === "name")
        cmp = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
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
    sortDir,
  ]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => (
    <ArrowUpDown
      size={11}
      className={`ml-0.5 inline ${sortField === field ? "text-primary" : "text-muted-foreground/40"}`}
    />
  );

  return (
    <Layout
      title="SV Status Overview"
      headerRight={
        <button
          type="button"
          onClick={() => exportToCSV(filtered)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-body hover:bg-primary/90 transition-smooth"
          data-ocid="btn-export-sv"
        >
          <Download size={13} />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      }
    >
      <div className="p-4 space-y-4">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground text-lg">
              Sales Person SV Leads
            </h2>
            <p className="text-xs text-muted-foreground font-body">
              All leads with SV status assigned to Sales Persons
            </p>
          </div>
        </div>

        {/* ── SV Status Count Boxes ────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2" data-ocid="sv-count-boxes">
          {SV_STATUS_CONFIG.map(({ key, label, cls }) => (
            <SVCountBox
              key={key}
              label={label}
              count={svCounts[key] ?? 0}
              cls={cls}
              active={svFilter === key}
              onClick={() =>
                setSvFilter((prev) => (prev === key ? "All" : key))
              }
            />
          ))}
        </div>

        {/* ── Filters + Search ─────────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-xl p-3 flex flex-wrap gap-2 items-center">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="sv-filter-project"
          >
            <option value="All">All Projects</option>
            {uniqueProjects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={salesFilter}
            onChange={(e) => setSalesFilter(e.target.value)}
            className="h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="sv-filter-sales"
          >
            <option value="All">All Sales</option>
            {uniqueSales.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, remark, sales…"
              className="w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              data-ocid="sv-search"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body ml-auto">
            <Users size={13} />
            <span>
              <strong className="text-foreground">{filtered.length}</strong> of{" "}
              {svLeads.length} leads
            </span>
          </div>
        </div>

        {/* ── Table / Cards ────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="space-y-2">
            {["sv1", "sv2", "sv3", "sv4", "sv5"].map((k) => (
              <div
                key={k}
                className="h-10 bg-muted/60 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="sv-empty-state"
          >
            <Building2 size={40} className="text-muted-foreground/30 mb-3" />
            <p className="font-display font-semibold text-foreground">
              No SV leads found
            </p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {svFilter !== "All"
                ? `No leads with SV status "${svFilter}"`
                : "No leads have been assigned to a Sales Person yet."}
            </p>
          </div>
        ) : viewMode === "mobile" ? (
          <div className="space-y-2">
            {filtered.map((lead) => (
              <SVLeadRow
                key={lead.id.toString()}
                lead={lead}
                viewMode="mobile"
              />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="w-full text-left border-collapse"
                data-ocid="sv-leads-table"
              >
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {[
                      { label: "Sr", field: "srNo" as SortField },
                      { label: "Name", field: "name" as SortField },
                      { label: "Mobile", field: null },
                      { label: "Project", field: null },
                      { label: "Telecaller", field: null },
                      { label: "Sales", field: null },
                      { label: "SV Status", field: "svStatus" as SortField },
                      {
                        label: "Next Followup",
                        field: "svNextFollowup" as SortField,
                      },
                      {
                        label: "Status Date",
                        field: "statusDate" as SortField,
                      },
                      { label: "SV Remark", field: null },
                      { label: "Age", field: "age" as SortField },
                    ].map(({ label, field }) => (
                      <th
                        key={label}
                        className={`px-3 py-2.5 text-xs font-body font-semibold text-muted-foreground whitespace-nowrap uppercase tracking-wide ${field ? "cursor-pointer hover:text-foreground select-none" : ""}`}
                        onClick={field ? () => toggleSort(field) : undefined}
                        onKeyDown={
                          field
                            ? (e) => {
                                if (e.key === "Enter") toggleSort(field);
                              }
                            : undefined
                        }
                      >
                        {label}
                        {field && <SortIcon field={field} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((lead) => (
                    <SVLeadRow
                      key={lead.id.toString()}
                      lead={lead}
                      viewMode="desktop"
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Summary Footer ──────────────────────────────────────── */}
            <div className="border-t border-border px-4 py-2 flex flex-wrap gap-4 bg-muted/20">
              {SV_STATUSES.map((sv) => {
                const cnt = filtered.filter((l) => l.svStatus === sv).length;
                if (!cnt) return null;
                return (
                  <span
                    key={sv}
                    className="text-xs font-body text-muted-foreground"
                  >
                    <StatusBadge status={sv} size="sm" />
                    <span className="ml-1 font-semibold text-foreground">
                      {cnt}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
