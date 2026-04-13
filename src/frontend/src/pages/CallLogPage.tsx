import { useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Download,
  Phone,
  PhoneCall,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useCallHistory, useSalesCallHistory } from "../hooks/useCallHistory";
import type { CallHistory, SalesCallHistory } from "../types";
import { isToday, parseDate, todayStr } from "../utils/dateUtils";

// ---- Unified row type for merged view ----
interface UnifiedCallRow {
  date: string;
  name: string;
  mobile: string;
  status: string;
  remark: string;
  person: string;
  projectName: string;
  role: "Telecaller" | "Sales";
}

function toUnifiedFromCall(c: CallHistory): UnifiedCallRow {
  return {
    date: c.date,
    name: c.name,
    mobile: c.mobile,
    status: c.status,
    remark: c.remark,
    person: c.telecaller,
    projectName: c.projectName,
    role: "Telecaller",
  };
}

function toUnifiedFromSales(s: SalesCallHistory): UnifiedCallRow {
  return {
    date: s.date,
    name: s.name,
    mobile: s.mobile,
    status: s.status,
    remark: s.remark,
    person: s.salesPerson,
    projectName: s.projectName,
    role: "Sales",
  };
}

// ---- Summary stat box ----
function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl border ${
        accent
          ? "bg-accent/10 border-accent/30 text-accent-foreground"
          : "bg-card border-border"
      } min-w-[100px]`}
    >
      <span
        className={`text-2xl font-display font-bold ${accent ? "text-accent" : "text-primary"}`}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground font-body mt-0.5 text-center">
        {label}
      </span>
    </div>
  );
}

// ---- Role badge ----
function RoleBadge({ role }: { role: "Telecaller" | "Sales" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-body font-medium border ${
        role === "Telecaller"
          ? "bg-primary/10 text-primary border-primary/20"
          : "bg-accent/20 text-accent-foreground border-accent/30"
      }`}
    >
      {role}
    </span>
  );
}

