import {
  BarChart2,
  Calendar,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Filter,
  Globe,
  Phone,
  PieChart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Layout } from "../components/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useCallHistory, useSalesCallHistory } from "../hooks/useCallHistory";
import { useAllLeads } from "../hooks/useLeads";
import { useUniqueTelecallers } from "../hooks/useProjects";
import type { CallHistory, Lead, SalesCallHistory } from "../types";
import { LEAD_STATUSES, SV_STATUSES } from "../types";
import { ageBucket, isToday, leadAgeDays, todayStr } from "../utils/dateUtils";

// ── Types ─────────────────────────────────────────────────────────────────

type ReportTab =
  | "telecaller-perf"
  | "project-summary"
  | "source-analysis"
  | "monthly-trend"
  | "funnel"
  | "export"
  | "lead-aging"
  | "today-calls"
  | "today-call-count"
  | "date-call-count"
  | "sv-status"
  | "lead-quality"
  | "best-source";

// ── Shared components ──────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-1 ${accent ? "bg-primary text-primary-foreground border-primary/30" : "bg-card border-border"}`}
    >
      <span
        className={`text-2xl font-display font-bold ${accent ? "text-primary-foreground" : "text-foreground"}`}
      >
        {value}
      </span>
      <span
        className={`text-xs font-body ${accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      {sub && (
        <span
          className={`text-[11px] ${accent ? "text-primary-foreground/60" : "text-muted-foreground/70"}`}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

function HBar({
  label,
  value,
  max,
  color = "bg-primary",
  pct,
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
  pct?: string;
}) {
  const width = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-36 text-xs font-body text-foreground truncate flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-14 text-xs font-body text-right text-muted-foreground flex-shrink-0">
        {pct ?? value}
      </span>
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <h2 className="font-display font-semibold text-foreground text-lg">
        {title}
      </h2>
    </div>
  );
}

function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm font-body">{children}</table>
    </div>
  );
}

function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-3 py-2.5 text-xs font-semibold text-muted-foreground bg-muted/60 border-b border-border whitespace-nowrap ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  right,
  mono,
}: { children: ReactNode; right?: boolean; mono?: boolean }) {
  return (
    <td
      className={`px-3 py-2 border-b border-border/50 text-foreground ${right ? "text-right" : ""} ${mono ? "font-mono text-xs" : "text-sm"}`}
    >
      {children}
    </td>
  );
}

// ── Tab definition ─────────────────────────────────────────────────────────

const TABS: { id: ReportTab; label: string; icon: ReactNode }[] = [
  {
    id: "telecaller-perf",
    label: "Telecaller Performance",
    icon: <Users size={14} />,
  },
  {
    id: "project-summary",
    label: "Project Summary",
    icon: <BarChart2 size={14} />,
  },
  {
    id: "source-analysis",
    label: "Source Analysis",
    icon: <PieChart size={14} />,
  },
  {
    id: "monthly-trend",
    label: "Monthly Trend",
    icon: <TrendingUp size={14} />,
  },
  { id: "funnel", label: "Conversion Funnel", icon: <Filter size={14} /> },
  { id: "export", label: "Export CSV", icon: <FileSpreadsheet size={14} /> },
  { id: "lead-aging", label: "Lead Aging", icon: <Calendar size={14} /> },
  { id: "today-calls", label: "Today Call History", icon: <Phone size={14} /> },
  {
    id: "today-call-count",
    label: "Today Call Count",
    icon: <Target size={14} />,
  },
  {
    id: "date-call-count",
    label: "Date-wise Calls",
    icon: <Calendar size={14} />,
  },
  { id: "sv-status", label: "SV Status Report", icon: <BarChart2 size={14} /> },
  { id: "lead-quality", label: "Lead Quality", icon: <Filter size={14} /> },
  { id: "best-source", label: "Best Source", icon: <Globe size={14} /> },
];

const BAR_COLORS = [
  "bg-primary",
  "bg-accent",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-teal-500",
];

// ── CSV export helper ──────────────────────────────────────────────────────

function downloadCSV(rows: string[][], filename: string) {
  const content = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════════════════════════
//  Report Panels
// ══════════════════════════════════════════════════════════════════════════

function TelecallerPerf({ leads }: { leads: Lead[] }) {
  const telecallers = useMemo(() => {
    const map: Record<
      string,
      { total: number; svPlan: number; svDone: number; lost: number }
    > = {};
    for (const l of leads) {
      const tc = l.telecaller || "—";
      if (!map[tc]) map[tc] = { total: 0, svPlan: 0, svDone: 0, lost: 0 };
      map[tc].total++;
      if (l.latestStatus === "SV Plan") map[tc].svPlan++;
      if (l.latestStatus === "SV Done") map[tc].svDone++;
      if (l.latestStatus === "Lost") map[tc].lost++;
    }
    return Object.entries(map)
      .map(([name, d]) => ({
        name,
        ...d,
        convRate: d.total > 0 ? ((d.svDone / d.total) * 100).toFixed(1) : "0.0",
      }))
      .sort((a, b) => b.total - a.total);
  }, [leads]);

  const total = leads.length;
  const totalSVDone = leads.filter((l) => l.latestStatus === "SV Done").length;
  const totalLost = leads.filter((l) => l.latestStatus === "Lost").length;

  return (
    <div>
      <SectionHeader
        title="Telecaller Performance"
        icon={<Users size={16} />}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Leads" value={total} />
        <StatCard label="Telecallers Active" value={telecallers.length} />
        <StatCard
          label="Avg SV Done Rate"
          value={`${total > 0 ? ((totalSVDone / total) * 100).toFixed(1) : 0}%`}
          accent
        />
        <StatCard label="Total Lost" value={totalLost} />
      </div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Telecaller</Th>
            <Th right>Total</Th>
            <Th right>SV Plan</Th>
            <Th right>SV Done</Th>
            <Th right>Lost</Th>
            <Th right>Conv. Rate</Th>
          </tr>
        </thead>
        <tbody>
          {telecallers.map((tc, i) => (
            <tr key={tc.name} className="hover:bg-muted/30 transition-colors">
              <Td>{i + 1}</Td>
              <Td>
                <span className="font-medium">{tc.name}</span>
              </Td>
              <Td right>{tc.total}</Td>
              <Td right>
                <span className="text-purple-600 font-medium">{tc.svPlan}</span>
              </Td>
              <Td right>
                <span className="text-emerald-600 font-medium">
                  {tc.svDone}
                </span>
              </Td>
              <Td right>
                <span className="text-destructive font-medium">{tc.lost}</span>
              </Td>
              <Td right>
                <Badge
                  variant="outline"
                  className={
                    Number(tc.convRate) >= 10
                      ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                      : "border-border text-muted-foreground"
                  }
                >
                  {tc.convRate}%
                </Badge>
              </Td>
            </tr>
          ))}
          {telecallers.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>
    </div>
  );
}

function ProjectSummary({ leads }: { leads: Lead[] }) {
  const projects = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    for (const l of leads) {
      const p = l.projectName || "Unknown";
      if (!map[p]) map[p] = {};
      const s = l.latestStatus || "New";
      map[p][s] = (map[p][s] ?? 0) + 1;
    }
    return Object.entries(map)
      .map(([name, counts]) => ({
        name,
        counts,
        total: Object.values(counts).reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.total - a.total);
  }, [leads]);

  const maxTotal = Math.max(...projects.map((p) => p.total), 1);
  const statuses = [
    "New",
    "Not Connect",
    "Share Brochure",
    "Follow-up",
    "SV Plan",
    "SV Done",
    "Lost",
  ];

  return (
    <div>
      <SectionHeader title="Project Summary" icon={<BarChart2 size={16} />} />
      <div className="space-y-3 mb-6">
        {projects.map((p, i) => (
          <HBar
            key={p.name}
            label={p.name}
            value={p.total}
            max={maxTotal}
            color={BAR_COLORS[i % BAR_COLORS.length]}
          />
        ))}
      </div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Project</Th>
            <Th right>Total</Th>
            {statuses.map((s) => (
              <Th key={s} right>
                {s}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.name} className="hover:bg-muted/30 transition-colors">
              <Td>
                <span className="font-medium">{p.name}</span>
              </Td>
              <Td right>
                <span className="font-bold">{p.total}</span>
              </Td>
              {statuses.map((s) => (
                <Td key={s} right>
                  {p.counts[s] ?? 0}
                </Td>
              ))}
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td
                colSpan={statuses.length + 2}
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>
    </div>
  );
}

function SourceAnalysis({ leads }: { leads: Lead[] }) {
  const sources = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) {
      const s = l.source || "Unknown";
      map[s] = (map[s] ?? 0) + 1;
    }
    const total = leads.length;
    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        count,
        pct: total > 0 ? ((count / total) * 100).toFixed(1) : "0",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxCount = Math.max(...sources.map((s) => s.count), 1);

  return (
    <div>
      <SectionHeader title="Source Analysis" icon={<PieChart size={16} />} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {sources.slice(0, 4).map((s, i) => (
          <StatCard
            key={s.name}
            label={s.name}
            value={s.count}
            sub={`${s.pct}% of total`}
            accent={i === 0}
          />
        ))}
      </div>
      <div className="space-y-2">
        {sources.map((s, i) => (
          <HBar
            key={s.name}
            label={s.name}
            value={s.count}
            max={maxCount}
            color={BAR_COLORS[i % BAR_COLORS.length]}
            pct={`${s.pct}%`}
          />
        ))}
        {sources.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-6">
            No data
          </p>
        )}
      </div>
    </div>
  );
}

function MonthlyTrend({ leads }: { leads: Lead[] }) {
  const months = useMemo(() => {
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
      "Dec",
    ];
    const map: Record<string, { total: number; svDone: number }> = {};
    for (const l of leads) {
      const parts = l.leadDate?.split("/");
      if (!parts || parts.length !== 3) continue;
      const [, mon, yr] = parts;
      const monIdx = MON.findIndex(
        (m) => m.toLowerCase() === mon.toLowerCase(),
      );
      if (monIdx === -1) continue;
      const key = `${yr}-${String(monIdx + 1).padStart(2, "0")}`;
      if (!map[key]) map[key] = { total: 0, svDone: 0 };
      map[key].total++;
      if (l.latestStatus === "SV Done") map[key].svDone++;
    }
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, d]) => {
        const [yr, mo] = key.split("-");
        return { label: `${MON[Number(mo) - 1]}/${yr}`, ...d };
      });
  }, [leads]);

  const maxTotal = Math.max(...months.map((m) => m.total), 1);

  return (
    <div>
      <SectionHeader
        title="Monthly Lead Trend"
        icon={<TrendingUp size={16} />}
      />
      <div className="flex items-center gap-4 mb-4 text-xs font-body text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded bg-primary" /> Total Leads
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded bg-emerald-500" /> SV Done
        </div>
      </div>
      <div className="space-y-4">
        {months.map((m) => (
          <div key={m.label} className="flex items-center gap-3">
            <span className="w-20 text-xs font-body text-foreground flex-shrink-0">
              {m.label}
            </span>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${Math.round((m.total / maxTotal) * 100)}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-xs text-right text-muted-foreground">
                  {m.total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${Math.round((m.svDone / maxTotal) * 100)}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-xs text-right text-emerald-600">
                  {m.svDone}
                </span>
              </div>
            </div>
          </div>
        ))}
        {months.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-6">
            No lead date data available
          </p>
        )}
      </div>
    </div>
  );
}

const FUNNEL_STAGES = [
  { key: "New", label: "New Leads", color: "bg-primary/80" },
  { key: "Not Connect", label: "Not Connect", color: "bg-rose-500/80" },
  { key: "Share Brochure", label: "Share Brochure", color: "bg-accent/80" },
  { key: "Follow-up", label: "Follow-up", color: "bg-blue-500/80" },
  { key: "SV Plan", label: "SV Plan", color: "bg-purple-500/80" },
  { key: "SV Done", label: "SV Done", color: "bg-emerald-500/80" },
];

function ConversionFunnel({ leads }: { leads: Lead[] }) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) {
      const s = l.latestStatus || "New";
      map[s] = (map[s] ?? 0) + 1;
    }
    return map;
  }, [leads]);

  const maxCount = Math.max(...FUNNEL_STAGES.map((s) => counts[s.key] ?? 0), 1);
  const firstCount = counts[FUNNEL_STAGES[0].key] ?? 1;

  return (
    <div>
      <SectionHeader title="Conversion Funnel" icon={<Filter size={16} />} />
      <div className="flex flex-col gap-2 items-center max-w-lg mx-auto">
        {FUNNEL_STAGES.map((stage, i) => {
          const count = counts[stage.key] ?? 0;
          const pct =
            firstCount > 0 ? ((count / firstCount) * 100).toFixed(0) : "0";
          const widthPct =
            maxCount > 0
              ? Math.max(20, Math.round((count / maxCount) * 100))
              : 20;
          return (
            <div key={stage.key} className="w-full flex flex-col items-center">
              <div
                className={`${stage.color} text-white rounded-lg flex items-center justify-between px-4 py-2.5 text-sm font-body transition-all duration-500`}
                style={{ width: `${widthPct}%`, minWidth: 200 }}
              >
                <span className="font-medium">{stage.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{count}</span>
                  {i > 0 && (
                    <span className="text-white/70 text-xs">({pct}%)</span>
                  )}
                </div>
              </div>
              {i < FUNNEL_STAGES.length - 1 && (
                <div className="w-0.5 h-3 bg-border" />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Percentages relative to New Leads
      </p>
    </div>
  );
}

function ExportCSV({
  leads,
  telecallers,
}: { leads: Lead[]; telecallers: string[] }) {
  const [selStatuses, setSelStatuses] = useState<Set<string>>(
    new Set(LEAD_STATUSES),
  );
  const projects = useMemo(
    () => [...new Set(leads.map((l) => l.projectName).filter(Boolean))].sort(),
    [leads],
  );
  const [selTelecallers, setSelTelecallers] = useState<Set<string>>(
    new Set(telecallers),
  );
  const [selProjects, setSelProjects] = useState<Set<string>>(
    new Set(projects),
  );

  function toggle(set: Set<string>, key: string): Set<string> {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  }

  const filteredCount = useMemo(
    () =>
      leads.filter(
        (l) =>
          selStatuses.has(l.latestStatus || "New") &&
          selTelecallers.has(l.telecaller || "") &&
          selProjects.has(l.projectName || ""),
      ).length,
    [leads, selStatuses, selTelecallers, selProjects],
  );

  function handleDownload() {
    const filtered = leads.filter(
      (l) =>
        selStatuses.has(l.latestStatus || "New") &&
        selTelecallers.has(l.telecaller || "") &&
        selProjects.has(l.projectName || ""),
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
      "Remarks2",
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
      l.remarks2,
    ]);
    downloadCSV([header, ...rows], `PropFlow_Leads_${todayStr()}.csv`);
  }

  return (
    <div>
      <SectionHeader title="Export CSV" icon={<FileSpreadsheet size={16} />} />
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Lead Status
            </h3>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() =>
                setSelStatuses(
                  selStatuses.size === LEAD_STATUSES.length
                    ? new Set()
                    : new Set(LEAD_STATUSES),
                )
              }
            >
              {selStatuses.size === LEAD_STATUSES.length
                ? "Deselect all"
                : "Select all"}
            </button>
          </div>
          <div className="space-y-1.5">
            {LEAD_STATUSES.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selStatuses.has(s)}
                  onChange={() => setSelStatuses(toggle(selStatuses, s))}
                  className="accent-primary"
                  data-ocid={`export-status-${s.toLowerCase().replace(/\s+/g, "-")}`}
                />
                <span className="text-foreground">{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Telecallers
            </h3>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() =>
                setSelTelecallers(
                  selTelecallers.size === telecallers.length
                    ? new Set()
                    : new Set(telecallers),
                )
              }
            >
              {selTelecallers.size === telecallers.length
                ? "Deselect all"
                : "Select all"}
            </button>
          </div>
          <div className="space-y-1.5 max-h-52 overflow-y-auto">
            {telecallers.map((tc) => (
              <label
                key={tc}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selTelecallers.has(tc)}
                  onChange={() => setSelTelecallers(toggle(selTelecallers, tc))}
                  className="accent-primary"
                  data-ocid={`export-tc-${tc.toLowerCase().replace(/\s+/g, "-")}`}
                />
                <span className="text-foreground">{tc}</span>
              </label>
            ))}
            {telecallers.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No telecallers found
              </p>
            )}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Projects</h3>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() =>
                setSelProjects(
                  selProjects.size === projects.length
                    ? new Set()
                    : new Set(projects),
                )
              }
            >
              {selProjects.size === projects.length
                ? "Deselect all"
                : "Select all"}
            </button>
          </div>
          <div className="space-y-1.5 max-h-52 overflow-y-auto">
            {projects.map((p) => (
              <label
                key={p}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selProjects.has(p)}
                  onChange={() => setSelProjects(toggle(selProjects, p))}
                  className="accent-primary"
                  data-ocid={`export-proj-${p.toLowerCase().replace(/\s+/g, "-")}`}
                />
                <span className="text-foreground">{p}</span>
              </label>
            ))}
            {projects.length === 0 && (
              <p className="text-xs text-muted-foreground">No projects found</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2"
          data-ocid="btn-download-csv"
        >
          <Download size={15} />
          Download CSV
        </Button>
        <span className="text-sm text-muted-foreground">
          {filteredCount} leads selected
        </span>
      </div>
    </div>
  );
}

const AGE_BUCKETS = [
  "0–9 Days",
  "10–19 Days",
  "20–29 Days",
  "30–59 Days",
  "60–90 Days",
  "90+ Days",
];

function LeadAgingReport({ leads }: { leads: Lead[] }) {
  const data = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    for (const l of leads) {
      if (l.latestStatus === "Lost" || l.latestStatus === "Qualified1")
        continue;
      const tc = l.telecaller || "—";
      const age = leadAgeDays(l.leadDate);
      const bucket = ageBucket(age);
      if (!map[tc]) map[tc] = {};
      map[tc][bucket] = (map[tc][bucket] ?? 0) + 1;
    }
    return Object.entries(map)
      .map(([name, buckets]) => ({
        name,
        buckets,
        total: Object.values(buckets).reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.total - a.total);
  }, [leads]);

  return (
    <div>
      <SectionHeader
        title="Telecaller-wise Lead Aging"
        icon={<Calendar size={16} />}
      />
      <p className="text-xs text-muted-foreground mb-4">
        Excludes Lost &amp; Qualified1 leads
      </p>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Telecaller</Th>
            {AGE_BUCKETS.map((b) => (
              <Th key={b} right>
                {b}
              </Th>
            ))}
            <Th right>Total</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="hover:bg-muted/30 transition-colors">
              <Td>
                <span className="font-medium">{row.name}</span>
              </Td>
              {AGE_BUCKETS.map((b) => (
                <Td key={b} right>
                  <span
                    className={
                      row.buckets[b]
                        ? "text-foreground"
                        : "text-muted-foreground/40"
                    }
                  >
                    {row.buckets[b] ?? 0}
                  </span>
                </Td>
              ))}
              <Td right>
                <span className="font-bold">{row.total}</span>
              </Td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={AGE_BUCKETS.length + 2}
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>
    </div>
  );
}

function TodayCallHistory({
  calls,
  salesCalls,
}: { calls: CallHistory[]; salesCalls: SalesCallHistory[] }) {
  const todayCalls = useMemo(
    () => calls.filter((c) => isToday(c.date)),
    [calls],
  );
  const todaySalesCalls = useMemo(
    () => salesCalls.filter((c) => isToday(c.date)),
    [salesCalls],
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
      "Type",
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
        "Telecaller",
      ]),
      ...todaySalesCalls.map((c) => [
        c.date,
        c.name,
        c.mobile,
        c.status,
        c.remark,
        c.salesPerson,
        c.projectName,
        "Sales",
      ]),
    ];
    downloadCSV([header, ...rows], `PropFlow_TodayCalls_${todayStr()}.csv`);
  }

  return (
    <div>
      <SectionHeader title="Today Call History" icon={<Phone size={16} />} />
      <div className="flex flex-wrap items-start gap-3 mb-5">
        <StatCard label="Telecaller Calls" value={todayCalls.length} />
        <StatCard label="Sales Calls" value={todaySalesCalls.length} accent />
        <div className="ml-auto self-end">
          <Button
            variant="outline"
            onClick={exportToday}
            className="flex items-center gap-2"
            data-ocid="btn-export-today"
          >
            <Download size={14} /> Export Today
          </Button>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-2">
        Telecaller Calls ({todayCalls.length})
      </h3>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Name</Th>
            <Th>Mobile</Th>
            <Th>Status</Th>
            <Th>Remark</Th>
            <Th>Telecaller</Th>
            <Th>Project</Th>
          </tr>
        </thead>
        <tbody>
          {todayCalls.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No telecaller calls today
              </td>
            </tr>
          ) : (
            todayCalls.map((c) => (
              <tr
                key={`${c.mobile}-${c.date}-${c.telecaller}`}
                className="hover:bg-muted/30"
              >
                <Td mono>{c.date}</Td>
                <Td>{c.name}</Td>
                <Td mono>{c.mobile}</Td>
                <Td>
                  <Badge variant="outline" className="text-xs">
                    {c.status}
                  </Badge>
                </Td>
                <Td>{c.remark}</Td>
                <Td>{c.telecaller}</Td>
                <Td>{c.projectName}</Td>
              </tr>
            ))
          )}
        </tbody>
      </TableWrapper>

      <h3 className="text-sm font-semibold text-foreground mt-6 mb-2">
        Sales Calls ({todaySalesCalls.length})
      </h3>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Name</Th>
            <Th>Mobile</Th>
            <Th>Status</Th>
            <Th>Remark</Th>
            <Th>Sales Person</Th>
            <Th>Project</Th>
          </tr>
        </thead>
        <tbody>
          {todaySalesCalls.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No sales calls today
              </td>
            </tr>
          ) : (
            todaySalesCalls.map((c) => (
              <tr
                key={`${c.mobile}-${c.date}-${c.salesPerson}`}
                className="hover:bg-muted/30"
              >
                <Td mono>{c.date}</Td>
                <Td>{c.name}</Td>
                <Td mono>{c.mobile}</Td>
                <Td>
                  <Badge variant="outline" className="text-xs">
                    {c.status}
                  </Badge>
                </Td>
                <Td>{c.remark}</Td>
                <Td>{c.salesPerson}</Td>
                <Td>{c.projectName}</Td>
              </tr>
            ))
          )}
        </tbody>
      </TableWrapper>
    </div>
  );
}

function TodayCallCount({ calls }: { calls: CallHistory[] }) {
  const data = useMemo(() => {
    const today = todayStr();
    const map: Record<string, number> = {};
    for (const c of calls) {
      if (c.date === today) {
        const tc = c.telecaller || "—";
        map[tc] = (map[tc] ?? 0) + 1;
      }
    }
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [calls]);

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div>
      <SectionHeader
        title="Today Call Count per Telecaller"
        icon={<Target size={16} />}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {data.map((d, i) => (
          <StatCard
            key={d.name}
            label={d.name}
            value={d.count}
            sub="calls today"
            accent={i === 0}
          />
        ))}
        {data.length === 0 && (
          <p className="text-muted-foreground text-sm col-span-4 py-4 text-center">
            No calls logged today
          </p>
        )}
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (
          <HBar
            key={d.name}
            label={d.name}
            value={d.count}
            max={maxCount}
            color={BAR_COLORS[i % BAR_COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
}

function DateCallCount({
  calls,
  telecallers,
}: { calls: CallHistory[]; telecallers: string[] }) {
  const [selTc, setSelTc] = useState<string>("");

  const filtered = useMemo(() => {
    const relevant = selTc
      ? calls.filter((c) => c.telecaller === selTc)
      : calls;
    const map: Record<string, number> = {};
    for (const c of relevant) {
      const d = c.date || "—";
      map[d] = (map[d] ?? 0) + 1;
    }
    return Object.entries(map)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [calls, selTc]);

  const maxCount = Math.max(...filtered.map((d) => d.count), 1);

  return (
    <div>
      <SectionHeader
        title="Date-wise Call Count"
        icon={<Calendar size={16} />}
      />
      <div className="flex items-center gap-3 mb-5">
        <label
          htmlFor="select-tc-date-count"
          className="text-sm font-body text-muted-foreground"
        >
          Telecaller:
        </label>
        <div className="relative">
          <select
            id="select-tc-date-count"
            value={selTc}
            onChange={(e) => setSelTc(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-input bg-background text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="select-tc-date-count"
          >
            <option value="">All Telecallers</option>
            {telecallers.map((tc) => (
              <option key={tc} value={tc}>
                {tc}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        {filtered.map((d) => (
          <HBar key={d.date} label={d.date} value={d.count} max={maxCount} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-6">
            No call history found
          </p>
        )}
      </div>
    </div>
  );
}

function SVStatusReport({ leads }: { leads: Lead[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const statusGroups = useMemo(() => {
    const map: Record<string, Lead[]> = {};
    for (const l of leads) {
      if (!l.svStatus) continue;
      if (!map[l.svStatus]) map[l.svStatus] = [];
      map[l.svStatus].push(l);
    }
    return SV_STATUSES.map((s) => ({ status: s, leads: map[s] ?? [] }));
  }, [leads]);

  return (
    <div>
      <SectionHeader
        title="Site Visit Status Report"
        icon={<BarChart2 size={16} />}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {statusGroups.map((g, i) => (
          <StatCard
            key={g.status}
            label={g.status}
            value={g.leads.length}
            accent={i === 0}
          />
        ))}
      </div>
      <div className="space-y-3">
        {statusGroups.map((g) => (
          <div
            key={g.status}
            className="border border-border rounded-xl overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors"
              onClick={() =>
                setExpanded(expanded === g.status ? null : g.status)
              }
              data-ocid={`sv-group-${g.status.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {g.leads.length}
                </Badge>
                <span className="font-medium text-sm text-foreground">
                  {g.status}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-muted-foreground transition-transform ${expanded === g.status ? "rotate-180" : ""}`}
              />
            </button>
            {expanded === g.status && g.leads.length > 0 && (
              <TableWrapper>
                <thead>
                  <tr>
                    <Th>Sr.No</Th>
                    <Th>Name</Th>
                    <Th>Mobile</Th>
                    <Th>Project</Th>
                    <Th>Telecaller</Th>
                    <Th>Sales</Th>
                    <Th>SV Next Followup</Th>
                    <Th>SV Remark</Th>
                  </tr>
                </thead>
                <tbody>
                  {g.leads.map((l) => (
                    <tr key={String(l.id)} className="hover:bg-muted/30">
                      <Td mono>{String(l.srNo)}</Td>
                      <Td>
                        {l.firstName} {l.lastName}
                      </Td>
                      <Td mono>{l.mobileNo}</Td>
                      <Td>{l.projectName}</Td>
                      <Td>{l.telecaller}</Td>
                      <Td>{l.assignedSales}</Td>
                      <Td mono>{l.svNextFollowup || "—"}</Td>
                      <Td>{l.svRemark || "—"}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrapper>
            )}
            {expanded === g.status && g.leads.length === 0 && (
              <p className="text-center py-4 text-muted-foreground text-sm">
                No leads in this status
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadQuality({ leads }: { leads: Lead[] }) {
  const budgetCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) {
      const b = l.budget || "Not Set";
      map[b] = (map[b] ?? 0) + 1;
    }
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const reqCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of leads) {
      const r = l.requirement || "Not Set";
      map[r] = (map[r] ?? 0) + 1;
    }
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxBudget = Math.max(...budgetCounts.map((b) => b.count), 1);
  const maxReq = Math.max(...reqCounts.map((r) => r.count), 1);

  return (
    <div>
      <SectionHeader title="Lead Quality Report" icon={<Filter size={16} />} />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Budget Distribution
          </h3>
          <div className="space-y-2">
            {budgetCounts.map((b, i) => (
              <HBar
                key={b.name}
                label={b.name}
                value={b.count}
                max={maxBudget}
                color={BAR_COLORS[i % BAR_COLORS.length]}
              />
            ))}
            {budgetCounts.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-4">
                No budget data
              </p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Requirement Type
          </h3>
          <div className="space-y-2 mb-4">
            {reqCounts.map((r, i) => (
              <HBar
                key={r.name}
                label={r.name}
                value={r.count}
                max={maxReq}
                color={BAR_COLORS[i % BAR_COLORS.length]}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {reqCounts.map((r) => (
              <div
                key={r.name}
                className="bg-muted/50 rounded-lg p-2.5 text-center"
              >
                <div className="text-lg font-display font-bold text-foreground">
                  {r.count}
                </div>
                <div className="text-xs text-muted-foreground">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BestSource({ leads }: { leads: Lead[] }) {
  const data = useMemo(() => {
    const map: Record<string, { total: number; svDone: number }> = {};
    for (const l of leads) {
      const s = l.source || "Unknown";
      if (!map[s]) map[s] = { total: 0, svDone: 0 };
      map[s].total++;
      if (l.latestStatus === "SV Done") map[s].svDone++;
    }
    return Object.entries(map)
      .map(([name, d]) => ({
        name,
        ...d,
        convRate: d.total > 0 ? ((d.svDone / d.total) * 100).toFixed(1) : "0.0",
      }))
      .sort((a, b) => Number(b.convRate) - Number(a.convRate));
  }, [leads]);

  const maxTotal = Math.max(...data.map((d) => d.total), 1);

  return (
    <div>
      <SectionHeader
        title="Best Performing Source"
        icon={<Globe size={16} />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {data.slice(0, 3).map((s, i) => (
          <div
            key={s.name}
            className={`rounded-xl border p-4 ${i === 0 ? "bg-accent/10 border-accent/30" : "bg-card border-border"}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-body text-muted-foreground">
                #{i + 1} Source
              </span>
              <Badge
                variant="outline"
                className={
                  i === 0 ? "border-accent/40 text-accent-foreground" : ""
                }
              >
                {s.convRate}%
              </Badge>
            </div>
            <div className="font-display font-semibold text-foreground">
              {s.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {s.total} leads · {s.svDone} SV Done
            </div>
          </div>
        ))}
      </div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Source</Th>
            <Th right>Total Leads</Th>
            <Th right>SV Done</Th>
            <Th right>Conversion Rate</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => (
            <tr key={s.name} className="hover:bg-muted/30 transition-colors">
              <Td>{i + 1}</Td>
              <Td>
                <span className="font-medium">{s.name}</span>
              </Td>
              <Td right>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${Math.round((s.total / maxTotal) * 100)}%`,
                      }}
                    />
                  </div>
                  {s.total}
                </div>
              </Td>
              <Td right>
                <span className="text-emerald-600 font-medium">{s.svDone}</span>
              </Td>
              <Td right>
                <Badge
                  variant="outline"
                  className={
                    Number(s.convRate) >= 15
                      ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                      : Number(s.convRate) >= 5
                        ? "border-amber-300 text-amber-700 bg-amber-50"
                        : "border-border text-muted-foreground"
                  }
                >
                  {s.convRate}%
                </Badge>
              </Td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-muted-foreground text-sm"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  Main page
// ══════════════════════════════════════════════════════════════════════════

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState<ReportTab>("telecaller-perf");
  const [mobileDropOpen, setMobileDropOpen] = useState(false);

  const { data: leads = [] } = useAllLeads();
  const { data: calls = [] } = useCallHistory(null);
  const { data: salesCalls = [] } = useSalesCallHistory(null);
  const { data: telecallerNames = [] } = useUniqueTelecallers();

  const activeTabMeta = TABS.find((t) => t.id === activeTab);

  return (
    <Layout title="Reports Dashboard">
      <div className="flex h-full overflow-hidden">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-56 xl:w-64 bg-card border-r border-border flex-shrink-0 overflow-y-auto">
          <div className="px-3 pt-4 pb-2">
            <span className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-widest px-2">
              Report Sections
            </span>
          </div>
          <nav className="px-2 pb-4 space-y-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-body text-left transition-smooth ${activeTab === tab.id ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                data-ocid={`report-tab-${tab.id}`}
              >
                <span className="flex-shrink-0">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tab selector */}
        <div className="lg:hidden fixed top-14 left-0 right-0 z-20 bg-card border-b border-border px-4 py-2">
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-input bg-background text-sm font-body text-foreground"
              onClick={() => setMobileDropOpen((v) => !v)}
              data-ocid="mobile-report-dropdown"
            >
              <div className="flex items-center gap-2">
                {activeTabMeta?.icon}
                <span>{activeTabMeta?.label}</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-muted-foreground transition-transform ${mobileDropOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileDropOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-30 overflow-hidden max-h-64 overflow-y-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-body text-left transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileDropOpen(false);
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-5 lg:p-7 pt-20 lg:pt-7 max-w-5xl">
            {activeTab === "telecaller-perf" && (
              <TelecallerPerf leads={leads} />
            )}
            {activeTab === "project-summary" && (
              <ProjectSummary leads={leads} />
            )}
            {activeTab === "source-analysis" && (
              <SourceAnalysis leads={leads} />
            )}
            {activeTab === "monthly-trend" && <MonthlyTrend leads={leads} />}
            {activeTab === "funnel" && <ConversionFunnel leads={leads} />}
            {activeTab === "export" && (
              <ExportCSV leads={leads} telecallers={telecallerNames} />
            )}
            {activeTab === "lead-aging" && <LeadAgingReport leads={leads} />}
            {activeTab === "today-calls" && (
              <TodayCallHistory calls={calls} salesCalls={salesCalls} />
            )}
            {activeTab === "today-call-count" && (
              <TodayCallCount calls={calls} />
            )}
            {activeTab === "date-call-count" && (
              <DateCallCount calls={calls} telecallers={telecallerNames} />
            )}
            {activeTab === "sv-status" && <SVStatusReport leads={leads} />}
            {activeTab === "lead-quality" && <LeadQuality leads={leads} />}
            {activeTab === "best-source" && <BestSource leads={leads} />}
          </div>
        </main>
      </div>
    </Layout>
  );
}
