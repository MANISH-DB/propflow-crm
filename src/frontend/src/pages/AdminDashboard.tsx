import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowUpDown,
  Building2,
  CalendarDays,
  Download,
  Filter,
  History,
  Phone,
  RefreshCw,
  Search,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { CallHistoryModal } from "../components/CallHistoryModal";
import { Layout } from "../components/Layout";
import { LeadUpdateModal } from "../components/LeadUpdateModal";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { useCallHistory } from "../hooks/useCallHistory";
import { useAddLead, useAllLeads } from "../hooks/useLeads";
import { useAllProjects } from "../hooks/useProjects";
import { LEAD_STATUSES, SV_STATUSES } from "../types";
import type { Lead } from "../types";
import {
  ageBucket,
  formatDateForDisplay,
  leadAgeDays,
  parseDate,
} from "../utils/dateUtils";

// ── helpers ──────────────────────────────────────────────────────────────────

const AGE_BUCKETS = [
  "0–9 Days",
  "10–19 Days",
  "20–29 Days",
  "30–59 Days",
  "60–90 Days",
  "90+ Days",
] as const;
type AgeBucket = (typeof AGE_BUCKETS)[number];

function getLatestStatus(lead: Lead): string {
  return lead.latestStatus || lead.svStatus || "";
}

function getStatusDateStr(lead: Lead): string {
  return lead.latestStatusDate || lead.statusDate || "";
}

function getSortKey(lead: Lead): number {
  const dateStr = getStatusDateStr(lead);
  if (!dateStr) return 0;
  return parseDate(dateStr).getTime();
}

function computeStatusCounts(leads: Lead[]) {
  const counts: Record<string, number> = {
    Total: leads.length,
    New: 0,
    "Not Connect": 0,
    Qualified: 0,
    "Share Brochure": 0,
    "Follow-up": 0,
    "SV Plan": 0,
    "SV Done": 0,
    Qualified1: 0,
    Lost: 0,
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
  counts.Qualified =
    counts["Share Brochure"] + counts["Follow-up"] + counts["SV Plan"];
  return counts;
}

function computeSVCounts(leads: Lead[]) {
  const counts: Record<string, number> = {};
  for (const sv of SV_STATUSES) counts[sv] = 0;
  for (const l of leads) {
    if (l.svStatus && counts[l.svStatus] !== undefined) counts[l.svStatus]++;
  }
  return counts;
}

/** Build mobile → most recent call date map */
function buildLastCallMap(
  history: { mobile: string; date: string }[],
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const h of history) {
    if (!h.mobile || !h.date) continue;
    if (!map[h.mobile] || h.date > map[h.mobile]) {
      map[h.mobile] = h.date;
    }
  }
  return map;
}

