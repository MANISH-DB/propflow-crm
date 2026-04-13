import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Bell,
  Calendar,
  ChevronDown,
  Download,
  Eye,
  LogOut,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CallHistoryModal } from "../components/CallHistoryModal";
import { PropFlowLogo } from "../components/Layout";
import { LeadAgingBoxes } from "../components/LeadAgingBoxes";
import { LeadStatusBoxes } from "../components/LeadStatusBoxes";
import { LeadTable } from "../components/LeadTable";
import { LeadUpdateModal } from "../components/LeadUpdateModal";
import { useAuth } from "../context/AuthContext";
import { useCallHistory } from "../hooks/useCallHistory";
import { useAllLeads } from "../hooks/useLeads";
import { useUniqueProjectNames } from "../hooks/useProjects";
import type { Lead } from "../types";
import { fromInputDate, isToday, leadAgeDays } from "../utils/dateUtils";
import TelecallerTasksPage from "./TelecallerTasksPage";

type Tab = "dashboard" | "calllog" | "todaycalllog" | "tasks";

// -- Excel/CSV export --
function exportLeadsCSV(rows: Lead[], filename: string) {
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
    "Sales",
  ];
  const csvRows = [
    headers.join(","),
    ...rows.map((l) =>
      [
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
        `"${l.assignedSales}"`,
      ].join(","),
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// -- Call Reminder section --
function CallReminders({
  leads,
  onUpdate,
}: {
  leads: Lead[];
  onUpdate: (l: Lead) => void;
}) {
  const reminders = leads.filter((l) => {
    if (!l.latestStatusDate) return false;
    const latestIsToday = isToday(l.latestStatusDate);
    const lastCallIsToday = isToday(l.statusDate);
    return latestIsToday && !lastCallIsToday;
  });
  if (reminders.length === 0) return null;
  return (
    <div
      className="rounded-xl border border-amber-200 bg-amber-50/60 p-3"
      data-ocid="call-reminders-section"
    >
      <div className="flex items-center gap-2 mb-2">
        <Bell size={14} className="text-amber-600" />
        <span className="text-xs font-display font-semibold text-amber-800 uppercase tracking-wide">
          Call Reminders ({reminders.length})
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {reminders.map((l) => (
          <div
            key={l.id.toString()}
            className="flex items-center gap-2 bg-card border border-amber-200 rounded-lg px-3 py-1.5"
          >
            <AlertCircle size={12} className="text-amber-600 flex-shrink-0" />
            <span className="text-xs font-body font-medium text-foreground">
              {l.firstName}
            </span>
            <a
              href={`tel:${l.mobileNo}`}
              className="text-xs text-primary font-mono hover:underline"
            >
              {l.mobileNo}
            </a>
            <button
              type="button"
              onClick={() => onUpdate(l)}
              className="text-[10px] px-2 py-0.5 rounded bg-amber-600 text-white hover:bg-amber-700 transition-smooth font-body"
              data-ocid="btn-reminder-update"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// -- Internal CallLog Table --
interface CallLogEntry {
  date: string;
  name: string;
  mobile: string;
  status: string;
  remark: string;
  telecaller: string;
  projectName: string;
}

function CallLogTable({ entries }: { entries: CallLogEntry[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(
      (e) =>
        e.mobile.includes(q) ||
        e.name.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q) ||
        e.projectName.toLowerCase().includes(q),
    );
  }, [entries, search]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, mobile, status, project…"
          className="w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-card text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          data-ocid="input-calllog-search"
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-xs font-body">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              {[
                "Date",
                "Name",
                "Mobile",
                "Status",
                "Remark",
                "Telecaller",
                "Project",
              ].map((col) => (
                <th
                  key={col}
                  className="px-3 py-2.5 text-left text-[10px] font-display font-semibold text-primary uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-10 text-center text-muted-foreground"
                  data-ocid="calllog-empty"
                >
                  No call records found
                </td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr
                  key={`${e.date}-${e.mobile}-${i}`}
                  className={`border-b border-border hover:bg-muted/40 ${i % 2 === 1 ? "bg-muted/10" : ""}`}
                >
                  <td className="px-3 py-2 font-mono whitespace-nowrap">
                    {e.date || "—"}
                  </td>
                  <td className="px-3 py-2 font-body text-foreground">
                    {e.name}
                  </td>
                  <td className="px-3 py-2">
                    <a
                      href={`tel:${e.mobile}`}
                      className="text-primary hover:underline font-mono"
                    >
                      {e.mobile}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-body font-medium bg-primary/10 text-primary border-primary/20">
                      {e.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 max-w-[200px]">
                    <span className="line-clamp-1 text-muted-foreground">
                      {e.remark || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {e.telecaller}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {e.projectName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -- Main Dashboard --
export default function TelecallerDashboard() {
  const { session, logout, setProjectFilter, setViewMode } = useAuth();
  const qc = useQueryClient();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [agingFilter, setAgingFilter] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusDateFilter, setStatusDateFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [callHistoryLead, setCallHistoryLead] = useState<Lead | null>(null);

  const viewMode = session?.viewMode ?? "desktop";
  const projectFilter = session?.projectFilter ?? "All Projects";
  const username = session?.username ?? "";

  const { data: allLeads = [], isLoading } = useAllLeads();
  const { data: projectNames = [] } = useUniqueProjectNames();
  // Pass telecaller name for filtering — backend filters by telecaller name
  const { data: callHistory = [] } = useCallHistory(username || null);

  function handleRefresh() {
    qc.invalidateQueries();
  }

  // My leads filtered by telecaller name (frontend filter for reliability)
  const myLeads = useMemo(() => {
    if (!username) return allLeads;
    return allLeads.filter((l) => l.telecaller === username);
  }, [allLeads, username]);

  // Project filter
  const projectFiltered = useMemo(() => {
    if (!projectFilter || projectFilter === "All Projects") return myLeads;
    return myLeads.filter((l) => l.projectName === projectFilter);
  }, [myLeads, projectFilter]);

  // Auto-sort by latestStatusDate descending
  const sortedLeads = useMemo(
    () =>
      [...projectFiltered].sort((a, b) => {
        if (a.latestStatusDate > b.latestStatusDate) return -1;
        if (a.latestStatusDate < b.latestStatusDate) return 1;
        return 0;
      }),
    [projectFiltered],
  );

  // Status filter
  const QUALIFIED_STATUSES = ["Share Brochure", "Follow-up", "SV Plan"];
  const statusFiltered = useMemo(() => {
    if (!statusFilter || statusFilter === "total") return sortedLeads;
    if (statusFilter === "Qualified")
      return sortedLeads.filter((l) =>
        QUALIFIED_STATUSES.includes(l.latestStatus),
      );
    if (statusFilter === "New")
      return sortedLeads.filter(
        (l) =>
          !l.latestStatus || l.latestStatus === "" || l.latestStatus === "New",
      );
    return sortedLeads.filter((l) => l.latestStatus === statusFilter);
  }, [sortedLeads, statusFilter]);

  // Aging filter
  const AGING_RANGES: Record<string, [number, number]> = {
    "0-9": [0, 9],
    "10-19": [10, 19],
    "20-29": [20, 29],
    "30-59": [30, 59],
    "60-90": [60, 90],
    "90+": [91, 99999],
  };
  const EXCLUDE_AGING = ["Lost", "Qualified1"];
  const agingFiltered = useMemo(() => {
    if (!agingFilter) return statusFiltered;
    const [min, max] = AGING_RANGES[agingFilter] ?? [0, 99999];
    return statusFiltered.filter((l) => {
      if (EXCLUDE_AGING.includes(l.latestStatus)) return false;
      const age = leadAgeDays(l.leadDate);
      return age >= min && age <= max;
    });
  }, [statusFiltered, agingFilter]);

  // Text + date + statusDate search
  const filteredLeads = useMemo(() => {
    let result = agingFiltered;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(
        (l) =>
          l.firstName.toLowerCase().includes(q) ||
          l.lastName.toLowerCase().includes(q) ||
          l.mobileNo.includes(q) ||
          l.remarks1.toLowerCase().includes(q),
      );
    }
    // Status date partial match (DD/MMM/YYYY)
    if (statusDateFilter.trim()) {
      const q = statusDateFilter.trim().toLowerCase();
      result = result.filter((l) =>
        (l.latestStatusDate || "").toLowerCase().includes(q),
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

  // Today calls — filter by username from call history
  const myCallHistory = useMemo(
    () => callHistory.filter((h) => !username || h.telecaller === username),
    [callHistory, username],
  );

  const todayCallCount = useMemo(
    () => myCallHistory.filter((h) => isToday(h.date)).length,
    [myCallHistory],
  );
  const todayCallLog = useMemo(
    () =>
      myCallHistory
        .filter((h) => isToday(h.date))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [myCallHistory],
  );

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "calllog", label: "My Call Log" },
    { key: "todaycalllog", label: "Today Call Log", badge: todayCallCount },
    { key: "tasks", label: "My Task" },
  ];

  const hasActiveFilters =
    !!searchText ||
    !!statusDateFilter ||
    !!dateFrom ||
    !!dateTo ||
    !!statusFilter ||
    !!agingFilter;

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* ---- HEADER ---- */}
      <header className="bg-sidebar border-b border-sidebar-border flex-shrink-0 px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <PropFlowLogo compact={false} />
          <div className="hidden sm:flex flex-col leading-none border-l border-sidebar-border pl-3 min-w-0">
            <span className="text-sidebar-foreground text-xs font-body font-medium truncate">
              {username || "Telecaller"}
            </span>
            {projectFilter && projectFilter !== "All Projects" && (
              <span className="text-sidebar-primary text-[10px] font-body truncate">
                {projectFilter}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Project dropdown */}
          <div className="relative">
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="appearance-none pl-2.5 pr-6 py-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground text-xs font-body focus:outline-none focus:ring-1 focus:ring-sidebar-ring cursor-pointer"
              data-ocid="select-project-filter"
            >
              <option value="All Projects">All Projects</option>
              {projectNames.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sidebar-accent-foreground pointer-events-none"
            />
          </div>

          {/* View toggle */}
          <button
            type="button"
            onClick={() =>
              setViewMode(viewMode === "desktop" ? "mobile" : "desktop")
            }
            className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground text-xs font-body hover:bg-sidebar-border transition-smooth"
            data-ocid="toggle-view-mode"
            title={`Switch to ${viewMode === "desktop" ? "Mobile" : "Desktop"} view`}
          >
            {viewMode === "desktop" ? (
              <Smartphone size={12} />
            ) : (
              <Eye size={12} />
            )}
            <span className="hidden sm:inline">
              {viewMode === "desktop" ? "Mobile" : "Desktop"}
            </span>
          </button>

          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            className="p-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground hover:bg-sidebar-border transition-smooth"
            title="Refresh data"
            data-ocid="btn-refresh"
          >
            <RefreshCw size={14} />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-body transition-smooth"
            data-ocid="btn-logout"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ---- NAV TABS ---- */}
      <div className="bg-card border-b border-border flex-shrink-0 px-4 flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`tab-${tab.key}`}
            className={`
              relative flex items-center gap-1.5 px-3 py-2.5 text-xs font-body font-medium whitespace-nowrap
              border-b-2 transition-smooth
              ${
                activeTab === tab.key
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/30"
              }
            `}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-bold leading-none">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <main className="flex-1 overflow-y-auto bg-background">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="p-4 space-y-4">
            {/* Status count boxes */}
            <LeadStatusBoxes
              leads={projectFiltered}
              activeFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />

            {/* Aging boxes */}
            <LeadAgingBoxes
              leads={projectFiltered}
              activeFilter={agingFilter}
              onFilterChange={setAgingFilter}
            />

            {/* Call reminders */}
            <CallReminders leads={projectFiltered} onUpdate={setSelectedLead} />

            {/* Search + filter bar */}
            <div
              className="flex flex-wrap gap-2 items-center"
              data-ocid="search-filter-bar"
            >
              {/* Name/Mobile/Remark search */}
              <div className="relative flex-1 min-w-[180px]">
                <Search
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Name, Mobile, Remark…"
                  className="w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-card text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="input-search"
                />
              </div>

              {/* Status Date filter */}
              <div className="relative min-w-[160px]">
                <Calendar
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={statusDateFilter}
                  onChange={(e) => setStatusDateFilter(e.target.value)}
                  placeholder="Status Date (Apr/2026…)"
                  className="w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-card text-xs font-mono text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="input-status-date-filter"
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <Calendar
                  size={12}
                  className="text-muted-foreground flex-shrink-0"
                />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-2 py-1.5 rounded-md border border-input bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="input-date-from"
                />
                <span className="text-muted-foreground text-xs">–</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-2 py-1.5 rounded-md border border-input bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="input-date-to"
                />
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchText("");
                      setStatusDateFilter("");
                      setDateFrom("");
                      setDateTo("");
                      setStatusFilter(null);
                      setAgingFilter(null);
                    }}
                    className="text-xs text-muted-foreground hover:text-destructive underline transition-smooth font-body"
                    data-ocid="btn-clear-filters"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  exportLeadsCSV(
                    filteredLeads,
                    `leads-${username}-${new Date().toISOString().slice(0, 10)}`,
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth"
                data-ocid="btn-export-excel"
              >
                <Download size={12} />
                Export
              </button>
            </div>

            {/* Lead Table */}
            <LeadTable
              leads={filteredLeads}
              viewMode={viewMode}
              isLoading={isLoading}
              onLeadUpdate={setSelectedLead}
              onCallHistory={setCallHistoryLead}
              callHistoryAll={myCallHistory}
            />
          </div>
        )}

        {/* MY CALL LOG */}
        {activeTab === "calllog" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-foreground text-sm">
                  My Call Log
                </h2>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  Total: {myCallHistory.length} entries
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  exportLeadsCSV(myLeads, `my-calllog-${username}`)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-body text-muted-foreground hover:bg-muted transition-smooth"
                data-ocid="btn-export-calllog"
              >
                <Download size={12} /> Export
              </button>
            </div>
            <CallLogTable entries={myCallHistory} />
          </div>
        )}

        {/* TODAY CALL LOG */}
        {activeTab === "todaycalllog" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display font-semibold text-foreground text-sm">
                Today's Calls
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-body font-semibold">
                {todayCallCount}
              </span>
            </div>
            <CallLogTable entries={todayCallLog} />
          </div>
        )}

        {/* TASKS */}
        {activeTab === "tasks" && <TelecallerTasksPage />}
      </main>

      {/* ---- MODALS ---- */}
      {selectedLead && (
        <LeadUpdateModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
      {callHistoryLead && (
        <CallHistoryModal
          mobileNo={callHistoryLead.mobileNo}
          leadName={`${callHistoryLead.firstName} ${callHistoryLead.lastName}`}
          onClose={() => setCallHistoryLead(null)}
        />
      )}
    </div>
  );
}
