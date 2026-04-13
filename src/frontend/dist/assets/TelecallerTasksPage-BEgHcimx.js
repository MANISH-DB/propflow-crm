import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
import { a as useAuth, r as reactExports, j as jsxRuntimeExports } from "./index-BYjlLTrJ.js";
import { a as Layout } from "./Layout-D8UrcW-o.js";
import { u as useTasksByAssignee, d as useUpdateTaskStatus, C as CircleX } from "./useTasks-DgilsZ2-.js";
import { C as ClipboardList } from "./refresh-cw-C5sG_0Bc.js";
import { C as ChevronDown } from "./chevron-down-DWmfF_uF.js";
import { C as CircleCheck } from "./circle-check-DyAcnbJK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "10", x2: "10", y1: "15", y2: "9", key: "c1nkhi" }],
  ["line", { x1: "14", x2: "14", y1: "15", y2: "9", key: "h65svq" }]
];
const CirclePause = createLucideIcon("circle-pause", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
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
      "data-ocid": `my-task-stat-${label.toLowerCase().replace(/\s+/g, "-")}`,
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
  const isOverdue = task.dueDate && task.status !== "Completed" && task.status !== "Closed";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-xl p-4 shadow-xs hover:shadow-sm transition-smooth ${style.ring}`,
      "data-ocid": "my-task-card",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CalendarClock,
              {
                size: 12,
                className: isOverdue ? "text-destructive" : ""
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isOverdue ? "text-destructive font-medium" : "", children: task.dueDate || "No due date" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: task.status,
                onChange: (e) => onStatusChange(task.taskId, e.target.value),
                className: "text-xs font-body px-2 py-1 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                "data-ocid": "my-task-status-select",
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
function TelecallerTasksPage() {
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
              "data-ocid": "my-task-row",
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
                    "data-ocid": "my-task-status-select",
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
export {
  CirclePause as C,
  Hash as H,
  LoaderCircle as L,
  Pencil as P,
  TelecallerTasksPage as T,
  Clock as a,
  CalendarClock as b
};