function daysAgo(dateStr: string): number {
  const d = parseDate(dateStr);
  if (Number.isNaN(d.getTime())) return -1;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

type SortField = "srNo" | "name" | "statusDate" | "age" | "svStatus";
type SortDir = "asc" | "desc";

const STATUS_BOX_CONFIG = [
  {
    key: "Total",
    label: "Total",
    cls: "border-primary/30 bg-primary/5 text-primary",
  },
  { key: "New", label: "New", cls: "border-blue-300 bg-blue-50 text-blue-700" },
  {
    key: "Not Connect",
    label: "Not Connect",
    cls: "border-red-300 bg-red-50 text-red-700",
  },
  {
    key: "Qualified",
    label: "Qualified",
    cls: "border-amber-300 bg-amber-50 text-amber-700",
  },
  {
    key: "Share Brochure",
    label: "Brochure",
    cls: "border-accent/40 bg-accent/10 text-accent-foreground",
  },
  {
    key: "Follow-up",
    label: "Follow-up",
    cls: "border-sky-300 bg-sky-50 text-sky-700",
  },
  {
    key: "SV Plan",
    label: "SV Plan",
    cls: "border-purple-300 bg-purple-50 text-purple-700",
  },
  {
    key: "SV Done",
    label: "SV Done",
    cls: "border-emerald-300 bg-emerald-50 text-emerald-700",
  },
  {
    key: "Qualified1",
    label: "Qualified1",
    cls: "border-teal-300 bg-teal-50 text-teal-700",
  },
  {
    key: "Lost",
    label: "Lost",
    cls: "border-muted-foreground/30 bg-muted text-muted-foreground",
  },
] as const;

const SV_BOX_CONFIG = [
  {
    key: "Next Followup",
    cls: "border-accent/40 bg-accent/10 text-accent-foreground",
  },
  { key: "SV Rescheduled", cls: "border-amber-300 bg-amber-50 text-amber-700" },
  {
    key: "Booking Done",
    cls: "border-emerald-300 bg-emerald-50 text-emerald-700",
  },
  {
    key: "Registration Done",
    cls: "border-green-300 bg-green-50 text-green-700",
  },
  {
    key: "Lead Close",
    cls: "border-muted-foreground/30 bg-muted text-muted-foreground",
  },
] as const;

// ── Export helpers ────────────────────────────────────────────────────────────

function exportToCSV(leads: Lead[], filename = "PropFlow_Leads") {
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
    "Loss Reason",
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
    l.lossReason,
  ]);
  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatBox({
  label,
  value,
  cls,
  active,
  onClick,
  "data-ocid": ocid,
}: {
  label: string;
  value: number;
  cls: string;
  active: boolean;
  onClick: () => void;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`flex flex-col items-center justify-center rounded-lg border-2 px-3 py-2.5 cursor-pointer select-none transition-all duration-150 min-w-[72px]
        ${cls} ${active ? "ring-2 ring-offset-1 ring-current scale-105 shadow-md" : "hover:scale-102 hover:shadow-sm"}`}
    >
      <span className="font-display font-bold text-xl leading-none">
        {value}
      </span>
      <span className="font-body text-[11px] mt-0.5 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

function AgeBox({
  bucket,
  count,
  active,
  onClick,
}: { bucket: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`age-box-${bucket.replace(/\s+/g, "-").toLowerCase()}`}
      className={`flex flex-col items-center px-2.5 py-1.5 rounded-md border cursor-pointer transition-all
        ${active ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-primary/5"}`}
    >
      <span className="font-display font-bold text-base leading-none">
        {count}
      </span>
      <span className="font-body text-[10px] mt-0.5 whitespace-nowrap">
        {bucket}
      </span>
    </button>
  );
}

// ── Download Modal ─────────────────────────────────────────────────────────────

