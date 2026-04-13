import { a as useAuth, b as useQueryClient, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as SV_STATUSES, L as LEAD_STATUSES } from "./index-BYjlLTrJ.js";
import { u as ue } from "./index-B85V4J_O.js";
import { C as CallHistoryModal, H as History } from "./CallHistoryModal-BWtd_pjc.js";
import { a as Layout } from "./Layout-D8UrcW-o.js";
import { L as LeadUpdateModal } from "./LeadUpdateModal-exyH8Q5W.js";
import { S as StatusBadge } from "./StatusBadge-h7_1FjPG.js";
import { u as useCallHistory } from "./useCallHistory-CuOV2oBp.js";
import { u as useAllLeads, b as useAddLead } from "./useLeads-CFN0KzzB.js";
import { a as useAllProjects } from "./useProjects-DYXnZIVc.js";
import { b as ageBucket, l as leadAgeDays, p as parseDate, X, P as Phone, c as formatDateForDisplay } from "./dateUtils-CEWG1Xtm.js";
import { F as Funnel } from "./funnel-X3E9s2sP.js";
import { C as CalendarDays } from "./calendar-days-D_BuczMS.js";
import { c as createLucideIcon, B as Building2 } from "./useBackendActor-CDUnFUXW.js";
import { S as Search } from "./search-DAVmEOeC.js";
import { U as Users } from "./users-8IJymAeF.js";
import { D as Download } from "./download-B4J0vQcp.js";
import { R as RefreshCw } from "./refresh-cw-C5sG_0Bc.js";
import { A as ArrowUpDown } from "./arrow-up-down-lmAc0bCI.js";
import "./smartphone-CJQPGBQn.js";
import "./chart-column-DnJLxgFx.js";
import "./message-circle-CHSCirWY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const AGE_BUCKETS = [
  "0–9 Days",
  "10–19 Days",
  "20–29 Days",
  "30–59 Days",
  "60–90 Days",
  "90+ Days"
];
function getLatestStatus(lead) {
  return lead.latestStatus || lead.svStatus || "";
}
function getStatusDateStr(lead) {
  return lead.latestStatusDate || lead.statusDate || "";
}
function getSortKey(lead) {
  const dateStr = getStatusDateStr(lead);
  if (!dateStr) return 0;
  return parseDate(dateStr).getTime();
}
function computeStatusCounts(leads) {
  const counts = {
    Total: leads.length,
    New: 0,
    "Not Connect": 0,
    Qualified: 0,
    "Share Brochure": 0,
    "Follow-up": 0,
    "SV Plan": 0,
    "SV Done": 0,
    Qualified1: 0,
    Lost: 0
  };
  for (const l of leads) {
    const s = getLatestStatus(l);
    if (s === "New" || !s) counts.New++;
    else if (s === "Not Connect") counts["Not Connect"]++;
    else if (s === "Share Brochure") counts["Share Brochure"]++;
    else if (s === "Follow-up") counts["Follow-up"]++;
    else if (s === "SV Plan") counts["SV Plan"]++;
    else if (s === "SV Done") counts["SV Done"]++;
    else if (s === "Qualified1") counts.Qualified1++;
    else if (s === "Lost") counts.Lost++;
  }
  counts.Qualified = counts["Share Brochure"] + counts["Follow-up"] + counts["SV Plan"];
  return counts;
}
function computeSVCounts(leads) {
  const counts = {};
  for (const sv of SV_STATUSES) counts[sv] = 0;
  for (const l of leads) {
    if (l.svStatus && counts[l.svStatus] !== void 0) counts[l.svStatus]++;
  }
  return counts;
}
function buildLastCallMap(history) {
  const map = {};
  for (const h of history) {
    if (!h.mobile || !h.date) continue;
    if (!map[h.mobile] || h.date > map[h.mobile]) {
      map[h.mobile] = h.date;
    }
  }
  return map;
}
function daysAgo(dateStr) {
  const d = parseDate(dateStr);
  if (Number.isNaN(d.getTime())) return -1;
  return Math.floor((Date.now() - d.getTime()) / (1e3 * 60 * 60 * 24));
}
const STATUS_BOX_CONFIG = [
  {
    key: "Total",
    label: "Total",
    cls: "border-primary/30 bg-primary/5 text-primary"
  },
  { key: "New", label: "New", cls: "border-blue-300 bg-blue-50 text-blue-700" },
  {
    key: "Not Connect",
    label: "Not Connect",
    cls: "border-red-300 bg-red-50 text-red-700"
  },
  {
    key: "Qualified",
    label: "Qualified",
    cls: "border-amber-300 bg-amber-50 text-amber-700"
  },
  {
    key: "Share Brochure",
    label: "Brochure",
    cls: "border-accent/40 bg-accent/10 text-accent-foreground"
  },
  {
    key: "Follow-up",
    label: "Follow-up",
    cls: "border-sky-300 bg-sky-50 text-sky-700"
  },
  {
    key: "SV Plan",
    label: "SV Plan",
    cls: "border-purple-300 bg-purple-50 text-purple-700"
  },
  {
    key: "SV Done",
    label: "SV Done",
    cls: "border-emerald-300 bg-emerald-50 text-emerald-700"
  },
  {
    key: "Qualified1",
    label: "Qualified1",
    cls: "border-teal-300 bg-teal-50 text-teal-700"
  },
  {
    key: "Lost",
    label: "Lost",
    cls: "border-muted-foreground/30 bg-muted text-muted-foreground"
  }
];
const SV_BOX_CONFIG = [
  {
    key: "Next Followup",
    cls: "border-accent/40 bg-accent/10 text-accent-foreground"
  },
  { key: "SV Rescheduled", cls: "border-amber-300 bg-amber-50 text-amber-700" },
  {
    key: "Booking Done",
    cls: "border-emerald-300 bg-emerald-50 text-emerald-700"
  },
  {
    key: "Registration Done",
    cls: "border-green-300 bg-green-50 text-green-700"
  },
  {
    key: "Lead Close",
    cls: "border-muted-foreground/30 bg-muted text-muted-foreground"
  }
];
function exportToCSV(leads, filename = "PropFlow_Leads") {
  const headers = [
    "Sr.No",
    "Lead Date",
    "First Name",
    "Last Name",
    "Mobile No",
    "Project Name",
    "Source",
    "Telecaller",
    "Latest Status",
    "Status Date",
    "SV Status",
    "SV Remark",
    "SV Next Followup",
    "Assigned Sales",
    "Requirement",
    "Budget",
    "Remarks1",
    "Remarks2",
    "Loss Reason"
  ];
  const rows = leads.map((l) => [
    Number(l.srNo),
    l.leadDate,
    l.firstName,
    l.lastName,
    l.mobileNo,
    l.projectName,
    l.source,
    l.telecaller,
    getLatestStatus(l),
    getStatusDateStr(l),
    l.svStatus,
    l.svRemark,
    l.svNextFollowup,
    l.assignedSales,
    l.requirement,
    l.budget,
    l.remarks1,
    l.remarks2,
    l.lossReason
  ]);
  const csv = [headers, ...rows].map(
    (row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function StatBox({
  label,
  value,
  cls,
  active,
  onClick,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: `flex flex-col items-center justify-center rounded-lg border-2 px-3 py-2.5 cursor-pointer select-none transition-all duration-150 min-w-[72px]
        ${cls} ${active ? "ring-2 ring-offset-1 ring-current scale-105 shadow-md" : "hover:scale-102 hover:shadow-sm"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl leading-none", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] mt-0.5 whitespace-nowrap", children: label })
      ]
    }
  );
}
function AgeBox({
  bucket,
  count,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `age-box-${bucket.replace(/\s+/g, "-").toLowerCase()}`,
      className: `flex flex-col items-center px-2.5 py-1.5 rounded-md border cursor-pointer transition-all
        ${active ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-primary/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base leading-none", children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] mt-0.5 whitespace-nowrap", children: bucket })
      ]
    }
  );
}
function DownloadModal({
  leads,
  projects,
  telecallers,
  salesPersons,
  onClose
}) {
  const [selProjects, setSelProjects] = reactExports.useState([]);
  const [selTelecallers, setSelTelecallers] = reactExports.useState([]);
  const [selSales, setSelSales] = reactExports.useState([]);
  const [selStatuses, setSelStatuses] = reactExports.useState([]);
  function toggle(arr, setArr, val) {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  }
  function handleExport() {
    let filtered = [...leads];
    if (selProjects.length)
      filtered = filtered.filter((l) => selProjects.includes(l.projectName));
    if (selTelecallers.length)
      filtered = filtered.filter((l) => selTelecallers.includes(l.telecaller));
    if (selSales.length)
      filtered = filtered.filter((l) => selSales.includes(l.assignedSales));
    if (selStatuses.length)
      filtered = filtered.filter(
        (l) => selStatuses.includes(getLatestStatus(l))
      );
    exportToCSV(filtered);
    onClose();
  }
  const CheckRow = ({
    label,
    checked,
    onToggle
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded text-sm font-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        checked,
        onChange: onToggle,
        className: "accent-primary w-3.5 h-3.5"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
  ] });
  const Section = ({
    title,
    items,
    sel,
    setSel
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSel(sel.length === items.length ? [] : [...items]),
          className: "text-[10px] text-primary hover:underline",
          children: sel.length === items.length ? "None" : "All"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-28 overflow-y-auto border border-border rounded-md bg-background p-1 space-y-0.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckRow,
      {
        label: item,
        checked: sel.includes(item),
        onToggle: () => toggle(sel, setSel, item)
      },
      item
    )) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30",
      role: "presentation",
      onClick: onClose,
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "dialog",
        {
          open: true,
          className: "bg-card border border-border rounded-xl shadow-xl w-full max-w-lg mx-4 p-5 relative",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: "Export Leads to Excel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1 hover:bg-muted rounded",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Section,
                {
                  title: "Projects",
                  items: projects,
                  sel: selProjects,
                  setSel: setSelProjects
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Section,
                {
                  title: "Telecallers",
                  items: telecallers,
                  sel: selTelecallers,
                  setSel: setSelTelecallers
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Section,
                {
                  title: "Sales Persons",
                  items: salesPersons,
                  sel: selSales,
                  setSel: setSelSales
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Section,
                {
                  title: "Lead Status",
                  items: [...LEAD_STATUSES],
                  sel: selStatuses,
                  setSel: setSelStatuses
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-body", children: [
                leads.filter((l) => {
                  if (selProjects.length && !selProjects.includes(l.projectName))
                    return false;
                  if (selTelecallers.length && !selTelecallers.includes(l.telecaller))
                    return false;
                  if (selSales.length && !selSales.includes(l.assignedSales))
                    return false;
                  if (selStatuses.length && !selStatuses.includes(getLatestStatus(l)))
                    return false;
                  return true;
                }).length,
                " ",
                "leads selected"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "px-3 py-1.5 rounded-md border border-border text-sm font-body hover:bg-muted transition-smooth",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleExport,
                    className: "px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 flex items-center gap-1.5 transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
                      "Export"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const TEMPLATE_HEADERS = "Name,Mobile,Project,Requirement,Budget,Remarks,Status";
const TEMPLATE_ROWS = [
  "Rahul Sharma,9876543210,Green Valley,2 BHK,40.1-50 Lacs,Interested in ground floor,New",
  "Priya Patel,9123456780,Blue Heights,3 BHK,60.1-70 Lacs,Needs loan assistance,Follow-up",
  "Amit Kumar,9988776655,Sunrise Enclave,1 BHK,30 Lacs,First time buyer,Share Brochure"
];
function downloadTemplate() {
  const csv = [TEMPLATE_HEADERS, ...TEMPLATE_ROWS].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "PropFlow_Lead_Template.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function parseCSVLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  result.push(cur.trim());
  return result;
}
function LeadUploadModal({ onClose }) {
  const fileRef = reactExports.useRef(null);
  const addLead = useAddLead();
  const [preview, setPreview] = reactExports.useState([]);
  const [fileName, setFileName] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const text = ((_a2 = ev.target) == null ? void 0 : _a2.result) || "";
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      const rows = lines.map(parseCSVLine);
      setPreview(rows.slice(0, 6));
    };
    reader.readAsText(file);
  }
  async function handleUpload() {
    var _a, _b;
    const file = (_b = (_a = fileRef.current) == null ? void 0 : _a.files) == null ? void 0 : _b[0];
    if (!file) {
      ue.error("Please select a CSV file");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      var _a2;
      const text = ((_a2 = ev.target) == null ? void 0 : _a2.result) || "";
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        ue.error("CSV has no data rows");
        return;
      }
      const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());
      const dataRows = lines.slice(1);
      setUploading(true);
      setProgress(0);
      let success = 0;
      let failed = 0;
      for (let i = 0; i < dataRows.length; i++) {
        const cols = parseCSVLine(dataRows[i]);
        const get = (keys) => {
          for (const k of keys) {
            const idx = headers.indexOf(k);
            if (idx >= 0) return cols[idx] ?? "";
          }
          return "";
        };
        const firstName = get(["name", "first name", "firstname"]).split(" ")[0] || "";
        const lastName = get(["name", "first name", "firstname"]).split(" ").slice(1).join(" ") || "";
        const lead = {
          id: 0,
          srNo: 0,
          leadDate: "",
          firstName,
          lastName,
          mobileNo: get(["mobile", "mobile no", "phone"]),
          projectName: get(["project", "project name"]),
          source: "Upload",
          telecaller: "",
          latestStatus: get(["status", "latest status"]) || "New",
          latestStatusDate: "",
          statusDate: "",
          requirement: get(["requirement"]),
          budget: get(["budget"]),
          remarks1: get(["remarks", "remarks1"]),
          remarks2: "",
          assignedSales: "",
          svStatus: "",
          svRemark: "",
          svNextFollowup: "",
          lossReason: "",
          leadCloseStatus: "Open",
          statusDates: []
        };
        try {
          await addLead.mutateAsync(lead);
          success++;
        } catch {
          failed++;
        }
        setProgress(Math.round((i + 1) / dataRows.length * 100));
      }
      setUploading(false);
      if (failed === 0) {
        ue.success(`${success} leads uploaded successfully`);
        onClose();
      } else {
        ue.warning(`${success} uploaded, ${failed} failed`);
      }
    };
    reader.readAsText(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4",
      role: "presentation",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: "Upload Leads" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: "Import leads from CSV file" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body font-medium text-foreground", children: "Download Template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: "Columns: Name, Mobile, Project, Requirement, Budget, Remarks, Status" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: downloadTemplate,
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-body hover:bg-primary/20 transition-smooth",
                "data-ocid": "btn-download-template",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                  "Template"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/3 transition-smooth w-full",
              onClick: () => {
                var _a;
                return (_a = fileRef.current) == null ? void 0 : _a.click();
              },
              "data-ocid": "lead-upload-drop-zone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Upload,
                  {
                    size: 24,
                    className: "text-muted-foreground/50 mx-auto mb-2"
                  }
                ),
                fileName ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground font-medium", children: fileName }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground", children: "Click to select CSV file" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Supports .csv format" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileRef,
                    type: "file",
                    accept: ".csv,text/csv",
                    onChange: handleFile,
                    className: "hidden",
                    "data-ocid": "input-lead-upload-file"
                  }
                )
              ]
            }
          ),
          preview.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border max-h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-[11px] font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: preview[0].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-2 py-1.5 text-left font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: preview.slice(1).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "tr",
              {
                className: "border-t border-border hover:bg-muted/30",
                children: row.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-2 py-1 text-foreground whitespace-nowrap max-w-[120px] truncate",
                    children: cell || "—"
                  },
                  `${row.join("|")}-${cell}`
                ))
              },
              row.join("|")
            )) })
          ] }) }),
          uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-body text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full transition-all duration-200",
                style: { width: `${progress}%` }
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 px-5 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              disabled: uploading,
              className: "flex-1 px-4 py-2 rounded-lg border border-border text-sm font-body text-foreground hover:bg-muted transition-smooth disabled:opacity-50",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleUpload,
              disabled: uploading || !fileName,
              className: "flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-smooth disabled:opacity-50 flex items-center justify-center gap-1.5",
              "data-ocid": "btn-upload-submit",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                uploading ? "Uploading…" : "Upload Leads"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function LeadRow({
  lead,
  viewMode,
  onUpdate,
  onCallHistory,
  lastCallDate
}) {
  const age = leadAgeDays(lead.leadDate);
  const status = getLatestStatus(lead);
  const statusDate = getStatusDateStr(lead);
  const days = lastCallDate ? daysAgo(lastCallDate) : -1;
  if (viewMode === "mobile") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg p-3 space-y-2",
        "data-ocid": `lead-row-${lead.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
                "#",
                Number(lead.srNo)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body font-semibold text-foreground text-sm truncate", children: [
                lead.firstName,
                " ",
                lead.lastName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${lead.mobileNo}`,
                  className: "text-xs text-primary font-body flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
                    lead.mobileNo
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, size: "sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 text-xs text-muted-foreground font-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted px-1.5 py-0.5 rounded", children: lead.projectName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted px-1.5 py-0.5 rounded", children: lead.telecaller }),
            lead.assignedSales && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent/10 text-accent-foreground px-1.5 py-0.5 rounded", children: lead.assignedSales }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-muted px-1.5 py-0.5 rounded", children: [
              age,
              "d"
            ] }),
            lastCallDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-muted px-1.5 py-0.5 rounded", children: [
              "Last: ",
              lastCallDate,
              days >= 0 && ` (${days === 0 ? "Today" : `${days}d ago`})`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: formatDateForDisplay(statusDate) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onCallHistory(lead),
                  className: "inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth",
                  "data-ocid": "btn-call-history-admin",
                  title: "Call History",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 12 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onUpdate(lead),
                  className: "text-xs text-primary font-body hover:underline px-1",
                  "data-ocid": "btn-update-lead",
                  children: "Update"
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "hover:bg-muted/40 transition-colors group",
      "data-ocid": `lead-row-${lead.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs text-muted-foreground font-body whitespace-nowrap", children: Number(lead.srNo) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-body text-sm font-medium text-foreground truncate max-w-[120px]", children: [
          lead.firstName,
          " ",
          lead.lastName
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${lead.mobileNo}`,
            className: "font-body text-xs text-primary hover:underline flex items-center gap-1 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
              lead.mobileNo
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs font-body text-foreground whitespace-nowrap max-w-[100px] truncate", children: lead.projectName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs font-body text-muted-foreground whitespace-nowrap", children: lead.telecaller }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, size: "sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: lastCallDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: lastCallDate }),
          days >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: days === 0 ? "Today" : `${days}d ago` })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 text-xs", children: "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs font-body text-muted-foreground whitespace-nowrap", children: formatDateForDisplay(statusDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-xs font-body text-muted-foreground text-right whitespace-nowrap", children: [
          age,
          "d"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs font-body text-muted-foreground max-w-[120px] truncate", children: lead.remarks1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs font-body text-muted-foreground whitespace-nowrap", children: lead.assignedSales || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onCallHistory(lead),
              title: "Call History",
              className: "inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth",
              "data-ocid": "btn-call-history-admin",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 12 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onUpdate(lead),
              className: "text-xs text-primary font-body hover:underline whitespace-nowrap px-1",
              "data-ocid": "btn-update-lead",
              children: "Update"
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminDashboard() {
  const { session } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const viewMode = (session == null ? void 0 : session.viewMode) ?? "desktop";
  const { data: allLeads = [], isLoading } = useAllLeads();
  const { data: projectNames = [] } = useAllProjects();
  const { data: allCallHistory = [] } = useCallHistory(null);
  const lastCallMap = reactExports.useMemo(
    () => buildLastCallMap(allCallHistory),
    [allCallHistory]
  );
  const [selectedLead, setSelectedLead] = reactExports.useState(null);
  const [callHistoryLead, setCallHistoryLead] = reactExports.useState(null);
  const [showDownload, setShowDownload] = reactExports.useState(false);
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const uniqueProjects = reactExports.useMemo(
    () => Array.isArray(projectNames) ? projectNames : [],
    [projectNames]
  );
  const allProjectNames = reactExports.useMemo(
    () => Array.from(new Set(allLeads.map((l) => l.projectName).filter(Boolean))),
    [allLeads]
  );
  const mergedProjects = reactExports.useMemo(
    () => Array.from(
      /* @__PURE__ */ new Set([
        ...allProjectNames,
        ...Array.isArray(uniqueProjects) ? uniqueProjects.map(
          (p) => typeof p === "string" ? p : p.projectName ?? ""
        ) : []
      ])
    ).filter(Boolean),
    [allProjectNames, uniqueProjects]
  );
  const [projectFilter, setProjectFilter] = reactExports.useState("All");
  const [telecallerFilter, setTelecallerFilter] = reactExports.useState("All");
  const [salesFilter, setSalesFilter] = reactExports.useState("All");
  const [statusFilter, setStatusFilter] = reactExports.useState(null);
  const [ageBucketFilter, setAgeBucketFilter] = reactExports.useState(
    null
  );
  const [search, setSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [sortField, setSortField] = reactExports.useState("statusDate");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const filtered = reactExports.useMemo(() => {
    let result = [...allLeads];
    if (projectFilter !== "All")
      result = result.filter((l) => l.projectName === projectFilter);
    if (telecallerFilter !== "All")
      result = result.filter((l) => l.telecaller === telecallerFilter);
    if (salesFilter !== "All")
      result = result.filter((l) => l.assignedSales === salesFilter);
    if (statusFilter) {
      if (statusFilter === "Qualified") {
        result = result.filter(
          (l) => ["Share Brochure", "Follow-up", "SV Plan"].includes(
            getLatestStatus(l)
          )
        );
      } else if (statusFilter === "New") {
        result = result.filter(
          (l) => !getLatestStatus(l) || getLatestStatus(l) === "New"
        );
      } else {
        result = result.filter((l) => getLatestStatus(l) === statusFilter);
      }
    }
    if (ageBucketFilter) {
      result = result.filter((l) => {
        const s = getLatestStatus(l);
        if (s === "Lost" || s === "Qualified1") return false;
        return ageBucket(leadAgeDays(l.leadDate)) === ageBucketFilter;
      });
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (l) => {
          var _a;
          return `${l.firstName} ${l.lastName}`.toLowerCase().includes(q) || l.mobileNo.includes(q) || ((_a = l.remarks1) == null ? void 0 : _a.toLowerCase().includes(q));
        }
      );
    }
    if (dateFrom) {
      const fromDate = parseDate(dateFrom);
      if (!Number.isNaN(fromDate.getTime())) {
        result = result.filter((l) => {
          const d = getStatusDateStr(l);
          if (!d) return false;
          return parseDate(d).getTime() >= fromDate.getTime();
        });
      }
    }
    if (dateTo) {
      const toDate = parseDate(dateTo);
      if (!Number.isNaN(toDate.getTime())) {
        result = result.filter((l) => {
          const d = getStatusDateStr(l);
          if (!d) return true;
          return parseDate(d).getTime() <= toDate.getTime();
        });
      }
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "srNo") cmp = Number(a.srNo) - Number(b.srNo);
      else if (sortField === "name")
        cmp = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      else if (sortField === "statusDate") cmp = getSortKey(a) - getSortKey(b);
      else if (sortField === "age")
        cmp = leadAgeDays(a.leadDate) - leadAgeDays(b.leadDate);
      else if (sortField === "svStatus")
        cmp = (a.svStatus || "").localeCompare(b.svStatus || "");
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [
    allLeads,
    projectFilter,
    telecallerFilter,
    salesFilter,
    statusFilter,
    ageBucketFilter,
    search,
    dateFrom,
    dateTo,
    sortField,
    sortDir
  ]);
  const statusCounts = reactExports.useMemo(() => computeStatusCounts(filtered), [filtered]);
  const svCounts = reactExports.useMemo(() => computeSVCounts(allLeads), [allLeads]);
  const ageCounts = reactExports.useMemo(() => {
    const counts = {};
    for (const b of AGE_BUCKETS) counts[b] = 0;
    for (const l of filtered) {
      const s = getLatestStatus(l);
      if (s === "Lost" || s === "Qualified1") continue;
      const b = ageBucket(leadAgeDays(l.leadDate));
      counts[b]++;
    }
    return counts;
  }, [filtered]);
  function toggleSort(field) {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("desc");
    }
  }
  const handleStatusBoxClick = reactExports.useCallback((key) => {
    setStatusFilter((prev) => prev === key ? null : key);
    setAgeBucketFilter(null);
  }, []);
  const handleAgeBoxClick = reactExports.useCallback((bucket) => {
    setAgeBucketFilter((prev) => prev === bucket ? null : bucket);
    setStatusFilter(null);
  }, []);
  function handleSVBoxClick(svStatus) {
    navigate({ to: "/admin/sv-overview", search: { svStatus } });
  }
  function handleClearFilters() {
    setProjectFilter("All");
    setTelecallerFilter("All");
    setSalesFilter("All");
    setStatusFilter(null);
    setAgeBucketFilter(null);
    setSearch("");
    setDateFrom("");
    setDateTo("");
  }
  const hasActiveFilters = projectFilter !== "All" || telecallerFilter !== "All" || salesFilter !== "All" || !!statusFilter || !!ageBucketFilter || !!search || !!dateFrom || !!dateTo;
  const SortIcon = ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ArrowUpDown,
    {
      size: 11,
      className: `ml-0.5 inline ${sortField === field ? "text-primary" : "text-muted-foreground/40"}`
    }
  );
  const allTelecallersList = reactExports.useMemo(
    () => Array.from(new Set(allLeads.map((l) => l.telecaller).filter(Boolean))),
    [allLeads]
  );
  const allSalesPersonsList = reactExports.useMemo(
    () => Array.from(new Set(allLeads.map((l) => l.assignedSales).filter(Boolean))),
    [allLeads]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      title: "Admin Dashboard",
      headerRight: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowUpload(true),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-body hover:bg-emerald-700 transition-smooth",
            "data-ocid": "btn-upload-leads",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Upload Leads" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowDownload(true),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-body hover:bg-primary/90 transition-smooth",
            "data-ocid": "btn-download-leads",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Export" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => qc.invalidateQueries(),
            title: "Refresh data",
            className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth",
            "data-ocid": "btn-refresh",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 })
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-3 flex flex-wrap gap-2 items-center",
              "data-ocid": "filters-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 14, className: "text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: projectFilter,
                    onChange: (e) => setProjectFilter(e.target.value),
                    className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                    "data-ocid": "filter-project",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Projects" }),
                      mergedProjects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: telecallerFilter,
                    onChange: (e) => setTelecallerFilter(e.target.value),
                    className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                    "data-ocid": "filter-telecaller",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Telecallers" }),
                      allTelecallersList.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: salesFilter,
                    onChange: (e) => setSalesFilter(e.target.value),
                    className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                    "data-ocid": "filter-sales",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Sales" }),
                      allSalesPersonsList.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 13, className: "text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: dateFrom,
                      onChange: (e) => setDateFrom(e.target.value),
                      placeholder: "DD/MMM/YYYY",
                      className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring w-28",
                      "data-ocid": "filter-date-from"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "to" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: dateTo,
                      onChange: (e) => setDateTo(e.target.value),
                      placeholder: "DD/MMM/YYYY",
                      className: "h-8 px-2 rounded-md border border-input bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring w-28",
                      "data-ocid": "filter-date-to"
                    }
                  ),
                  hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleClearFilters,
                      className: "ml-1 flex items-center gap-1 px-2 py-1 text-xs font-body text-muted-foreground hover:text-destructive border border-border rounded-md hover:border-destructive/30 transition-smooth",
                      "data-ocid": "btn-clear-filters",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 }),
                        "Clear"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "status-boxes", children: STATUS_BOX_CONFIG.map(({ key, label, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBox,
            {
              label,
              value: statusCounts[key] ?? 0,
              cls,
              active: statusFilter === key,
              onClick: () => handleStatusBoxClick(key),
              "data-ocid": `status-box-${key.toLowerCase().replace(/\s+/g, "-")}`
            },
            key
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 13, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide", children: [
                "Lead Aging",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] normal-case font-normal", children: "(excl. Lost & Qualified1)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: AGE_BUCKETS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              AgeBox,
              {
                bucket: b,
                count: ageCounts[b] ?? 0,
                active: ageBucketFilter === b,
                onClick: () => handleAgeBoxClick(b)
              },
              b
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl px-4 py-3",
              "data-ocid": "sv-overview-section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "SV Status Overview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body ml-1", children: "(click to open full view)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SV_BOX_CONFIG.map(({ key, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSVBoxClick(key),
                    "data-ocid": `sv-box-${key.toLowerCase().replace(/\s+/g, "-")}`,
                    className: `flex flex-col items-center px-3 py-2 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-sm ${cls}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl leading-none", children: svCounts[key] ?? 0 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] mt-0.5 whitespace-nowrap", children: key })
                    ]
                  },
                  key
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center bg-card border border-border rounded-xl px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  size: 13,
                  className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "Search name, mobile, remark…",
                  className: "w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                  "data-ocid": "search-leads"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: filtered.length }),
                " ",
                "leads"
              ] })
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-10 bg-muted/60 rounded-lg animate-pulse"
            },
            k
          )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 text-center",
              "data-ocid": "leads-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 40, className: "text-muted-foreground/30 mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No leads found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: "Adjust your filters or search query" }),
                hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClearFilters,
                    className: "mt-3 text-sm text-primary hover:underline font-body",
                    children: "Clear all filters"
                  }
                )
              ]
            }
          ) : viewMode === "mobile" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            LeadRow,
            {
              lead,
              viewMode: "mobile",
              onUpdate: setSelectedLead,
              onCallHistory: setCallHistoryLead,
              lastCallDate: lastCallMap[lead.mobileNo] ?? ""
            },
            lead.id.toString()
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-left border-collapse",
              "data-ocid": "leads-table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: [
                  { label: "Sr", field: "srNo" },
                  { label: "Name", field: "name" },
                  { label: "Mobile", field: null },
                  { label: "Project", field: null },
                  { label: "Telecaller", field: null },
                  { label: "Status", field: null },
                  { label: "Last Call", field: null },
                  {
                    label: "Status Date",
                    field: "statusDate"
                  },
                  { label: "Age", field: "age" },
                  { label: "Remarks", field: null },
                  { label: "Sales", field: null },
                  { label: "Actions", field: null }
                ].map(({ label, field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "th",
                  {
                    className: `px-3 py-2.5 text-xs font-body font-semibold text-muted-foreground whitespace-nowrap uppercase tracking-wide ${field ? "cursor-pointer hover:text-foreground select-none" : ""}`,
                    onClick: field ? () => toggleSort(field) : void 0,
                    onKeyDown: field ? (e) => {
                      if (e.key === "Enter") toggleSort(field);
                    } : void 0,
                    children: [
                      label,
                      field && /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field })
                    ]
                  },
                  label
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LeadRow,
                  {
                    lead,
                    viewMode: "desktop",
                    onUpdate: setSelectedLead,
                    onCallHistory: setCallHistoryLead,
                    lastCallDate: lastCallMap[lead.mobileNo] ?? ""
                  },
                  lead.id.toString()
                )) })
              ]
            }
          ) }) })
        ] }),
        showDownload && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DownloadModal,
          {
            leads: allLeads,
            projects: mergedProjects,
            telecallers: allTelecallersList,
            salesPersons: allSalesPersonsList,
            onClose: () => setShowDownload(false)
          }
        ),
        showUpload && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadUploadModal, { onClose: () => setShowUpload(false) }),
        selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeadUpdateModal,
          {
            lead: selectedLead,
            onClose: () => setSelectedLead(null)
          }
        ),
        callHistoryLead && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CallHistoryModal,
          {
            mobileNo: callHistoryLead.mobileNo,
            leadName: `${callHistoryLead.firstName} ${callHistoryLead.lastName}`,
            onClose: () => setCallHistoryLead(null)
          }
        )
      ]
    }
  );
}
export {
  AdminDashboard as default
};
