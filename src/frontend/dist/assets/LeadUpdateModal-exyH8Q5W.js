import { a as useAuth, r as reactExports, j as jsxRuntimeExports, L as LEAD_STATUSES, g as REQUIREMENT_OPTIONS, B as BUDGET_OPTIONS } from "./index-BYjlLTrJ.js";
import { c as useAddCallHistory } from "./useCallHistory-CuOV2oBp.js";
import { a as useUpdateLead } from "./useLeads-CFN0KzzB.js";
import { a as useAllProjects, b as useUniqueSalesPersons, c as useBrochureLink } from "./useProjects-DYXnZIVc.js";
import { X, t as toInputDateFromStr, f as fromInputDate, a as todayStr } from "./dateUtils-CEWG1Xtm.js";
import { D as DateDisplay } from "./CallHistoryModal-BWtd_pjc.js";
import { c as createLucideIcon } from "./useBackendActor-CDUnFUXW.js";
import { M as MessageCircle } from "./message-circle-CHSCirWY.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function buildStatusDateMap(statusDates) {
  const map = {};
  for (const [key, val] of statusDates) {
    map[key] = val;
  }
  return map;
}
function mapToStatusDates(map) {
  return Object.entries(map).filter(([, v]) => !!v);
}
function WhatsAppBrochureButton({
  lead,
  projectName
}) {
  const { data: brochureLink } = useBrochureLink(
    projectName || lead.projectName
  );
  const mobile = lead.mobileNo.replace(/\D/g, "");
  const disabled = !brochureLink;
  function handleClick() {
    if (!brochureLink) return;
    const text = encodeURIComponent(
      `Hi ${lead.firstName}, Thank you for your interest in ${projectName || lead.projectName}. Please find our brochure here: ${brochureLink}`
    );
    window.open(`https://wa.me/${mobile}?text=${text}`, "_blank");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      disabled,
      title: disabled ? "No brochure available for this project" : "Send brochure via WhatsApp",
      "data-ocid": "btn-whatsapp-brochure",
      className: [
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth border",
        disabled ? "opacity-50 cursor-not-allowed bg-muted border-border text-muted-foreground" : "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 13 }),
        "WhatsApp Brochure"
      ]
    }
  );
}
function LeadUpdateModal({ lead, onClose }) {
  const { session } = useAuth();
  const updateLead = useUpdateLead();
  const addCallHistory = useAddCallHistory();
  const { data: projects = [] } = useAllProjects();
  const { data: salesPersons = [] } = useUniqueSalesPersons();
  const [firstName, setFirstName] = reactExports.useState(lead.firstName);
  const [projectName, setProjectName] = reactExports.useState(lead.projectName);
  const [statusDates, setStatusDates] = reactExports.useState(
    buildStatusDateMap(lead.statusDates)
  );
  const [requirement, setRequirement] = reactExports.useState(lead.requirement);
  const [budget, setBudget] = reactExports.useState(lead.budget);
  const [assignedSales, setAssignedSales] = reactExports.useState(lead.assignedSales);
  const [remarks1, setRemarks1] = reactExports.useState(lead.remarks1);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  function handleStatusDateChange(status, inputVal) {
    const dateStr = inputVal ? fromInputDate(inputVal) : "";
    setStatusDates((prev) => ({ ...prev, [status]: dateStr }));
  }
  function getLatestStatusAndDate(dates) {
    const ORDER = [
      "Lost",
      "Qualified1",
      "SV Done",
      "SV Plan",
      "Follow-up",
      "Share Brochure",
      "Not Connect",
      "New"
    ];
    let latestDate = "";
    let latestStatus = lead.latestStatus;
    for (const [status, date] of Object.entries(dates)) {
      if (date && date > latestDate) {
        latestDate = date;
        latestStatus = status;
      }
    }
    if (!latestDate) {
      for (const s of ORDER) {
        if (dates[s]) {
          latestStatus = s;
          latestDate = dates[s];
          break;
        }
      }
    }
    return {
      status: latestStatus || lead.latestStatus,
      date: latestDate || lead.latestStatusDate
    };
  }
  async function handleSave() {
    setIsSaving(true);
    try {
      const { status: newLatestStatus, date: newLatestDate } = getLatestStatusAndDate(statusDates);
      const oldRemarks1 = lead.remarks1;
      const newRemarks2 = remarks1 !== oldRemarks1 ? oldRemarks1 : lead.remarks2;
      const updated = {
        ...lead,
        firstName,
        projectName,
        statusDates: mapToStatusDates(statusDates),
        requirement,
        budget,
        assignedSales,
        remarks1,
        remarks2: newRemarks2,
        latestStatus: newLatestStatus,
        latestStatusDate: newLatestDate,
        statusDate: newLatestDate
      };
      await updateLead.mutateAsync(updated);
      if (session == null ? void 0 : session.username) {
        await addCallHistory.mutateAsync({
          date: todayStr(),
          name: `${firstName} ${lead.lastName}`.trim(),
          mobile: lead.mobileNo,
          status: newLatestStatus,
          remark: remarks1,
          telecaller: session.username,
          projectName
        });
      }
      onClose();
    } catch {
    } finally {
      setIsSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      "aria-label": `Update lead: ${lead.firstName} ${lead.lastName}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default w-full",
            onClick: onClose,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-2xl bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl max-h-[95vh] flex flex-col overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-b border-border bg-primary/5 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-base", children: [
                "Update Lead — Sr. ",
                lead.srNo.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: [
                lead.firstName,
                " ",
                lead.lastName,
                " · ",
                lead.mobileNo
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-3 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppBrochureButton, { lead, projectName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "lum-first-name",
                    className: "block text-xs font-body font-medium text-foreground mb-1",
                    children: "First Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lum-first-name",
                    type: "text",
                    value: firstName,
                    onChange: (e) => setFirstName(e.target.value),
                    className: "w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "input-first-name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-medium text-muted-foreground mb-1", children: "Mobile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 rounded-md border border-border bg-muted/30 text-sm font-mono text-muted-foreground", children: lead.mobileNo })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lum-project",
                  className: "block text-xs font-body font-medium text-foreground mb-1",
                  children: "Project Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "lum-project",
                  value: projectName,
                  onChange: (e) => setProjectName(e.target.value),
                  className: "w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "select-project-name",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select project…" }),
                    projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.projectName, children: p.projectName }, p.projectName))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-semibold text-foreground uppercase tracking-wide", children: "Lead Status Dates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: LEAD_STATUSES.filter((s) => s !== "New").map((status) => {
                const inputId = `lum-status-${status.toLowerCase().replace(/\s+/g, "-")}`;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 p-2 rounded-md border border-border bg-background",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: inputId,
                          className: "text-xs font-body text-foreground min-w-[90px] cursor-pointer",
                          children: status
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: inputId,
                          type: "date",
                          value: toInputDateFromStr(statusDates[status] ?? ""),
                          onChange: (e) => handleStatusDateChange(status, e.target.value),
                          className: "flex-1 px-2 py-0.5 rounded border border-input bg-muted/30 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                          "data-ocid": `input-status-date-${status.toLowerCase().replace(/\s+/g, "-")}`
                        }
                      ),
                      statusDates[status] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DateDisplay,
                        {
                          value: statusDates[status],
                          className: "text-[10px]"
                        }
                      )
                    ]
                  },
                  status
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "lum-requirement",
                    className: "block text-xs font-body font-medium text-foreground mb-1",
                    children: "Requirement"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "lum-requirement",
                    value: requirement,
                    onChange: (e) => setRequirement(e.target.value),
                    className: "w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "select-requirement",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
                      REQUIREMENT_OPTIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "lum-budget",
                    className: "block text-xs font-body font-medium text-foreground mb-1",
                    children: "Budget"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "lum-budget",
                    value: budget,
                    onChange: (e) => setBudget(e.target.value),
                    className: "w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "select-budget",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
                      BUDGET_OPTIONS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "lum-assigned-sales",
                    className: "block text-xs font-body font-medium text-foreground mb-1",
                    children: "Assigned Sales"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lum-assigned-sales",
                    type: "text",
                    value: assignedSales,
                    onChange: (e) => setAssignedSales(e.target.value),
                    list: "sales-persons-list",
                    placeholder: "Type or select…",
                    className: "w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "input-assigned-sales"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "sales-persons-list", children: salesPersons.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s }, s)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "lum-remarks1",
                    className: "block text-xs font-body font-medium text-foreground mb-1",
                    children: "Remarks 1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "lum-remarks1",
                    value: remarks1,
                    onChange: (e) => setRemarks1(e.target.value),
                    rows: 3,
                    placeholder: "Add your remark…",
                    className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "textarea-remarks1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body font-medium text-muted-foreground mb-1", children: "Previous Remark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 rounded-md border border-border bg-muted/30 text-sm font-body text-muted-foreground min-h-[76px] whitespace-pre-wrap break-words", children: lead.remarks2 || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground/60", children: "No previous remark" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center justify-end gap-3 px-5 py-3 border-t border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "px-4 py-2 rounded-md border border-border text-sm font-body text-muted-foreground hover:bg-muted transition-smooth",
                "data-ocid": "btn-cancel-update",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleSave,
                disabled: isSaving,
                className: "flex items-center gap-2 px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 disabled:opacity-60 transition-smooth",
                "data-ocid": "btn-save-lead",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                  isSaving ? "Saving…" : "Save Changes"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  LeadUpdateModal as L
};