function DownloadModal({
  leads,
  projects,
  telecallers,
  salesPersons,
  onClose,
}: {
  leads: Lead[];
  projects: string[];
  telecallers: string[];
  salesPersons: string[];
  onClose: () => void;
}) {
  const [selProjects, setSelProjects] = useState<string[]>([]);
  const [selTelecallers, setSelTelecallers] = useState<string[]>([]);
  const [selSales, setSelSales] = useState<string[]>([]);
  const [selStatuses, setSelStatuses] = useState<string[]>([]);

  function toggle<T>(arr: T[], setArr: (a: T[]) => void, val: T) {
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
      filtered = filtered.filter((l) =>
        selStatuses.includes(getLatestStatus(l)),
      );
    exportToCSV(filtered);
    onClose();
  }

  const CheckRow = ({
    label,
    checked,
    onToggle,
  }: { label: string; checked: boolean; onToggle: () => void }) => (
    <label className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded text-sm font-body">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="accent-primary w-3.5 h-3.5"
      />
      <span className="truncate">{label}</span>
    </label>
  );

  const Section = ({
    title,
    items,
    sel,
    setSel,
  }: {
    title: string;
    items: string[];
    sel: string[];
    setSel: (a: string[]) => void;
  }) => (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setSel(sel.length === items.length ? [] : [...items])}
          className="text-[10px] text-primary hover:underline"
        >
          {sel.length === items.length ? "None" : "All"}
        </button>
      </div>
      <div className="max-h-28 overflow-y-auto border border-border rounded-md bg-background p-1 space-y-0.5">
        {items.map((item) => (
          <CheckRow
            key={item}
            label={item}
            checked={sel.includes(item)}
            onToggle={() => toggle(sel, setSel, item)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30"
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <dialog
        open
        className="bg-card border border-border rounded-xl shadow-xl w-full max-w-lg mx-4 p-5 relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground text-base">
            Export Leads to Excel
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-muted rounded"
          >
            <X size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Section
            title="Projects"
            items={projects}
            sel={selProjects}
            setSel={setSelProjects}
          />
          <Section
            title="Telecallers"
            items={telecallers}
            sel={selTelecallers}
            setSel={setSelTelecallers}
          />
          <Section
            title="Sales Persons"
            items={salesPersons}
            sel={selSales}
            setSel={setSelSales}
          />
          <Section
            title="Lead Status"
            items={[...LEAD_STATUSES]}
            sel={selStatuses}
            setSel={setSelStatuses}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">
            {
              leads.filter((l) => {
                if (selProjects.length && !selProjects.includes(l.projectName))
                  return false;
                if (
                  selTelecallers.length &&
                  !selTelecallers.includes(l.telecaller)
                )
                  return false;
                if (selSales.length && !selSales.includes(l.assignedSales))
                  return false;
                if (
                  selStatuses.length &&
                  !selStatuses.includes(getLatestStatus(l))
                )
                  return false;
                return true;
              }).length
            }{" "}
            leads selected
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md border border-border text-sm font-body hover:bg-muted transition-smooth"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 flex items-center gap-1.5 transition-smooth"
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

// ── Lead Upload Modal ─────────────────────────────────────────────────────────

const TEMPLATE_HEADERS =
  "Name,Mobile,Project,Requirement,Budget,Remarks,Status";
const TEMPLATE_ROWS = [
  "Rahul Sharma,9876543210,Green Valley,2 BHK,40.1-50 Lacs,Interested in ground floor,New",
  "Priya Patel,9123456780,Blue Heights,3 BHK,60.1-70 Lacs,Needs loan assistance,Follow-up",
  "Amit Kumar,9988776655,Sunrise Enclave,1 BHK,30 Lacs,First time buyer,Share Brochure",
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

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
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

interface LeadUploadModalProps {
  onClose: () => void;
}

function LeadUploadModal({ onClose }: LeadUploadModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const addLead = useAddLead();
  const [preview, setPreview] = useState<string[][]>([]);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = (ev.target?.result as string) || "";
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      const rows = lines.map(parseCSVLine);
      setPreview(rows.slice(0, 6)); // show header + 5 rows
    };
    reader.readAsText(file);
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = (ev.target?.result as string) || "";
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        toast.error("CSV has no data rows");
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
        const get = (keys: string[]) => {
          for (const k of keys) {
            const idx = headers.indexOf(k);
            if (idx >= 0) return cols[idx] ?? "";
          }
          return "";
        };
        const firstName =
          get(["name", "first name", "firstname"]).split(" ")[0] || "";
        const lastName =
          get(["name", "first name", "firstname"])
            .split(" ")
            .slice(1)
            .join(" ") || "";
        const lead: Lead = {
          id: 0 as unknown as Lead["id"],
          srNo: 0 as unknown as Lead["srNo"],
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
          statusDates: [],
        };
        try {
          await addLead.mutateAsync(lead);
          success++;
        } catch {
          failed++;
        }
        setProgress(Math.round(((i + 1) / dataRows.length) * 100));
      }
      setUploading(false);
      if (failed === 0) {
        toast.success(`${success} leads uploaded successfully`);
        onClose();
      } else {
        toast.warning(`${success} uploaded, ${failed} failed`);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-display font-semibold text-foreground text-base">
              Upload Leads
            </h3>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              Import leads from CSV file
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Template download */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
            <div>
              <p className="text-sm font-body font-medium text-foreground">
                Download Template
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Columns: Name, Mobile, Project, Requirement, Budget, Remarks,
                Status
              </p>
            </div>
            <button
              type="button"
              onClick={downloadTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-body hover:bg-primary/20 transition-smooth"
              data-ocid="btn-download-template"
            >
              <Download size={13} />
              Template
            </button>
          </div>

          {/* File picker */}
          <button
            type="button"
            className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/3 transition-smooth w-full"
            onClick={() => fileRef.current?.click()}
            data-ocid="lead-upload-drop-zone"
          >
            <Upload
              size={24}
              className="text-muted-foreground/50 mx-auto mb-2"
            />
            {fileName ? (
              <p className="text-sm font-body text-foreground font-medium">
                {fileName}
              </p>
            ) : (
              <>
                <p className="text-sm font-body text-foreground">
                  Click to select CSV file
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports .csv format
                </p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFile}
              className="hidden"
              data-ocid="input-lead-upload-file"
            />
          </button>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-border max-h-40">
              <table className="w-full text-[11px] font-body">
                <thead className="bg-muted/60 sticky top-0">
                  <tr>
                    {preview[0].map((h) => (
                      <th
                        key={h}
                        className="px-2 py-1.5 text-left font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(1).map((row) => (
                    <tr
                      key={row.join("|")}
                      className="border-t border-border hover:bg-muted/30"
                    >
                      {row.map((cell) => (
                        <td
                          key={`${row.join("|")}-${cell}`}
                          className="px-2 py-1 text-foreground whitespace-nowrap max-w-[120px] truncate"
                        >
                          {cell || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Progress bar */}
          {uploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-body text-muted-foreground">
                <span>Uploading…</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-body text-foreground hover:bg-muted transition-smooth disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading || !fileName}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-smooth disabled:opacity-50 flex items-center justify-center gap-1.5"
            data-ocid="btn-upload-submit"
          >
            <Upload size={14} />
            {uploading ? "Uploading…" : "Upload Leads"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Lead Row ──────────────────────────────────────────────────────────────────

function LeadRow({
  lead,
  viewMode,
  onUpdate,
  onCallHistory,
  lastCallDate,
}: {
  lead: Lead;
  viewMode: string;
  onUpdate: (l: Lead) => void;
  onCallHistory: (l: Lead) => void;
  lastCallDate: string;
}) {
  const age = leadAgeDays(lead.leadDate);
  const status = getLatestStatus(lead);
  const statusDate = getStatusDateStr(lead);
  const days = lastCallDate ? daysAgo(lastCallDate) : -1;

  if (viewMode === "mobile") {
    return (
      <div
        className="bg-card border border-border rounded-lg p-3 space-y-2"
        data-ocid={`lead-row-${lead.id}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-xs text-muted-foreground font-body">
              #{Number(lead.srNo)}
            </span>
            <p className="font-body font-semibold text-foreground text-sm truncate">
              {lead.firstName} {lead.lastName}
            </p>
            <a
              href={`tel:${lead.mobileNo}`}
              className="text-xs text-primary font-body flex items-center gap-1"
            >
              <Phone size={10} />
              {lead.mobileNo}
            </a>
          </div>
          <StatusBadge status={status} size="sm" />
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground font-body">
          <span className="bg-muted px-1.5 py-0.5 rounded">
            {lead.projectName}
          </span>
          <span className="bg-muted px-1.5 py-0.5 rounded">
            {lead.telecaller}
          </span>
          {lead.assignedSales && (
            <span className="bg-accent/10 text-accent-foreground px-1.5 py-0.5 rounded">
              {lead.assignedSales}
            </span>
          )}
          <span className="bg-muted px-1.5 py-0.5 rounded">{age}d</span>
          {lastCallDate && (
            <span className="bg-muted px-1.5 py-0.5 rounded">
              Last: {lastCallDate}
              {days >= 0 && ` (${days === 0 ? "Today" : `${days}d ago`})`}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-body">
            {formatDateForDisplay(statusDate)}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onCallHistory(lead)}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth"
              data-ocid="btn-call-history-admin"
              title="Call History"
            >
              <History size={12} />
            </button>
            <button
              type="button"
              onClick={() => onUpdate(lead)}
              className="text-xs text-primary font-body hover:underline px-1"
              data-ocid="btn-update-lead"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr
      className="hover:bg-muted/40 transition-colors group"
      data-ocid={`lead-row-${lead.id}`}
    >
      <td className="px-3 py-2 text-xs text-muted-foreground font-body whitespace-nowrap">
        {Number(lead.srNo)}
      </td>
      <td className="px-3 py-2 min-w-0">
        <div className="font-body text-sm font-medium text-foreground truncate max-w-[120px]">
          {lead.firstName} {lead.lastName}
        </div>
      </td>
      <td className="px-3 py-2">
        <a
          href={`tel:${lead.mobileNo}`}
          className="font-body text-xs text-primary hover:underline flex items-center gap-1 whitespace-nowrap"
        >
          <Phone size={10} />
          {lead.mobileNo}
        </a>
      </td>
      <td className="px-3 py-2 text-xs font-body text-foreground whitespace-nowrap max-w-[100px] truncate">
        {lead.projectName}
      </td>
      <td className="px-3 py-2 text-xs font-body text-muted-foreground whitespace-nowrap">
        {lead.telecaller}
      </td>
      <td className="px-3 py-2">
        <StatusBadge status={status} size="sm" />
      </td>
      {/* LAST CALL from real CallHistory */}
      <td className="px-3 py-2 whitespace-nowrap">
        {lastCallDate ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-mono text-foreground">
              {lastCallDate}
            </span>
            {days >= 0 && (
              <span className="text-[10px] text-muted-foreground">
                {days === 0 ? "Today" : `${days}d ago`}
              </span>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground/50 text-xs">—</span>
        )}
      </td>
      <td className="px-3 py-2 text-xs font-body text-muted-foreground whitespace-nowrap">
        {formatDateForDisplay(statusDate)}
      </td>
      <td className="px-3 py-2 text-xs font-body text-muted-foreground text-right whitespace-nowrap">
        {age}d
      </td>
      <td className="px-3 py-2 text-xs font-body text-muted-foreground max-w-[120px] truncate">
        {lead.remarks1}
      </td>
      <td className="px-3 py-2 text-xs font-body text-muted-foreground whitespace-nowrap">
        {lead.assignedSales || "—"}
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onCallHistory(lead)}
            title="Call History"
            className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth"
            data-ocid="btn-call-history-admin"
          >
            <History size={12} />
          </button>
          <button
            type="button"
            onClick={() => onUpdate(lead)}
            className="text-xs text-primary font-body hover:underline whitespace-nowrap px-1"
            data-ocid="btn-update-lead"
          >
            Update
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { session } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const viewMode = session?.viewMode ?? "desktop";

  const { data: allLeads = [], isLoading } = useAllLeads();
  const { data: projectNames = [] } = useAllProjects();
  // All call history for LAST CALL column
  const { data: allCallHistory = [] } = useCallHistory(null);

  const lastCallMap = useMemo(
    () => buildLastCallMap(allCallHistory),
    [allCallHistory],
  );

  // Lead update modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [callHistoryLead, setCallHistoryLead] = useState<Lead | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const uniqueProjects = useMemo(
    () => (Array.isArray(projectNames) ? projectNames : []),
    [projectNames],
  );
  const allProjectNames = useMemo(
    () =>
      Array.from(new Set(allLeads.map((l) => l.projectName).filter(Boolean))),
    [allLeads],
  );
  const mergedProjects = useMemo(
    () =>
      Array.from(
        new Set([
          ...allProjectNames,
          ...(Array.isArray(uniqueProjects)
            ? uniqueProjects.map((p: { projectName?: string } | string) =>
                typeof p === "string" ? p : (p.projectName ?? ""),
              )
            : []),
        ]),
      ).filter(Boolean),
    [allProjectNames, uniqueProjects],
  );

  // Filters
  const [projectFilter, setProjectFilter] = useState("All");
  const [telecallerFilter, setTelecallerFilter] = useState("All");
  const [salesFilter, setSalesFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [ageBucketFilter, setAgeBucketFilter] = useState<AgeBucket | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField>("statusDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Filter pipeline (in-memory, fast)
  const filtered = useMemo(() => {
    let result = [...allLeads];

    if (projectFilter !== "All")
      result = result.filter((l) => l.projectName === projectFilter);
    if (telecallerFilter !== "All")
      result = result.filter((l) => l.telecaller === telecallerFilter);
    if (salesFilter !== "All")
      result = result.filter((l) => l.assignedSales === salesFilter);

    if (statusFilter) {
      if (statusFilter === "Qualified") {
        result = result.filter((l) =>
          ["Share Brochure", "Follow-up", "SV Plan"].includes(
            getLatestStatus(l),
          ),
        );
      } else if (statusFilter === "New") {
        result = result.filter(
          (l) => !getLatestStatus(l) || getLatestStatus(l) === "New",
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
        (l) =>
          `${l.firstName} ${l.lastName}`.toLowerCase().includes(q) ||
          l.mobileNo.includes(q) ||
          l.remarks1?.toLowerCase().includes(q),
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

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "srNo") cmp = Number(a.srNo) - Number(b.srNo);
      else if (sortField === "name")
        cmp = `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
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
    sortDir,
  ]);

  const statusCounts = useMemo(() => computeStatusCounts(filtered), [filtered]);
  const svCounts = useMemo(() => computeSVCounts(allLeads), [allLeads]);

  const ageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of AGE_BUCKETS) counts[b] = 0;
    for (const l of filtered) {
      const s = getLatestStatus(l);
      if (s === "Lost" || s === "Qualified1") continue;
      const b = ageBucket(leadAgeDays(l.leadDate)) as AgeBucket;
      counts[b]++;
    }
    return counts;
  }, [filtered]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  const handleStatusBoxClick = useCallback((key: string) => {
    setStatusFilter((prev) => (prev === key ? null : key));
    setAgeBucketFilter(null);
  }, []);

  const handleAgeBoxClick = useCallback((bucket: AgeBucket) => {
    setAgeBucketFilter((prev) => (prev === bucket ? null : bucket));
    setStatusFilter(null);
  }, []);

  function handleSVBoxClick(svStatus: string) {
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

  const hasActiveFilters =
    projectFilter !== "All" ||
    telecallerFilter !== "All" ||
    salesFilter !== "All" ||
    !!statusFilter ||
    !!ageBucketFilter ||
    !!search ||
    !!dateFrom ||
    !!dateTo;

  const SortIcon = ({ field }: { field: SortField }) => (
    <ArrowUpDown
      size={11}
      className={`ml-0.5 inline ${sortField === field ? "text-primary" : "text-muted-foreground/40"}`}
    />
  );

  const allTelecallersList = useMemo(
    () =>
      Array.from(new Set(allLeads.map((l) => l.telecaller).filter(Boolean))),
    [allLeads],
  );
  const allSalesPersonsList = useMemo(
    () =>
      Array.from(new Set(allLeads.map((l) => l.assignedSales).filter(Boolean))),
    [allLeads],
  );

  return (
    <Layout
      title="Admin Dashboard"
      headerRight={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-body hover:bg-emerald-700 transition-smooth"
            data-ocid="btn-upload-leads"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Upload Leads</span>
          </button>
          <button
            type="button"
            onClick={() => setShowDownload(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-body hover:bg-primary/90 transition-smooth"
            data-ocid="btn-download-leads"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            type="button"
            onClick={() => qc.invalidateQueries()}
            title="Refresh data"
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
            data-ocid="btn-refresh"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      }
    >
      <div className="p-4 space-y-4">
        {/* ── Filters row ── */}
        <div
          className="bg-card border border-border rounded-xl p-3 flex flex-wrap gap-2 items-center"
          data-ocid="filters-row"
        >
          <Filter size={14} className="text-muted-foreground flex-shrink-0" />

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="filter-project"
          >
            <option value="All">All Projects</option>
            {mergedProjects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={telecallerFilter}
            onChange={(e) => setTelecallerFilter(e.target.value)}
            className="h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="filter-telecaller"
          >
            <option value="All">All Telecallers</option>
            {allTelecallersList.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={salesFilter}
            onChange={(e) => setSalesFilter(e.target.value)}
            className="h-8 px-2 rounded-md border border-input bg-background text-xs font-body text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="filter-sales"
          >
            <option value="All">All Sales</option>
            {allSalesPersonsList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 ml-auto">
            <CalendarDays size={13} className="text-muted-foreground" />
            <input
              type="text"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="DD/MMM/YYYY"
              className="h-8 px-2 rounded-md border border-input bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring w-28"
              data-ocid="filter-date-from"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <input
              type="text"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="DD/MMM/YYYY"
              className="h-8 px-2 rounded-md border border-input bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring w-28"
              data-ocid="filter-date-to"
            />
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="ml-1 flex items-center gap-1 px-2 py-1 text-xs font-body text-muted-foreground hover:text-destructive border border-border rounded-md hover:border-destructive/30 transition-smooth"
                data-ocid="btn-clear-filters"
              >
                <X size={11} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Lead Status Count Boxes ── */}
        <div className="flex flex-wrap gap-2" data-ocid="status-boxes">
          {STATUS_BOX_CONFIG.map(({ key, label, cls }) => (
            <StatBox
              key={key}
              label={label}
              value={statusCounts[key] ?? 0}
              cls={cls}
              active={statusFilter === key}
              onClick={() => handleStatusBoxClick(key)}
              data-ocid={`status-box-${key.toLowerCase().replace(/\s+/g, "-")}`}
            />
          ))}
        </div>

        {/* ── Lead Aging Boxes ── */}
        <div className="bg-card border border-border rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays size={13} className="text-muted-foreground" />
            <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              Lead Aging{" "}
              <span className="text-[10px] normal-case font-normal">
                (excl. Lost &amp; Qualified1)
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {AGE_BUCKETS.map((b) => (
              <AgeBox
                key={b}
                bucket={b}
                count={ageCounts[b] ?? 0}
                active={ageBucketFilter === b}
                onClick={() => handleAgeBoxClick(b)}
              />
            ))}
          </div>
        </div>

        {/* ── SV Status Overview ── */}
        <div
          className="bg-card border border-border rounded-xl px-4 py-3"
          data-ocid="sv-overview-section"
        >
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={14} className="text-primary" />
            <span className="font-display font-semibold text-sm text-foreground">
              SV Status Overview
            </span>
            <span className="text-xs text-muted-foreground font-body ml-1">
              (click to open full view)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SV_BOX_CONFIG.map(({ key, cls }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSVBoxClick(key)}
                data-ocid={`sv-box-${key.toLowerCase().replace(/\s+/g, "-")}`}
                className={`flex flex-col items-center px-3 py-2 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-sm ${cls}`}
              >
                <span className="font-display font-bold text-xl leading-none">
                  {svCounts[key] ?? 0}
                </span>
                <span className="font-body text-[11px] mt-0.5 whitespace-nowrap">
                  {key}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Search Row ── */}
        <div className="flex flex-wrap gap-2 items-center bg-card border border-border rounded-xl px-3 py-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, remark…"
              className="w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              data-ocid="search-leads"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
            <Users size={13} />
            <span>
              <strong className="text-foreground">{filtered.length}</strong>{" "}
              leads
            </span>
          </div>
        </div>

        {/* ── Lead Table / Cards ── */}
        {isLoading ? (
          <div className="space-y-2">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <div
                key={k}
                className="h-10 bg-muted/60 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="leads-empty-state"
          >
            <Users size={40} className="text-muted-foreground/30 mb-3" />
            <p className="font-display font-semibold text-foreground">
              No leads found
            </p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Adjust your filters or search query
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-3 text-sm text-primary hover:underline font-body"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : viewMode === "mobile" ? (
          <div className="space-y-2">
            {filtered.map((lead) => (
              <LeadRow
                key={lead.id.toString()}
                lead={lead}
                viewMode="mobile"
                onUpdate={setSelectedLead}
                onCallHistory={setCallHistoryLead}
                lastCallDate={lastCallMap[lead.mobileNo] ?? ""}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="w-full text-left border-collapse"
                data-ocid="leads-table"
              >
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {[
                      { label: "Sr", field: "srNo" as SortField },
                      { label: "Name", field: "name" as SortField },
                      { label: "Mobile", field: null },
                      { label: "Project", field: null },
                      { label: "Telecaller", field: null },
                      { label: "Status", field: null },
                      { label: "Last Call", field: null },
                      {
                        label: "Status Date",
                        field: "statusDate" as SortField,
                      },
                      { label: "Age", field: "age" as SortField },
                      { label: "Remarks", field: null },
                      { label: "Sales", field: null },
                      { label: "Actions", field: null },
                    ].map(({ label, field }) => (
                      <th
                        key={label}
                        className={`px-3 py-2.5 text-xs font-body font-semibold text-muted-foreground whitespace-nowrap uppercase tracking-wide ${field ? "cursor-pointer hover:text-foreground select-none" : ""}`}
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
                <tbody className="divide-y divide-border">
                  {filtered.map((lead) => (
                    <LeadRow
                      key={lead.id.toString()}
                      lead={lead}
                      viewMode="desktop"
                      onUpdate={setSelectedLead}
                      onCallHistory={setCallHistoryLead}
                      lastCallDate={lastCallMap[lead.mobileNo] ?? ""}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showDownload && (
        <DownloadModal
          leads={allLeads}
          projects={mergedProjects}
          telecallers={allTelecallersList}
          salesPersons={allSalesPersonsList}
          onClose={() => setShowDownload(false)}
        />
      )}
      {showUpload && <LeadUploadModal onClose={() => setShowUpload(false)} />}
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
    </Layout>
  );
}
