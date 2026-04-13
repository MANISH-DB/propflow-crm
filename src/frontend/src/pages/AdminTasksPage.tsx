import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Loader2,
  PauseCircle,
  Pencil,
  Plus,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import {
  useUniqueSalesPersons,
  useUniqueTelecallers,
} from "../hooks/useProjects";
import {
  useAddTask,
  useAllTasks,
  useDeleteTask,
  useUpdateTask,
  useUpdateTaskStatus,
} from "../hooks/useTasks";
import type { Task } from "../types";
import { TASK_STATUSES } from "../types";
import { fromInputDate, todayStr } from "../utils/dateUtils";

// ── helpers ───────────────────────────────────────────────────────────────────

function emptyTask(createdBy: string): Task {
  return {
    taskId: 0n,
    assignedTo: "",
    role: "Telecaller",
    taskTitle: "",
    description: "",
    dueDate: "",
    leadSr: 0n,
    status: "Pending",
    createdDate: todayStr(),
    createdBy,
  };
}

const STATUS_STYLE: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Closed: "bg-muted text-muted-foreground border-border",
};

const ALL_STATUSES = ["Pending", "In Progress", "Completed", "Closed"] as const;

function dueDateToInput(dueDate: string): string {
  if (!dueDate) return "";
  const p = dueDate.split("/");
  if (p.length !== 3) return "";
  const months: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  return `${p[2]}-${months[p[1]] ?? "01"}-${p[0]}`;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  active: boolean;
  onClick: () => void;
}

function StatCard({
  label,
  value,
  icon,
  color,
  active,
  onClick,
}: StatCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 min-w-[120px] flex items-center gap-3 px-4 py-3 rounded-xl border transition-smooth cursor-pointer text-left
        ${active ? "ring-2 ring-primary shadow-md bg-card" : "bg-card hover:shadow-sm"}`}
      data-ocid={`task-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground leading-none">
          {value}
        </p>
        <p className="text-xs text-muted-foreground font-body mt-0.5">
          {label}
        </p>
      </div>
    </button>
  );
}

// ── Create / Edit Modal ───────────────────────────────────────────────────────

interface TaskModalProps {
  task: Task;
  telecallers: string[];
  salesPersons: string[];
  onClose: () => void;
  onSave: (t: Task) => void;
  isSaving: boolean;
}

