import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpDown,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  History,
  Phone,
  PhoneCall,
  PhoneIncoming,
  RefreshCw,
  Search,
  TrendingUp,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  FullCallLogModal,
  SalesCallHistoryModal,
} from "../components/CallHistoryModal";
import { SalesLeadUpdateModal } from "../components/SalesLeadUpdateModal";
import { useAuth } from "../context/AuthContext";
import { useSalesCallHistory } from "../hooks/useCallHistory";
import { useAllLeads } from "../hooks/useLeads";
import { useTasksByAssignee } from "../hooks/useTasks";
import type { Lead, SVStatus, Task } from "../types";
import { STATUS_COLORS, SV_STATUSES } from "../types";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

// ─── Types ───────────────────────────────────────────────────────────────────

type SvFilterKey = "All" | SVStatus;
type SortField = "svNextFollowup" | "name" | "svStatus";
type SortDir = "asc" | "desc";

interface SvCountBox {
  key: SvFilterKey;
  label: string;
  icon: ReactNode;
  colorClass: string;
  bgClass: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SV_BOXES: SvCountBox[] = [
  {
    key: "All",
    label: "Total",
    icon: <Building2 size={16} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/8 border-primary/20",
  },
  {
    key: "Next Followup",
    label: "Next Followup",
    icon: <Phone size={16} />,
    colorClass: "text-accent-foreground",
    bgClass: "bg-accent/15 border-accent/30",
  },
  {
    key: "SV Rescheduled",
    label: "SV Rescheduled",
    icon: <Calendar size={16} />,
    colorClass: "text-amber-700",
    bgClass: "bg-amber-50 border-amber-200",
  },
  {
    key: "Booking Done",
    label: "Booking Done",
    icon: <CheckCircle2 size={16} />,
    colorClass: "text-emerald-700",
    bgClass: "bg-emerald-50 border-emerald-200",
  },
  {
    key: "Registration Done",
    label: "Reg. Done",
    icon: <TrendingUp size={16} />,
    colorClass: "text-green-800",
    bgClass: "bg-green-50 border-green-200",
  },
  {
    key: "Lead Close",
    label: "Close",
    icon: <XCircle size={16} />,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted border-border",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS_SHORT = [
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

function parseDDMMMYYYY(str: string): number {
  if (!str) return 0;
  const parts = str.split("/");
  if (parts.length !== 3) return 0;
  const [d, m, y] = parts;
  const mi = MONTHS_SHORT.findIndex(
    (mo) => mo.toLowerCase() === m?.toLowerCase(),
  );
  if (mi === -1) return 0;
  return new Date(Number(y), mi, Number(d)).getTime();
}

function todayDDMMMYYYY(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  return `${dd}/${MONTHS_SHORT[now.getMonth()]}/${now.getFullYear()}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SvCountCard({
  box,
  count,
  active,
  onClick,
}: { box: SvCountBox; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex flex-col gap-1 px-3 py-2.5 rounded-lg border cursor-pointer
        transition-all duration-150 text-left select-none
        ${box.bgClass}
        ${active ? "ring-2 ring-primary shadow-md scale-[1.02]" : "hover:shadow-sm hover:scale-[1.01]"}
      `}
      data-ocid={`sv-count-box-${box.key.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className={`flex items-center gap-1.5 ${box.colorClass}`}>
        {box.icon}
        <span className="text-[11px] font-body font-medium leading-none">
          {box.label}
        </span>
      </div>
      <span className="font-display font-bold text-xl text-foreground leading-none">
        {count}
      </span>
    </button>
  );
}

function LeadMobileCard({
  lead,
  onUpdate,
  callCount,
}: { lead: Lead; onUpdate: (lead: Lead) => void; callCount: number }) {
  const svClass =
    STATUS_COLORS[lead.svStatus] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <div
      className="bg-card border border-border rounded-lg p-3 space-y-2.5 shadow-xs"
      data-ocid="sales-lead-mobile-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display font-semibold text-foreground text-sm truncate">
            {lead.firstName} {lead.lastName}
          </p>
          <p className="text-muted-foreground text-xs font-body">
            {lead.mobileNo}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`text-[10px] font-body px-1.5 py-0.5 border flex-shrink-0 ${svClass}`}
        >
          {lead.svStatus || "—"}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-xs font-body text-muted-foreground">
        <span>
          <span className="text-foreground/60">Project:</span>{" "}
          {lead.projectName}
        </span>
        <span>
          <span className="text-foreground/60">Telecaller:</span>{" "}
          {lead.telecaller}
        </span>
        <span>
          <span className="text-foreground/60">Next FU:</span>{" "}
          {lead.svNextFollowup || "—"}
        </span>
        <span>
          <span className="text-foreground/60">Calls:</span> {callCount}
        </span>
      </div>
      {lead.svRemark && (
        <p className="text-xs font-body text-muted-foreground line-clamp-2 bg-muted/50 rounded px-2 py-1">
          {lead.svRemark}
        </p>
      )}
      <Button
        size="sm"
        variant="outline"
        className="w-full text-xs h-7 font-body border-primary/30 text-primary hover:bg-primary/5"
        onClick={() => onUpdate(lead)}
        data-ocid="sales-mobile-update-btn"
      >
        Update
      </Button>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const statusClass =
    STATUS_COLORS[task.status] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <div
      className="bg-card border border-border rounded-lg p-3 space-y-1.5"
      data-ocid="sales-task-card"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-display font-semibold text-sm text-foreground truncate flex-1 min-w-0">
          {task.taskTitle}
        </p>
        <Badge
          variant="outline"
          className={`text-[10px] font-body px-1.5 py-0.5 border flex-shrink-0 ${statusClass}`}
        >
          {task.status}
        </Badge>
      </div>
      {task.description && (
        <p className="text-xs font-body text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between text-[11px] font-body text-muted-foreground">
        <span>Due: {task.dueDate || "—"}</span>
        <span>By: {task.createdBy}</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SalesDashboard() {
  const { session, logout, setProjectFilter } = useAuth();
  const qc = useQueryClient();
  const salesPerson = session?.username ?? "";
  const viewMode = session?.viewMode ?? "desktop";
  const projectFilter = session?.projectFilter ?? "All Projects";

  const { data: allLeadsRaw = [], isLoading } = useAllLeads();
  const { data: tasks = [] } = useTasksByAssignee(salesPerson);
  const { data: callHistory = [] } = useSalesCallHistory(salesPerson);

  const allLeads = useMemo(() => {
    if (!salesPerson) return allLeadsRaw;
    return allLeadsRaw.filter((l) => l.assignedSales === salesPerson);
  }, [allLeadsRaw, salesPerson]);

  const [svFilter, setSvFilter] = useState<SvFilterKey>("All");
  const [search, setSearch] = useState("");
  const [nextFollowupSearch, setNextFollowupSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("svNextFollowup");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  // Call History modals
  const [callHistoryLead, setCallHistoryLead] = useState<Lead | null>(null);
  const [showFullCallLog, setShowFullCallLog] = useState(false);
  const [showTodayCallLog, setShowTodayCallLog] = useState(false);

  const projectOptions = useMemo(() => {
    const set = new Set(allLeads.map((l) => l.projectName).filter(Boolean));
    return ["All Projects", ...Array.from(set).sort()];
  }, [allLeads]);

  const projectFiltered = useMemo(() => {
    if (!projectFilter || projectFilter === "All Projects") return allLeads;
    return allLeads.filter((l) => l.projectName === projectFilter);
  }, [allLeads, projectFilter]);

  const svCounts = useMemo(() => {
    const counts: Record<SvFilterKey, number> = {
      All: projectFiltered.length,
    } as Record<SvFilterKey, number>;
    for (const s of SV_STATUSES) counts[s] = 0;
    for (const lead of projectFiltered) {
      const key = lead.svStatus as SVStatus;
      if (key && counts[key] !== undefined) counts[key]++;
    }
    return counts;
  }, [projectFiltered]);

  const filteredLeads = useMemo(() => {
    let result = projectFiltered;
    if (svFilter !== "All")
      result = result.filter((l) => l.svStatus === svFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (l) =>
          `${l.firstName} ${l.lastName}`.toLowerCase().includes(q) ||
          l.mobileNo.includes(q) ||
          (l.svRemark ?? "").toLowerCase().includes(q),
      );
    }
    if (nextFollowupSearch.trim()) {
      const q = nextFollowupSearch.trim().toLowerCase();
      result = result.filter((l) =>
        (l.svNextFollowup || "").toLowerCase().includes(q),
      );
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === "svNextFollowup")
        cmp =
          parseDDMMMYYYY(a.svNextFollowup) - parseDDMMMYYYY(b.svNextFollowup);
      else if (sortField === "name")
        cmp = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
        );
      else if (sortField === "svStatus")
        cmp = (a.svStatus || "").localeCompare(b.svStatus || "");
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [
    projectFiltered,
    svFilter,
    search,
    nextFollowupSearch,
    sortField,
    sortDir,
  ]);

  const callCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const h of callHistory) map[h.mobile] = (map[h.mobile] ?? 0) + 1;
    return map;
  }, [callHistory]);

  // Today's call count
  const todayStr = todayDDMMMYYYY();
  const todayCallCount = useMemo(
    () => callHistory.filter((h) => h.date === todayStr).length,
    [callHistory, todayStr],
  );

  function openUpdate(lead: Lead) {
    setSelectedLead(lead);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedLead(null);
  }

  function handleSaved(lead: Lead) {
    // Auto-open call history after save
    setCallHistoryLead(lead);
  }

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    return (
      <ArrowUpDown
        size={11}
        className={`ml-0.5 inline ${sortField === field ? "text-primary" : "text-muted-foreground/40"}`}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 flex items-center gap-3 px-4 bg-card border-b border-border shadow-xs flex-shrink-0">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center shadow-sm">
            <span className="text-primary font-display font-bold text-xs">
              PF
            </span>
          </div>
          <div className="flex-col leading-none hidden sm:flex">
            <span className="font-display font-bold text-foreground text-sm tracking-wide">
              PropFlow
            </span>
            <span className="text-muted-foreground text-[9px] font-body tracking-widest uppercase">
              Sales CRM
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0 px-2">
          <div className="flex flex-col leading-none">
            <span className="text-foreground font-body font-semibold text-sm truncate">
              {salesPerson || "Sales Person"}
            </span>
            <span className="text-muted-foreground text-[10px] font-body truncate">
              {projectFilter === "All Projects"
                ? "All Projects"
                : projectFilter}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Full Call Log */}
          <button
            type="button"
            onClick={() => setShowFullCallLog(true)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-background text-xs font-body text-muted-foreground hover:bg-muted transition-smooth"
            data-ocid="sales-full-calllog-btn"
          >
            <PhoneCall size={13} />
            <span className="hidden sm:inline">Full Call Log</span>
          </button>

          {/* Today Call Log */}
          <button
            type="button"
            onClick={() => setShowTodayCallLog(true)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-border bg-background text-xs font-body text-muted-foreground hover:bg-muted transition-smooth"
            data-ocid="sales-today-calllog-btn"
          >
            <PhoneIncoming size={13} />
            <span className="hidden sm:inline">Today</span>
            {todayCallCount > 0 && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none">
                {todayCallCount}
              </span>
            )}
          </button>

          {/* Project dropdown */}
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="h-8 px-2 py-1 rounded-md border border-input bg-background text-foreground text-xs font-body focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            data-ocid="sales-header-project-select"
          >
            {projectOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* My Tasks toggle */}
          <button
            type="button"
            onClick={() => setShowTasks((v) => !v)}
            className={`flex items-center gap-1.5 h-8 px-2.5 rounded-md border text-xs font-body transition-smooth ${
              showTasks
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border text-muted-foreground hover:bg-muted"
            }`}
            data-ocid="sales-tasks-toggle-btn"
          >
            <ClipboardList size={13} />
            <span className="hidden sm:inline">Tasks</span>
            {tasks.filter((t) => t.status !== "Completed").length > 0 && (
              <span className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold leading-none">
                {tasks.filter((t) => t.status !== "Completed").length}
              </span>
            )}
          </button>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => qc.invalidateQueries()}
            title="Refresh"
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
            data-ocid="sales-refresh-btn"
          >
            <RefreshCw size={15} />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="h-8 px-2.5 rounded-md border border-border text-xs font-body text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-smooth"
            data-ocid="sales-logout-btn"
          >
            Logout
          </button>
        </div>
      </header>

      {/* My Tasks Panel */}
      {showTasks && (
        <div className="bg-muted/30 border-b border-border px-4 py-4">
          <h2 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <ClipboardList size={15} className="text-primary" />
            My Tasks ({tasks.length})
          </h2>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground text-sm font-body py-2">
              No tasks assigned yet.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((t) => (
                <TaskCard key={t.taskId.toString()} task={t} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* SV Count Boxes */}
      <div className="px-4 pt-4 pb-3 bg-card border-b border-border">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {SV_BOXES.map((box) => (
            <SvCountCard
              key={box.key}
              box={box}
              count={svCounts[box.key] ?? 0}
              active={svFilter === box.key}
              onClick={() =>
                setSvFilter((prev) => (prev === box.key ? "All" : box.key))
              }
            />
          ))}
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="px-4 py-3 bg-background border-b border-border">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, remark…"
              className="w-full h-9 pl-8 pr-3 rounded-md border border-input bg-background text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="sales-search-input"
            />
          </div>
          <div className="relative min-w-[200px]">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={nextFollowupSearch}
              onChange={(e) => setNextFollowupSearch(e.target.value)}
              placeholder="Next Followup (Apr/2026…)"
              className="w-full h-9 pl-8 pr-3 rounded-md border border-input bg-background text-foreground text-sm font-mono placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="sales-nextfu-filter"
            />
          </div>
          {(search || nextFollowupSearch || svFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setNextFollowupSearch("");
                setSvFilter("All");
              }}
              className="h-9 px-3 rounded-md border border-border text-xs font-body text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-smooth"
              data-ocid="sales-clear-filters"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground font-body mt-1.5">
          {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}{" "}
          shown
          {svFilter !== "All" && (
            <span className="ml-1">
              · Filtered:{" "}
              <button
                type="button"
                onClick={() => setSvFilter("All")}
                className="text-primary underline hover:no-underline"
              >
                {svFilter} ×
              </button>
            </span>
          )}
        </p>
      </div>

      {/* Lead Table / Cards */}
      <div className="flex-1 px-4 py-4 overflow-x-auto">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="sales-empty-state"
          >
            <Building2 size={40} className="text-muted-foreground/40 mb-3" />
            <p className="font-display font-semibold text-foreground text-base">
              No leads found
            </p>
            <p className="text-muted-foreground text-sm font-body mt-1">
              {svFilter !== "All"
                ? `No leads with SV status "${svFilter}"`
                : "Leads assigned to you will appear here"}
            </p>
          </div>
        ) : viewMode === "mobile" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredLeads.map((lead) => (
              <LeadMobileCard
                key={lead.id.toString()}
                lead={lead}
                onUpdate={openUpdate}
                callCount={callCountMap[lead.mobileNo] ?? 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden shadow-xs bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body border-collapse">
                <thead>
                  <tr className="bg-primary/8 border-b border-border">
                    {[
                      { label: "Sr", field: null },
                      { label: "Name", field: "name" as SortField },
                      { label: "Mobile", field: null },
                      { label: "Project", field: null },
                      { label: "Telecaller", field: null },
                      { label: "SV Status", field: "svStatus" as SortField },
                      {
                        label: "Next Followup",
                        field: "svNextFollowup" as SortField,
                      },
                      { label: "SV Remark", field: null },
                      { label: "Calls", field: null },
                      { label: "Actions", field: null },
                    ].map(({ label, field }) => (
                      <th
                        key={label}
                        className={`px-3 py-2.5 text-left text-xs font-display font-semibold text-foreground/70 whitespace-nowrap ${field ? "cursor-pointer hover:text-foreground select-none" : ""}`}
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
                <tbody>
                  {filteredLeads.map((lead, idx) => {
                    const svClass =
                      STATUS_COLORS[lead.svStatus] ??
                      "bg-muted text-muted-foreground border-border";
                    return (
                      <tr
                        key={lead.id.toString()}
                        className={`border-b border-border/50 transition-colors ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-primary/4`}
                        data-ocid="sales-lead-row"
                      >
                        <td className="px-3 py-2.5 text-muted-foreground text-xs whitespace-nowrap">
                          {lead.srNo.toString()}
                        </td>
                        <td className="px-3 py-2.5 font-medium text-foreground whitespace-nowrap">
                          {lead.firstName} {lead.lastName}
                        </td>
                        <td className="px-3 py-2.5 text-foreground/80 whitespace-nowrap">
                          <a
                            href={`tel:${lead.mobileNo}`}
                            className="hover:text-primary transition-colors"
                          >
                            {lead.mobileNo}
                          </a>
                        </td>
                        <td className="px-3 py-2.5 text-foreground/80 whitespace-nowrap max-w-[120px] truncate">
                          {lead.projectName}
                        </td>
                        <td className="px-3 py-2.5 text-foreground/80 whitespace-nowrap">
                          {lead.telecaller}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded border text-[11px] font-body font-medium ${svClass}`}
                          >
                            {lead.svStatus || "—"}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-foreground/80 whitespace-nowrap text-xs">
                          {lead.svNextFollowup || "—"}
                        </td>
                        <td className="px-3 py-2.5 text-muted-foreground max-w-[180px]">
                          <span className="line-clamp-1 text-xs">
                            {lead.svRemark || "—"}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center text-xs text-muted-foreground">
                          {callCountMap[lead.mobileNo] ?? 0}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2.5 font-body border-primary/30 text-primary hover:bg-primary/5"
                              onClick={() => openUpdate(lead)}
                              data-ocid="sales-update-btn"
                            >
                              Update
                            </Button>
                            <button
                              type="button"
                              title="Call History"
                              onClick={() => setCallHistoryLead(lead)}
                              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth"
                              data-ocid="sales-call-history-btn"
                            >
                              <History size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="px-4 py-3 bg-card border-t border-border">
        <p className="text-[11px] text-muted-foreground font-body text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Modals */}
      <SalesLeadUpdateModal
        lead={selectedLead}
        open={modalOpen}
        onClose={closeModal}
        salesPersonName={salesPerson}
        onSaved={handleSaved}
      />

      {callHistoryLead && (
        <SalesCallHistoryModal
          mobileNo={callHistoryLead.mobileNo}
          leadName={`${callHistoryLead.firstName} ${callHistoryLead.lastName}`}
          salesPerson={salesPerson}
          onClose={() => setCallHistoryLead(null)}
        />
      )}

      {showFullCallLog && (
        <FullCallLogModal
          salesPerson={salesPerson}
          todayOnly={false}
          onClose={() => setShowFullCallLog(false)}
        />
      )}

      {showTodayCallLog && (
        <FullCallLogModal
          salesPerson={salesPerson}
          todayOnly={true}
          onClose={() => setShowTodayCallLog(false)}
        />
      )}
    </div>
  );
}