// ---- Export helper ----
function exportToCSV(rows: UnifiedCallRow[], filename: string) {
  const header = [
    "Date",
    "Name",
    "Mobile",
    "Status",
    "Remark",
    "Person",
    "Project Name",
    "Role",
  ];
  const lines = rows.map((r) =>
    [
      r.date,
      r.name,
      r.mobile,
      r.status,
      r.remark,
      r.person,
      r.projectName,
      r.role,
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
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

// ---- Main Page ----
export default function CallLogPage() {
  const { session } = useAuth();
  const qc = useQueryClient();
  const role = session?.role ?? "telecaller";
  const username = session?.username ?? "";

  // Fetch call histories
  const telecallerName = role === "telecaller" ? username : null;
  const salesName = role === "sales" ? username : null;

  const { data: callData = [], isFetching: fetchingCalls } =
    useCallHistory(telecallerName);
  const { data: salesData = [], isFetching: fetchingSales } =
    useSalesCallHistory(role === "admin" ? null : salesName);

  // Build unified rows
  const allRows = useMemo<UnifiedCallRow[]>(() => {
    if (role === "telecaller") {
      return callData.map(toUnifiedFromCall);
    }
    if (role === "sales") {
      return salesData.map(toUnifiedFromSales);
    }
    // admin: merge all
    const calls = callData.map(toUnifiedFromCall);
    const sales = salesData.map(toUnifiedFromSales);
    return [...calls, ...sales].sort((a, b) => {
      // sort newest first by date string
      return b.date.localeCompare(a.date);
    });
  }, [role, callData, salesData]);

  // ---- Filters ----
  const [searchMobile, setSearchMobile] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchProject, setSearchProject] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [todayOnly, setTodayOnly] = useState(false);

  const today = todayStr();

  const filteredRows = useMemo(() => {
    return allRows.filter((r) => {
      if (todayOnly && r.date !== today) return false;
      if (
        searchMobile &&
        !r.mobile.toLowerCase().includes(searchMobile.toLowerCase())
      )
        return false;
      if (
        searchStatus &&
        !r.status.toLowerCase().includes(searchStatus.toLowerCase())
      )
        return false;
      if (
        searchProject &&
        !r.projectName.toLowerCase().includes(searchProject.toLowerCase())
      )
        return false;
      // date range filter — parse DD/MMM/YYYY strings to Date for correct comparison
      if (dateFrom) {
        const fromDate = parseDate(dateFrom);
        const rowDate = parseDate(r.date);
        if (
          !Number.isNaN(fromDate.getTime()) &&
          !Number.isNaN(rowDate.getTime()) &&
          rowDate < fromDate
        )
          return false;
      }
      if (dateTo) {
        const toDate = parseDate(dateTo);
        const rowDate = parseDate(r.date);
        if (
          !Number.isNaN(toDate.getTime()) &&
          !Number.isNaN(rowDate.getTime()) &&
          rowDate > toDate
        )
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
    today,
  ]);

  const totalCalls = allRows.length;
  const todayCalls = allRows.filter((r) => isToday(r.date)).length;

  const isFetching = fetchingCalls || fetchingSales;

  const pageTitle =
    role === "admin"
      ? "Call Log"
      : role === "sales"
        ? "My Call Log"
        : "My Call Log";

  function clearFilters() {
    setSearchMobile("");
    setSearchStatus("");
    setSearchProject("");
    setDateFrom("");
    setDateTo("");
    setTodayOnly(false);
  }

  const hasFilters =
    searchMobile ||
    searchStatus ||
    searchProject ||
    dateFrom ||
    dateTo ||
    todayOnly;

  return (
    <Layout title={pageTitle}>
      <div className="p-4 md:p-6 space-y-5">
        {/* Summary stats */}
        <div className="flex flex-wrap gap-3 items-center">
          <StatBox label="Total Calls" value={totalCalls} />
          <StatBox label="Today Calls" value={todayCalls} accent />

          <div className="ml-auto flex items-center gap-2">
            {/* Today filter toggle */}
            <button
              type="button"
              data-ocid="btn-today-calls"
              onClick={() => setTodayOnly((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body transition-smooth ${
                todayOnly
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <PhoneCall size={14} />
              Today Call
            </button>

            {/* Export */}
            <button
              type="button"
              data-ocid="btn-export-calls"
              onClick={() => exportToCSV(filteredRows, `call-log-${today}.csv`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted text-sm font-body transition-smooth"
            >
              <Download size={14} />
              Export CSV
            </button>

            {/* Refresh */}
            <button
              type="button"
              data-ocid="btn-refresh-calls"
              onClick={() =>
                qc.invalidateQueries({ queryKey: ["callHistory"] })
              }
              className={`p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-smooth ${isFetching ? "animate-spin" : ""}`}
              title="Refresh"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex flex-wrap gap-3 items-end">
            {/* Mobile search */}
            <div className="flex-1 min-w-[160px]">
              <label
                htmlFor="cl-mobile"
                className="text-xs text-muted-foreground font-body block mb-1"
              >
                Mobile
              </label>
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="cl-mobile"
                  type="text"
                  data-ocid="filter-mobile"
                  placeholder="Search mobile…"
                  value={searchMobile}
                  onChange={(e) => setSearchMobile(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Status filter */}
            <div className="flex-1 min-w-[140px]">
              <label
                htmlFor="cl-status"
                className="text-xs text-muted-foreground font-body block mb-1"
              >
                Status
              </label>
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="cl-status"
                  type="text"
                  data-ocid="filter-status"
                  placeholder="Filter status…"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Project filter */}
            <div className="flex-1 min-w-[160px]">
              <label
                htmlFor="cl-project"
                className="text-xs text-muted-foreground font-body block mb-1"
              >
                Project Name
              </label>
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="cl-project"
                  type="text"
                  data-ocid="filter-project"
                  placeholder="Filter project…"
                  value={searchProject}
                  onChange={(e) => setSearchProject(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Date from */}
            <div className="min-w-[130px]">
              <label
                htmlFor="cl-date-from"
                className="text-xs text-muted-foreground font-body block mb-1"
              >
                <Calendar size={11} className="inline mr-1" />
                Date From
              </label>
              <input
                id="cl-date-from"
                type="text"
                data-ocid="filter-date-from"
                placeholder="DD/MMM/YYYY"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Date to */}
            <div className="min-w-[130px]">
              <label
                htmlFor="cl-date-to"
                className="text-xs text-muted-foreground font-body block mb-1"
              >
                <Calendar size={11} className="inline mr-1" />
                Date To
              </label>
              <input
                id="cl-date-to"
                type="text"
                data-ocid="filter-date-to"
                placeholder="DD/MMM/YYYY"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm font-body hover:bg-destructive/10 transition-smooth"
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-body">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredRows.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {allRows.length}
            </span>{" "}
            records
          </p>
          {isFetching && (
            <span className="text-xs text-muted-foreground animate-pulse font-body">
              Loading…
            </span>
          )}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    Mobile
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    Remark
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    {role === "admin"
                      ? "Telecaller / Sales"
                      : role === "sales"
                        ? "Sales Person"
                        : "Telecaller"}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    Project Name
                  </th>
                  {role === "admin" && (
                    <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                      Role
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={role === "admin" ? 8 : 7}
                      className="py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Phone size={32} className="text-muted-foreground/40" />
                        <p className="text-muted-foreground font-body">
                          No call records found
                        </p>
                        {hasFilters && (
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="text-primary text-sm underline-offset-2 hover:underline"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => (
                    <tr
                      key={`${row.date}-${row.mobile}-${idx}`}
                      data-ocid={`call-row-${idx}`}
                      className="border-b border-border/60 hover:bg-muted/30 transition-smooth"
                    >
                      <td className="px-4 py-2.5 whitespace-nowrap text-foreground">
                        <span
                          className={
                            isToday(row.date) ? "text-accent font-semibold" : ""
                          }
                        >
                          {row.date || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-foreground font-medium max-w-[130px] truncate">
                        {row.name || "—"}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <a
                          href={`tel:${row.mobile}`}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Phone size={12} />
                          {row.mobile}
                        </a>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border bg-primary/8 text-primary border-primary/20">
                          {row.status || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground max-w-[200px] truncate">
                        {row.remark || "—"}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-foreground">
                        {row.person || "—"}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap text-foreground">
                        {row.projectName || "—"}
                      </td>
                      {role === "admin" && (
                        <td className="px-4 py-2.5">
                          <RoleBadge role={row.role} />
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Branding footer */}
        <p className="text-center text-xs text-muted-foreground font-body py-2">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </Layout>
  );
}