function TaskModal({
  task: initial,
  telecallers,
  salesPersons,
  onClose,
  onSave,
  isSaving,
}: TaskModalProps) {
  const [form, setForm] = useState<Task>(initial);
  const assigneeOptions =
    form.role === "Telecaller" ? telecallers : salesPersons;

  function set<K extends keyof Task>(k: K, v: Task[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  const isValid =
    form.assignedTo.trim() && form.taskTitle.trim() && form.dueDate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg border border-border overflow-hidden">
        <div className="px-6 py-4 bg-primary border-b border-sidebar-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-primary-foreground text-lg">
            {initial.taskId === 0n ? "Create New Task" : "Edit Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-md hover:bg-primary-foreground/10 text-primary-foreground/80"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="tf-role"
                className="block text-xs font-body font-medium text-muted-foreground mb-1"
              >
                Role *
              </label>
              <select
                id="tf-role"
                value={form.role}
                onChange={(e) => {
                  set("role", e.target.value);
                  set("assignedTo", "");
                }}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="task-form-role"
              >
                <option value="Telecaller">Telecaller</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="tf-assigned"
                className="block text-xs font-body font-medium text-muted-foreground mb-1"
              >
                Assigned To *
              </label>
              <input
                id="tf-assigned"
                list="assignee-list"
                value={form.assignedTo}
                onChange={(e) => set("assignedTo", e.target.value)}
                placeholder="Enter name…"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="task-form-assigned-to"
              />
              <datalist id="assignee-list">
                {assigneeOptions.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label
              htmlFor="tf-title"
              className="block text-xs font-body font-medium text-muted-foreground mb-1"
            >
              Task Title *
            </label>
            <input
              id="tf-title"
              value={form.taskTitle}
              onChange={(e) => set("taskTitle", e.target.value)}
              placeholder="Enter task title…"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="task-form-title"
            />
          </div>

          <div>
            <label
              htmlFor="tf-desc"
              className="block text-xs font-body font-medium text-muted-foreground mb-1"
            >
              Description
            </label>
            <textarea
              id="tf-desc"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Task details…"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="task-form-description"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="tf-due"
                className="block text-xs font-body font-medium text-muted-foreground mb-1"
              >
                Due Date *
              </label>
              <input
                id="tf-due"
                type="date"
                value={dueDateToInput(form.dueDate)}
                onChange={(e) => set("dueDate", fromInputDate(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="task-form-due-date"
              />
            </div>
            <div>
              <label
                htmlFor="tf-lead-sr"
                className="block text-xs font-body font-medium text-muted-foreground mb-1"
              >
                Lead Sr.
              </label>
              <input
                id="tf-lead-sr"
                type="number"
                value={form.leadSr === 0n ? "" : form.leadSr.toString()}
                onChange={(e) =>
                  set("leadSr", e.target.value ? BigInt(e.target.value) : 0n)
                }
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="task-form-lead-sr"
              />
            </div>
            <div>
              <label
                htmlFor="tf-status"
                className="block text-xs font-body font-medium text-muted-foreground mb-1"
              >
                Status
              </label>
              <select
                id="tf-status"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="task-form-status"
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="tf-created-by"
              className="block text-xs font-body font-medium text-muted-foreground mb-1"
            >
              Created By
            </label>
            <input
              id="tf-created-by"
              value={form.createdBy}
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm font-body text-muted-foreground"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-muted/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-sm font-body hover:bg-muted transition-smooth"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => isValid && onSave(form)}
            disabled={!isValid || isSaving}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 disabled:opacity-50 transition-smooth flex items-center gap-2"
            data-ocid="task-form-save"
          >
            {isSaving && <Loader2 size={14} className="animate-spin" />}
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirmation ───────────────────────────────────────────────────────

function DeleteConfirm({
  task,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  task: Task;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <Trash2 size={18} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Delete Task
            </h3>
            <p className="text-xs text-muted-foreground font-body">
              This action cannot be undone
            </p>
          </div>
        </div>
        <p className="text-sm font-body text-foreground mb-6">
          Delete <span className="font-medium">"{task.taskTitle}"</span>{" "}
          assigned to <span className="font-medium">{task.assignedTo}</span>?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-body hover:bg-muted transition-smooth"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-body font-medium hover:bg-destructive/90 disabled:opacity-50 transition-smooth flex items-center justify-center gap-2"
            data-ocid="confirm-delete-task"
          >
            {isDeleting && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminTasksPage() {
  const { session } = useAuth();
  const { data: tasks = [], isLoading } = useAllTasks();
  const { data: telecallers = [] } = useUniqueTelecallers();
  const { data: salesPersons = [] } = useUniqueSalesPersons();

  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const [modal, setModal] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [filterTelecaller, setFilterTelecaller] = useState("All");
  const [filterSales, setFilterSales] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDue, setFilterDue] = useState("");
  const [activeStat, setActiveStat] = useState<string | null>(null);

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const closed = tasks.filter((t) => t.status === "Closed").length;

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (activeStat && activeStat !== "Total")
      list = list.filter((t) => t.status === activeStat);
    if (filterTelecaller !== "All")
      list = list.filter(
        (t) => t.role === "Telecaller" && t.assignedTo === filterTelecaller,
      );
    if (filterSales !== "All")
      list = list.filter(
        (t) => t.role === "Sales" && t.assignedTo === filterSales,
      );
    if (filterStatus !== "All")
      list = list.filter((t) => t.status === filterStatus);
    if (filterDue)
      list = list.filter((t) => t.dueDate === fromInputDate(filterDue));
    return list.sort((a, b) => Number(b.taskId - a.taskId));
  }, [
    tasks,
    activeStat,
    filterTelecaller,
    filterSales,
    filterStatus,
    filterDue,
  ]);

  const isDirty =
    filterTelecaller !== "All" ||
    filterSales !== "All" ||
    filterStatus !== "All" ||
    !!filterDue ||
    !!activeStat;

  function handleStatClick(label: string) {
    setActiveStat((prev) => (prev === label ? null : label));
    setFilterStatus("All");
  }

  function openCreate() {
    setModal(emptyTask(session?.username ?? "Admin"));
  }

  function handleSave(task: Task) {
    if (task.taskId === 0n) {
      addTask.mutate(
        { ...task, createdDate: todayStr() },
        { onSuccess: () => setModal(null) },
      );
    } else {
      updateTask.mutate(task, { onSuccess: () => setModal(null) });
    }
  }

  const isMutating = addTask.isPending || updateTask.isPending;

  return (
    <Layout title="Manage Tasks">
      <div className="p-4 md:p-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-display font-bold text-foreground text-xl">
              Task Management
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Assign and track tasks across your team
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 transition-smooth shadow-sm"
            data-ocid="btn-create-task"
          >
            <Plus size={15} />
            Create Task
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatCard
            label="Total"
            value={total}
            icon={
              <ClipboardList size={17} className="text-primary-foreground" />
            }
            color="bg-primary"
            active={activeStat === "Total"}
            onClick={() => handleStatClick("Total")}
          />
          <StatCard
            label="Pending"
            value={pending}
            icon={<PauseCircle size={17} className="text-amber-700" />}
            color="bg-amber-100"
            active={activeStat === "Pending"}
            onClick={() => handleStatClick("Pending")}
          />
          <StatCard
            label="In Progress"
            value={inProgress}
            icon={<Clock size={17} className="text-blue-700" />}
            color="bg-blue-100"
            active={activeStat === "In Progress"}
            onClick={() => handleStatClick("In Progress")}
          />
          <StatCard
            label="Completed"
            value={completed}
            icon={<CheckCircle2 size={17} className="text-emerald-700" />}
            color="bg-emerald-100"
            active={activeStat === "Completed"}
            onClick={() => handleStatClick("Completed")}
          />
          <StatCard
            label="Closed"
            value={closed}
            icon={<XCircle size={17} className="text-muted-foreground" />}
            color="bg-muted"
            active={activeStat === "Closed"}
            onClick={() => handleStatClick("Closed")}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-end bg-card border border-border rounded-xl p-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="admin-filter-tc"
              className="text-xs font-body text-muted-foreground"
            >
              Telecaller
            </label>
            <select
              id="admin-filter-tc"
              value={filterTelecaller}
              onChange={(e) => setFilterTelecaller(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="filter-telecaller"
            >
              <option value="All">All Telecallers</option>
              {telecallers.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="admin-filter-sp"
              className="text-xs font-body text-muted-foreground"
            >
              Sales Person
            </label>
            <select
              id="admin-filter-sp"
              value={filterSales}
              onChange={(e) => setFilterSales(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="filter-sales"
            >
              <option value="All">All Sales</option>
              {salesPersons.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="admin-filter-st"
              className="text-xs font-body text-muted-foreground"
            >
              Status
            </label>
            <select
              id="admin-filter-st"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="filter-status"
            >
              <option value="All">All Status</option>
              {ALL_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="admin-filter-due"
              className="text-xs font-body text-muted-foreground"
            >
              Due Date
            </label>
            <input
              id="admin-filter-due"
              type="date"
              value={filterDue}
              onChange={(e) => setFilterDue(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="filter-due-date"
            />
          </div>
          {isDirty && (
            <button
              type="button"
              onClick={() => {
                setFilterTelecaller("All");
                setFilterSales("All");
                setFilterStatus("All");
                setFilterDue("");
                setActiveStat(null);
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-body text-muted-foreground hover:bg-muted transition-smooth"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  {[
                    "Task ID",
                    "Title",
                    "Assigned To",
                    "Role",
                    "Due Date",
                    "Lead Sr.",
                    "Status",
                    "Created By",
                    "Created Date",
                    "Actions",
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      <Loader2
                        size={24}
                        className="animate-spin mx-auto mb-2"
                      />
                      <p className="text-sm">Loading tasks…</p>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center">
                      <ClipboardList
                        size={36}
                        className="mx-auto text-muted-foreground/40 mb-3"
                      />
                      <p className="text-sm font-body text-muted-foreground">
                        No tasks found
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        Create a task to get started
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((task) => (
                    <tr
                      key={task.taskId.toString()}
                      className="hover:bg-muted/30 transition-colors"
                      data-ocid="task-row"
                    >
                      <td className="px-3 py-2.5 text-muted-foreground font-mono text-xs">
                        #{task.taskId.toString()}
                      </td>
                      <td className="px-3 py-2.5 font-medium text-foreground max-w-[180px]">
                        <div className="truncate" title={task.taskTitle}>
                          {task.taskTitle}
                        </div>
                        {task.description && (
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {task.description}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-foreground whitespace-nowrap">
                        {task.assignedTo}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-body font-medium border ${task.role === "Telecaller" ? "bg-accent/20 text-accent-foreground border-accent/30" : "bg-primary/10 text-primary border-primary/20"}`}
                        >
                          {task.role}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-foreground whitespace-nowrap">
                        {task.dueDate || "—"}
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground text-right">
                        {task.leadSr !== 0n ? task.leadSr.toString() : "—"}
                      </td>
                      <td className="px-3 py-2.5 min-w-[140px]">
                        <select
                          aria-label={`Status for task ${task.taskId.toString()}`}
                          value={task.status}
                          onChange={(e) =>
                            updateStatus.mutate({
                              taskId: task.taskId,
                              status: e.target.value,
                            })
                          }
                          className={`w-full px-2 py-1 rounded-full border text-xs font-body font-medium focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer ${STATUS_STYLE[task.status] ?? ""}`}
                          data-ocid="task-status-select"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2.5 text-foreground whitespace-nowrap">
                        {task.createdBy}
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                        {task.createdDate}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setModal(task)}
                            aria-label="Edit task"
                            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
                            data-ocid="btn-edit-task"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(task)}
                            aria-label="Delete task"
                            className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth"
                            data-ocid="btn-delete-task"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-4 py-2.5 bg-muted/30 border-t border-border text-xs text-muted-foreground font-body">
              Showing {filtered.length} of {tasks.length} tasks
            </div>
          )}
        </div>
      </div>

      {modal && (
        <TaskModal
          task={modal}
          telecallers={telecallers}
          salesPersons={salesPersons}
          onClose={() => setModal(null)}
          onSave={handleSave}
          isSaving={isMutating}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          task={deleteTarget}
          onConfirm={() =>
            deleteTask.mutate(deleteTarget.taskId, {
              onSuccess: () => setDeleteTarget(null),
            })
          }
          onCancel={() => setDeleteTarget(null)}
          isDeleting={deleteTask.isPending}
        />
      )}
    </Layout>
  );
}
