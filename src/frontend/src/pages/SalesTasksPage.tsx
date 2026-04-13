import {
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Hash,
  Loader2,
  PauseCircle,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useTasksByAssignee, useUpdateTaskStatus } from "../hooks/useTasks";
import type { Task } from "../types";

// ── helpers ───────────────────────────────────────────────────────────────────

const ALL_STATUSES = ["Pending", "In Progress", "Completed", "Closed"] as const;

const STATUS_STYLE: Record<
  string,
  { badge: string; icon: React.ReactNode; ring: string }
> = {
  Pending: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <PauseCircle size={13} className="text-amber-600" />,
    ring: "border-amber-200",
  },
  "In Progress": {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Clock size={13} className="text-blue-600" />,
    ring: "border-blue-200",
  },
  Completed: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle2 size={13} className="text-emerald-600" />,
    ring: "border-emerald-200",
  },
  Closed: {
    badge: "bg-muted text-muted-foreground border-border",
    icon: <XCircle size={13} className="text-muted-foreground" />,
    ring: "border-border",
  },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-body font-medium border ${s.badge}`}
    >
      {s.icon}
      {status}
    </span>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatProps {
  label: string;
  value: number;
  color: string;
  active: boolean;
  onClick: () => void;
}
function StatCard({ label, value, color, active, onClick }: StatProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-w-[110px] flex flex-col items-center justify-center px-4 py-3 rounded-xl border transition-smooth cursor-pointer
        ${active ? "ring-2 ring-primary shadow-md bg-card" : "bg-card hover:shadow-sm"}`}
      data-ocid={`sales-task-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <span className={`text-2xl font-display font-bold ${color}`}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground font-body mt-0.5">
        {label}
      </span>
    </button>
  );
}

// ── Task Card (mobile) ────────────────────────────────────────────────────────

function TaskCard({
  task,
  onStatusChange,
}: { task: Task; onStatusChange: (id: bigint, s: string) => void }) {
  const style = STATUS_STYLE[task.status] ?? STATUS_STYLE.Pending;
  return (
    <div
      className={`bg-card border rounded-xl p-4 shadow-xs hover:shadow-sm transition-smooth ${style.ring}`}
      data-ocid="sales-task-card"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              #{task.taskId.toString()}
            </span>
            {task.leadSr !== 0n && (
              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                <Hash size={10} /> Lead {task.leadSr.toString()}
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold text-foreground text-sm leading-tight truncate">
            {task.taskTitle}
          </h3>
          {task.description && (
            <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
          <CalendarClock size={12} />
          <span>{task.dueDate || "No due date"}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.taskId, e.target.value)}
            className="text-xs font-body px-2 py-1 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            data-ocid="sales-task-status-select"
          >
            {ALL_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown
            size={10}
            className="text-muted-foreground -ml-5 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-body text-muted-foreground w-10 text-right">
        {pct}%
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SalesTasksPage() {
  const { session } = useAuth();
  const assignedTo = session?.username ?? "";
  const { data: tasks = [], isLoading } = useTasksByAssignee(assignedTo);
  const updateStatus = useUpdateTaskStatus();

  const [activeStat, setActiveStat] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(false);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "Pending").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
      closed: tasks.filter((t) => t.status === "Closed").length,
    }),
    [tasks],
  );

  const done = stats.completed + stats.closed;

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (activeStat && activeStat !== "Total") {
      list = list.filter((t) => t.status === activeStat);
    }
    list.sort((a, b) => {
      const da = a.dueDate || "99/Dec/9999";
      const db = b.dueDate || "99/Dec/9999";
      return sortAsc ? da.localeCompare(db) : db.localeCompare(da);
    });
    return list;
  }, [tasks, activeStat, sortAsc]);

  function handleStatClick(label: string) {
    setActiveStat((prev) => (prev === label ? null : label));
  }

  return (
    <Layout title="My Tasks">
      <div className="p-4 md:p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-display font-bold text-foreground text-xl">
              My Tasks
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Tasks assigned to{" "}
              <span className="text-foreground font-medium">{assignedTo}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSortAsc((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-body text-muted-foreground hover:bg-muted transition-smooth"
            data-ocid="btn-sort-due-date"
          >
            <CalendarClock size={13} />
            Due: {sortAsc ? "Earliest First" : "Latest First"}
          </button>
        </div>

        {/* Progress */}
        {tasks.length > 0 && (
          <div className="bg-card border border-border rounded-xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body font-medium text-foreground">
                Overall Progress
              </span>
              <span className="text-xs font-body text-muted-foreground">
                {done} of {stats.total} done
              </span>
            </div>
            <ProgressBar done={done} total={stats.total} />
          </div>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-3">
          <StatCard
            label="Total"
            value={stats.total}
            color="text-primary"
            active={activeStat === "Total"}
            onClick={() => handleStatClick("Total")}
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            color="text-amber-700"
            active={activeStat === "Pending"}
            onClick={() => handleStatClick("Pending")}
          />
          <StatCard
            label="In Progress"
            value={stats.inProgress}
            color="text-blue-700"
            active={activeStat === "In Progress"}
            onClick={() => handleStatClick("In Progress")}
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            color="text-emerald-700"
            active={activeStat === "Completed"}
            onClick={() => handleStatClick("Completed")}
          />
          <StatCard
            label="Closed"
            value={stats.closed}
            color="text-muted-foreground"
            active={activeStat === "Closed"}
            onClick={() => handleStatClick("Closed")}
          />
        </div>

        {/* Task list */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground font-body">
              Loading your tasks…
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-card border border-border rounded-xl">
            <ClipboardList
              size={40}
              className="text-muted-foreground/30 mb-4"
            />
            <p className="font-display font-semibold text-foreground">
              No tasks yet
            </p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {activeStat
                ? `No "${activeStat}" tasks`
                : "Your admin will assign tasks to you"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="bg-muted/60 border-b border-border">
                    {[
                      "#",
                      "Task Title",
                      "Description",
                      "Due Date",
                      "Lead Sr.",
                      "Status",
                      "Update",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-left text-xs font-body font-semibold text-muted-foreground whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((task) => (
                    <tr
                      key={task.taskId.toString()}
                      className="hover:bg-muted/30 transition-colors"
                      data-ocid="sales-task-row"
                    >
                      <td className="px-3 py-2.5 text-muted-foreground font-mono text-xs">
                        #{task.taskId.toString()}
                      </td>
                      <td className="px-3 py-2.5 font-medium text-foreground max-w-[200px]">
                        <div className="truncate">{task.taskTitle}</div>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground max-w-[220px]">
                        <div className="truncate text-xs">
                          {task.description || "—"}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-foreground">
                        {task.dueDate || "—"}
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground text-right">
                        {task.leadSr !== 0n ? task.leadSr.toString() : "—"}
                      </td>
                      <td className="px-3 py-2.5">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="px-3 py-2.5">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateStatus.mutate({
                              taskId: task.taskId,
                              status: e.target.value,
                            })
                          }
                          className="text-xs font-body px-2 py-1.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                          data-ocid="sales-task-status-select"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2.5 bg-muted/30 border-t border-border text-xs text-muted-foreground font-body">
                {filtered.length} task{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden grid gap-3">
              {filtered.map((task) => (
                <TaskCard
                  key={task.taskId.toString()}
                  task={task}
                  onStatusChange={(id, s) =>
                    updateStatus.mutate({ taskId: id, status: s })
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
