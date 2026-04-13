import { a as useAuth, r as reactExports, j as jsxRuntimeExports, T as TASK_STATUSES } from "./index-BYjlLTrJ.js";
import { a as Layout } from "./Layout-D8UrcW-o.js";
import { d as useUniqueTelecallers, b as useUniqueSalesPersons } from "./useProjects-DYXnZIVc.js";
import { a as useAllTasks, b as useAddTask, c as useUpdateTask, d as useUpdateTaskStatus, e as useDeleteTask, C as CircleX, u as useTasksByAssignee } from "./useTasks-DgilsZ2-.js";
import { f as fromInputDate, a as todayStr, X } from "./dateUtils-CEWG1Xtm.js";
import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
import { C as ClipboardList } from "./refresh-cw-C5sG_0Bc.js";
import { C as CirclePause, a as Clock, L as LoaderCircle, P as Pencil, b as CalendarClock, H as Hash, T as TelecallerTasksPage } from "./TelecallerTasksPage-BEgHcimx.js";
import { C as CircleCheck } from "./circle-check-DyAcnbJK.js";
import { C as ChevronDown } from "./chevron-down-DWmfF_uF.js";
import "./smartphone-CJQPGBQn.js";
import "./chart-column-DnJLxgFx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function emptyTask(createdBy) {
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
    createdBy
  };
}
const STATUS_STYLE$1 = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Closed: "bg-muted text-muted-foreground border-border"
};
const ALL_STATUSES$1 = ["Pending", "In Progress", "Completed", "Closed"];
function dueDateToInput(dueDate) {
  if (!dueDate) return "";
  const p = dueDate.split("/");
  if (p.length !== 3) return "";
  const months = {
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
    Dec: "12"
  };
  return `${p[2]}-${months[p[1]] ?? "01"}-${p[0]}`;
}
function StatCard$1({
  label,
  value,
  icon,
  color,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `flex-1 min-w-[120px] flex items-center gap-3 px-4 py-3 rounded-xl border transition-smooth cursor-pointer text-left
        ${active ? "ring-2 ring-primary shadow-md bg-card" : "bg-card hover:shadow-sm"}`,
      "data-ocid": `task-stat-${label.toLowerCase().replace(/\s+/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-lg flex items-center justify-center ${color}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: label })
        ] })
      ]
    }
  );
}
function TaskModal({
  task: initial,
  telecallers,
  salesPersons,
  onClose,
  onSave,
  isSaving
}) {
  const [form, setForm] = reactExports.useState(initial);
  const assigneeOptions = form.role === "Telecaller" ? telecallers : salesPersons;
  function set(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }
  const isValid = form.assignedTo.trim() && form.taskTitle.trim() && form.dueDate;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-lg border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-primary border-b border-sidebar-border flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-primary-foreground text-lg", children: initial.taskId === 0n ? "Create New Task" : "Edit Task" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          "aria-label": "Close",
          className: "p-1.5 rounded-md hover:bg-primary-foreground/10 text-primary-foreground/80",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "tf-role",
              className: "block text-xs font-body font-medium text-muted-foreground mb-1",
              children: "Role *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "tf-role",
              value: form.role,
              onChange: (e) => {
                set("role", e.target.value);
                set("assignedTo", "");
              },
              className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "task-form-role",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Telecaller", children: "Telecaller" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sales", children: "Sales" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "tf-assigned",
              className: "block text-xs font-body font-medium text-muted-foreground mb-1",
              children: "Assigned To *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "tf-assigned",
              list: "assignee-list",
              value: form.assignedTo,
              onChange: (e) => set("assignedTo", e.target.value),
              placeholder: "Enter name…",
              className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "task-form-assigned-to"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "assignee-list", children: assigneeOptions.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: n }, n)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "tf-title",
            className: "block text-xs font-body font-medium text-muted-foreground mb-1",
            children: "Task Title *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "tf-title",
            value: form.taskTitle,
            onChange: (e) => set("taskTitle", e.target.value),
            placeholder: "Enter task title…",
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "task-form-title"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "tf-desc",
            className: "block text-xs font-body font-medium text-muted-foreground mb-1",
            children: "Description"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            id: "tf-desc",
            value: form.description,
            onChange: (e) => set("description", e.target.value),
            placeholder: "Task details…",
            rows: 3,
            className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none",
            "data-ocid": "task-form-description"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "tf-due",
              className: "block text-xs font-body font-medium text-muted-foreground mb-1",
              children: "Due Date *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "tf-due",
              type: "date",
              value: dueDateToInput(form.dueDate),
              onChange: (e) => set("dueDate", fromInputDate(e.target.value)),
              className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "task-form-due-date"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "tf-lead-sr",
              className: "block text-xs font-body font-medium text-muted-foreground mb-1",
              children: "Lead Sr."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "tf-lead-sr",
              type: "number",
              value: form.leadSr === 0n ? "" : form.leadSr.toString(),
              onChange: (e) => set("leadSr", e.target.value ? BigInt(e.target.value) : 0n),
              placeholder: "Optional",
              className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "task-form-lead-sr"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "tf-status",
              className: "block text-xs font-body font-medium text-muted-foreground mb-1",
              children: "Status"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "tf-status",
              value: form.status,
              onChange: (e) => set("status", e.target.value),
              className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "task-form-status",
              children: TASK_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "tf-created-by",
            className: "block text-xs font-body font-medium text-muted-foreground mb-1",
            children: "Created By"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "tf-created-by",
            value: form.createdBy,
            readOnly: true,
            className: "w-full px-3 py-2 rounded-lg border border-input bg-muted text-sm font-body text-muted-foreground"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border flex justify-end gap-3 bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "px-4 py-2 rounded-lg border border-border text-sm font-body hover:bg-muted transition-smooth",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => isValid && onSave(form),
          disabled: !isValid || isSaving,
          className: "px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 disabled:opacity-50 transition-smooth flex items-center gap-2",
          "data-ocid": "task-form-save",
          children: [
            isSaving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
            "Save Task"
          ]
        }
      )
    ] })
  ] }) });
}
function DeleteConfirm({
  task,
  onConfirm,
  onCancel,
  isDeleting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-sm border border-border p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Task" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "This action cannot be undone" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body text-foreground mb-6", children: [
      "Delete ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
        '"',
        task.taskTitle,
        '"'
      ] }),
      " ",
      "assigned to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: task.assignedTo }),
      "?"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "flex-1 px-4 py-2 rounded-lg border border-border text-sm font-body hover:bg-muted transition-smooth",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onConfirm,
          disabled: isDeleting,
          className: "flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-body font-medium hover:bg-destructive/90 disabled:opacity-50 transition-smooth flex items-center justify-center gap-2",
          "data-ocid": "confirm-delete-task",
          children: [
            isDeleting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
            "Delete"
          ]
        }
      )
    ] })
  ] }) });
}
function AdminTasksPage() {
  const { session } = useAuth();
  const { data: tasks = [], isLoading } = useAllTasks();
  const { data: telecallers = [] } = useUniqueTelecallers();
  const { data: salesPersons = [] } = useUniqueSalesPersons();
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();
  const [modal, setModal] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [filterTelecaller, setFilterTelecaller] = reactExports.useState("All");
  const [filterSales, setFilterSales] = reactExports.useState("All");
  const [filterStatus, setFilterStatus] = reactExports.useState("All");
  const [filterDue, setFilterDue] = reactExports.useState("");
  const [activeStat, setActiveStat] = reactExports.useState(null);
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const closed = tasks.filter((t) => t.status === "Closed").length;
  const filtered = reactExports.useMemo(() => {
    let list = [...tasks];
    if (activeStat && activeStat !== "Total")
      list = list.filter((t) => t.status === activeStat);
    if (filterTelecaller !== "All")
      list = list.filter(
        (t) => t.role === "Telecaller" && t.assignedTo === filterTelecaller
      );
    if (filterSales !== "All")
      list = list.filter(
        (t) => t.role === "Sales" && t.assignedTo === filterSales
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
    filterDue
  ]);
  const isDirty = filterTelecaller !== "All" || filterSales !== "All" || filterStatus !== "All" || !!filterDue || !!activeStat;
  function handleStatClick(label) {
    setActiveStat((prev) => prev === label ? null : label);
    setFilterStatus("All");
  }
  function openCreate() {
    setModal(emptyTask((session == null ? void 0 : session.username) ?? "Admin"));
  }
  function handleSave(task) {
    if (task.taskId === 0n) {
      addTask.mutate(
        { ...task, createdDate: todayStr() },
        { onSuccess: () => setModal(null) }
      );
    } else {
      updateTask.mutate(task, { onSuccess: () => setModal(null) });
    }
  }
  const isMutating = addTask.isPending || updateTask.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { title: "Manage Tasks", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl", children: "Task Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Assign and track tasks across your team" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: openCreate,
            className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 transition-smooth shadow-sm",
            "data-ocid": "btn-create-task",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
              "Create Task"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard$1,
          {
            label: "Total",
            value: total,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 17, className: "text-primary-foreground" }),
            color: "bg-primary",
            active: activeStat === "Total",
            onClick: () => handleStatClick("Total")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard$1,
          {
            label: "Pending",
            value: pending,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { size: 17, className: "text-amber-700" }),
            color: "bg-amber-100",
            active: activeStat === "Pending",
            onClick: () => handleStatClick("Pending")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard$1,
          {
            label: "In Progress",
            value: inProgress,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 17, className: "text-blue-700" }),
            color: "bg-blue-100",
            active: activeStat === "In Progress",
            onClick: () => handleStatClick("In Progress")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard$1,
          {
            label: "Completed",
            value: completed,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 17, className: "text-emerald-700" }),
            color: "bg-emerald-100",
            active: activeStat === "Completed",
            onClick: () => handleStatClick("Completed")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard$1,
          {
            label: "Closed",
            value: closed,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 17, className: "text-muted-foreground" }),
            color: "bg-muted",
            active: activeStat === "Closed",
            onClick: () => handleStatClick("Closed")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end bg-card border border-border rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "admin-filter-tc",
              className: "text-xs font-body text-muted-foreground",
              children: "Telecaller"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-filter-tc",
              value: filterTelecaller,
              onChange: (e) => setFilterTelecaller(e.target.value),
              className: "px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "filter-telecaller",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Telecallers" }),
                telecallers.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "admin-filter-sp",
              className: "text-xs font-body text-muted-foreground",
              children: "Sales Person"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-filter-sp",
              value: filterSales,
              onChange: (e) => setFilterSales(e.target.value),
              className: "px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "filter-sales",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Sales" }),
                salesPersons.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "admin-filter-st",
              className: "text-xs font-body text-muted-foreground",
              children: "Status"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "admin-filter-st",
              value: filterStatus,
              onChange: (e) => setFilterStatus(e.target.value),
              className: "px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "filter-status",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Status" }),
                ALL_STATUSES$1.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "admin-filter-due",
              className: "text-xs font-body text-muted-foreground",
              children: "Due Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "admin-filter-due",
              type: "date",
              value: filterDue,
              onChange: (e) => setFilterDue(e.target.value),
              className: "px-3 py-1.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "filter-due-date"
            }
          )
        ] }),
        isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setFilterTelecaller("All");
              setFilterSales("All");
              setFilterStatus("All");
              setFilterDue("");
              setActiveStat(null);
            },
            className: "px-3 py-1.5 rounded-lg border border-border text-xs font-body text-muted-foreground hover:bg-muted transition-smooth",
            children: "Clear Filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm font-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/60 border-b border-border", children: [
            "Task ID",
            "Title",
            "Assigned To",
            "Role",
            "Due Date",
            "Lead Sr.",
            "Status",
            "Created By",
            "Created Date",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-3 py-2.5 text-left text-xs font-body font-semibold text-muted-foreground whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "td",
            {
              colSpan: 10,
              className: "px-4 py-10 text-center text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LoaderCircle,
                  {
                    size: 24,
                    className: "animate-spin mx-auto mb-2"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading tasks…" })
              ]
            }
          ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 10, className: "px-4 py-12 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ClipboardList,
              {
                size: 36,
                className: "mx-auto text-muted-foreground/40 mb-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: "No tasks found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Create a task to get started" })
          ] }) }) : filtered.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/30 transition-colors",
              "data-ocid": "task-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-muted-foreground font-mono text-xs", children: [
                  "#",
                  task.taskId.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 font-medium text-foreground max-w-[180px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", title: task.taskTitle, children: task.taskTitle }),
                  task.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate mt-0.5", children: task.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground whitespace-nowrap", children: task.assignedTo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-body font-medium border ${task.role === "Telecaller" ? "bg-accent/20 text-accent-foreground border-accent/30" : "bg-primary/10 text-primary border-primary/20"}`,
                    children: task.role
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground whitespace-nowrap", children: task.dueDate || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground text-right", children: task.leadSr !== 0n ? task.leadSr.toString() : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 min-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    "aria-label": `Status for task ${task.taskId.toString()}`,
                    value: task.status,
                    onChange: (e) => updateStatus.mutate({
                      taskId: task.taskId,
                      status: e.target.value
                    }),
                    className: `w-full px-2 py-1 rounded-full border text-xs font-body font-medium focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer ${STATUS_STYLE$1[task.status] ?? ""}`,
                    "data-ocid": "task-status-select",
                    children: ALL_STATUSES$1.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground whitespace-nowrap", children: task.createdBy }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground whitespace-nowrap", children: task.createdDate }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setModal(task),
                      "aria-label": "Edit task",
                      className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "btn-edit-task",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(task),
                      "aria-label": "Delete task",
                      className: "p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth",
                      "data-ocid": "btn-delete-task",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                    }
                  )
                ] }) })
              ]
            },
            task.taskId.toString()
          )) })
        ] }) }),
        filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 bg-muted/30 border-t border-border text-xs text-muted-foreground font-body", children: [
          "Showing ",
          filtered.length,
          " of ",
          tasks.length,
          " tasks"
        ] })
      ] })
    ] }),
    modal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskModal,
      {
        task: modal,
        telecallers,
        salesPersons,
        onClose: () => setModal(null),
        onSave: handleSave,
        isSaving: isMutating
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        task: deleteTarget,
        onConfirm: () => deleteTask.mutate(deleteTarget.taskId, {
          onSuccess: () => setDeleteTarget(null)
        }),
        onCancel: () => setDeleteTarget(null),
        isDeleting: deleteTask.isPending
      }
    )
  ] });
}
const ALL_STATUSES = ["Pending", "In Progress", "Completed", "Closed"];
const STATUS_STYLE = {
  Pending: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { size: 13, className: "text-amber-600" }),
    ring: "border-amber-200"
  },
  "In Progress": {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "text-blue-600" }),
    ring: "border-blue-200"
  },
  Completed: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13, className: "text-emerald-600" }),
    ring: "border-emerald-200"
  },
  Closed: {
    badge: "bg-muted text-muted-foreground border-border",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 13, className: "text-muted-foreground" }),
    ring: "border-border"
  }
};
function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-body font-medium border ${s.badge}`,
      children: [
        s.icon,
        status
      ]
    }
  );
}
function StatCard({ label, value, color, active, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `flex-1 min-w-[110px] flex flex-col items-center justify-center px-4 py-3 rounded-xl border transition-smooth cursor-pointer
        ${active ? "ring-2 ring-primary shadow-md bg-card" : "bg-card hover:shadow-sm"}`,
      "data-ocid": `sales-task-stat-${label.toLowerCase().replace(/\s+/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-display font-bold ${color}`, children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body mt-0.5", children: label })
      ]
    }
  );
}
function TaskCard({
  task,
  onStatusChange
}) {
  const style = STATUS_STYLE[task.status] ?? STATUS_STYLE.Pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-xl p-4 shadow-xs hover:shadow-sm transition-smooth ${style.ring}`,
      "data-ocid": "sales-task-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded", children: [
                "#",
                task.taskId.toString()
              ] }),
              task.leadSr !== 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 10 }),
                " Lead ",
                task.leadSr.toString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight truncate", children: task.taskTitle }),
            task.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1 line-clamp-2", children: task.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: task.dueDate || "No due date" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: task.status,
                onChange: (e) => onStatusChange(task.taskId, e.target.value),
                className: "text-xs font-body px-2 py-1 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                "data-ocid": "sales-task-status-select",
                children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                size: 10,
                className: "text-muted-foreground -ml-5 pointer-events-none"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ProgressBar({ done, total }) {
  const pct = total > 0 ? Math.round(done / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-primary rounded-full transition-all duration-500",
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground w-10 text-right", children: [
      pct,
      "%"
    ] })
  ] });
}
function SalesTasksPage() {
  const { session } = useAuth();
  const assignedTo = (session == null ? void 0 : session.username) ?? "";
  const { data: tasks = [], isLoading } = useTasksByAssignee(assignedTo);
  const updateStatus = useUpdateTaskStatus();
  const [activeStat, setActiveStat] = reactExports.useState(null);
  const [sortAsc, setSortAsc] = reactExports.useState(false);
  const stats = reactExports.useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "Pending").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
      closed: tasks.filter((t) => t.status === "Closed").length
    }),
    [tasks]
  );
  const done = stats.completed + stats.closed;
  const filtered = reactExports.useMemo(() => {
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
  function handleStatClick(label) {
    setActiveStat((prev) => prev === label ? null : label);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "My Tasks", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl", children: "My Tasks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-body", children: [
          "Tasks assigned to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: assignedTo })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSortAsc((v) => !v),
          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-body text-muted-foreground hover:bg-muted transition-smooth",
          "data-ocid": "btn-sort-due-date",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 13 }),
            "Due: ",
            sortAsc ? "Earliest First" : "Latest First"
          ]
        }
      )
    ] }),
    tasks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-foreground", children: "Overall Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground", children: [
          done,
          " of ",
          stats.total,
          " done"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { done, total: stats.total })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total",
          value: stats.total,
          color: "text-primary",
          active: activeStat === "Total",
          onClick: () => handleStatClick("Total")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending",
          value: stats.pending,
          color: "text-amber-700",
          active: activeStat === "Pending",
          onClick: () => handleStatClick("Pending")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "In Progress",
          value: stats.inProgress,
          color: "text-blue-700",
          active: activeStat === "In Progress",
          onClick: () => handleStatClick("In Progress")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Completed",
          value: stats.completed,
          color: "text-emerald-700",
          active: activeStat === "Completed",
          onClick: () => handleStatClick("Completed")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Closed",
          value: stats.closed,
          color: "text-muted-foreground",
          active: activeStat === "Closed",
          onClick: () => handleStatClick("Closed")
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 32, className: "animate-spin text-primary mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Loading your tasks…" })
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 bg-card border border-border rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClipboardList,
        {
          size: 40,
          className: "text-muted-foreground/30 mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No tasks yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: activeStat ? `No "${activeStat}" tasks` : "Your admin will assign tasks to you" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm font-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/60 border-b border-border", children: [
            "#",
            "Task Title",
            "Description",
            "Due Date",
            "Lead Sr.",
            "Status",
            "Update"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-3 py-2.5 text-left text-xs font-body font-semibold text-muted-foreground whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/30 transition-colors",
              "data-ocid": "sales-task-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-muted-foreground font-mono text-xs", children: [
                  "#",
                  task.taskId.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", children: task.taskTitle }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs", children: task.description || "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 whitespace-nowrap text-foreground", children: task.dueDate || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground text-right", children: task.leadSr !== 0n ? task.leadSr.toString() : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: task.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: task.status,
                    onChange: (e) => updateStatus.mutate({
                      taskId: task.taskId,
                      status: e.target.value
                    }),
                    className: "text-xs font-body px-2 py-1.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                    "data-ocid": "sales-task-status-select",
                    children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
                  }
                ) })
              ]
            },
            task.taskId.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 bg-muted/30 border-t border-border text-xs text-muted-foreground font-body", children: [
          filtered.length,
          " task",
          filtered.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden grid gap-3", children: filtered.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TaskCard,
        {
          task,
          onStatusChange: (id, s) => updateStatus.mutate({ taskId: id, status: s })
        },
        task.taskId.toString()
      )) })
    ] })
  ] }) });
}
function TasksPage() {
  const { session } = useAuth();
  const role = session == null ? void 0 : session.role;
  if (role === "admin") return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTasksPage, {});
  if (role === "sales") return /* @__PURE__ */ jsxRuntimeExports.jsx(SalesTasksPage, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TelecallerTasksPage, {});
}
export {
  TasksPage as default
};
