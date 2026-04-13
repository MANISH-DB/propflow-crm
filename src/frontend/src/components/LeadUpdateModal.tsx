import { MessageCircle, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAddCallHistory } from "../hooks/useCallHistory";
import { useUpdateLead } from "../hooks/useLeads";
import {
  useAllProjects,
  useBrochureLink,
  useUniqueSalesPersons,
} from "../hooks/useProjects";
import {
  BUDGET_OPTIONS,
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
  REQUIREMENT_OPTIONS,
} from "../types";
import {
  fromInputDate,
  toInputDateFromStr,
  todayStr,
} from "../utils/dateUtils";
import { DateDisplay } from "./ui/DateDisplay";

interface LeadUpdateModalProps {
  lead: Lead;
  onClose: () => void;
}

type StatusDateMap = Record<string, string>;

function buildStatusDateMap(
  statusDates: Array<[string, string]>,
): StatusDateMap {
  const map: StatusDateMap = {};
  for (const [key, val] of statusDates) {
    map[key] = val;
  }
  return map;
}

function mapToStatusDates(map: StatusDateMap): Array<[string, string]> {
  return Object.entries(map).filter(([, v]) => !!v);
}

// WhatsApp Brochure Button
function WhatsAppBrochureButton({
  lead,
  projectName,
}: {
  lead: Lead;
  projectName: string;
}) {
  const { data: brochureLink } = useBrochureLink(
    projectName || lead.projectName,
  );
  const mobile = lead.mobileNo.replace(/\D/g, "");
  const disabled = !brochureLink;

  function handleClick() {
    if (!brochureLink) return;
    const text = encodeURIComponent(
      `Hi ${lead.firstName}, Thank you for your interest in ${projectName || lead.projectName}. Please find our brochure here: ${brochureLink}`,
    );
    window.open(`https://wa.me/${mobile}?text=${text}`, "_blank");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={
        disabled
          ? "No brochure available for this project"
          : "Send brochure via WhatsApp"
      }
      data-ocid="btn-whatsapp-brochure"
      className={[
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth border",
        disabled
          ? "opacity-50 cursor-not-allowed bg-muted border-border text-muted-foreground"
          : "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400",
      ].join(" ")}
    >
      <MessageCircle size={13} />
      WhatsApp Brochure
    </button>
  );
}

export function LeadUpdateModal({ lead, onClose }: LeadUpdateModalProps) {
  const { session } = useAuth();
  const updateLead = useUpdateLead();
  const addCallHistory = useAddCallHistory();
  const { data: projects = [] } = useAllProjects();
  const { data: salesPersons = [] } = useUniqueSalesPersons();

  const [firstName, setFirstName] = useState(lead.firstName);
  const [projectName, setProjectName] = useState(lead.projectName);
  const [statusDates, setStatusDates] = useState<StatusDateMap>(
    buildStatusDateMap(lead.statusDates as Array<[string, string]>),
  );
  const [requirement, setRequirement] = useState(lead.requirement);
  const [budget, setBudget] = useState(lead.budget);
  const [assignedSales, setAssignedSales] = useState(lead.assignedSales);
  const [remarks1, setRemarks1] = useState(lead.remarks1);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleStatusDateChange(status: string, inputVal: string) {
    const dateStr = inputVal ? fromInputDate(inputVal) : "";
    setStatusDates((prev) => ({ ...prev, [status]: dateStr }));
  }

  function getLatestStatusAndDate(dates: StatusDateMap): {
    status: string;
    date: string;
  } {
    const ORDER: LeadStatus[] = [
      "Lost",
      "Qualified1",
      "SV Done",
      "SV Plan",
      "Follow-up",
      "Share Brochure",
      "Not Connect",
      "New",
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
      date: latestDate || lead.latestStatusDate,
    };
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const { status: newLatestStatus, date: newLatestDate } =
        getLatestStatusAndDate(statusDates);
      const oldRemarks1 = lead.remarks1;
      const newRemarks2 =
        remarks1 !== oldRemarks1 ? oldRemarks1 : lead.remarks2;

      const updated: Lead = {
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
        statusDate: newLatestDate,
      };

      await updateLead.mutateAsync(updated);

      if (session?.username) {
        await addCallHistory.mutateAsync({
          date: todayStr(),
          name: `${firstName} ${lead.lastName}`.trim(),
          mobile: lead.mobileNo,
          status: newLatestStatus,
          remark: remarks1,
          telecaller: session.username,
          projectName,
        });
      }

      onClose();
    } catch {
      // Silent fail — mutation handles rollback
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-label={`Update lead: ${lead.firstName} ${lead.lastName}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default w-full"
        onClick={onClose}
        aria-label="Close dialog"
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-primary/5 flex-shrink-0">
          <div className="min-w-0 flex-1">
            <h2 className="font-display font-semibold text-foreground text-base">
              Update Lead — Sr. {lead.srNo.toString()}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 font-body">
              {lead.firstName} {lead.lastName} · {lead.mobileNo}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            <WhatsAppBrochureButton lead={lead} projectName={projectName} />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* A: Name + Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lum-first-name"
                className="block text-xs font-body font-medium text-foreground mb-1"
              >
                First Name
              </label>
              <input
                id="lum-first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="input-first-name"
              />
            </div>
            <div>
              <p className="text-xs font-body font-medium text-muted-foreground mb-1">
                Mobile
              </p>
              <div className="px-3 py-1.5 rounded-md border border-border bg-muted/30 text-sm font-mono text-muted-foreground">
                {lead.mobileNo}
              </div>
            </div>
          </div>

          {/* B: Project Name */}
          <div>
            <label
              htmlFor="lum-project"
              className="block text-xs font-body font-medium text-foreground mb-1"
            >
              Project Name
            </label>
            <select
              id="lum-project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="select-project-name"
            >
              <option value="">Select project…</option>
              {projects.map((p) => (
                <option key={p.projectName} value={p.projectName}>
                  {p.projectName}
                </option>
              ))}
            </select>
          </div>

          {/* C: Status Dates */}
          <div className="space-y-2">
            <p className="text-xs font-body font-semibold text-foreground uppercase tracking-wide">
              Lead Status Dates
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LEAD_STATUSES.filter((s) => s !== "New").map((status) => {
                const inputId = `lum-status-${status.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <div
                    key={status}
                    className="flex items-center gap-2 p-2 rounded-md border border-border bg-background"
                  >
                    <label
                      htmlFor={inputId}
                      className="text-xs font-body text-foreground min-w-[90px] cursor-pointer"
                    >
                      {status}
                    </label>
                    <input
                      id={inputId}
                      type="date"
                      value={toInputDateFromStr(statusDates[status] ?? "")}
                      onChange={(e) =>
                        handleStatusDateChange(status, e.target.value)
                      }
                      className="flex-1 px-2 py-0.5 rounded border border-input bg-muted/30 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      data-ocid={`input-status-date-${status.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                    {statusDates[status] && (
                      <DateDisplay
                        value={statusDates[status]}
                        className="text-[10px]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* D+E: Requirement, Budget, Assigned Sales */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="lum-requirement"
                className="block text-xs font-body font-medium text-foreground mb-1"
              >
                Requirement
              </label>
              <select
                id="lum-requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="select-requirement"
              >
                <option value="">Select…</option>
                {REQUIREMENT_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="lum-budget"
                className="block text-xs font-body font-medium text-foreground mb-1"
              >
                Budget
              </label>
              <select
                id="lum-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="select-budget"
              >
                <option value="">Select…</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="lum-assigned-sales"
                className="block text-xs font-body font-medium text-foreground mb-1"
              >
                Assigned Sales
              </label>
              <input
                id="lum-assigned-sales"
                type="text"
                value={assignedSales}
                onChange={(e) => setAssignedSales(e.target.value)}
                list="sales-persons-list"
                placeholder="Type or select…"
                className="w-full px-3 py-1.5 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="input-assigned-sales"
              />
              <datalist id="sales-persons-list">
                {salesPersons.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
          </div>

          {/* F+G: Remarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lum-remarks1"
                className="block text-xs font-body font-medium text-foreground mb-1"
              >
                Remarks 1
              </label>
              <textarea
                id="lum-remarks1"
                value={remarks1}
                onChange={(e) => setRemarks1(e.target.value)}
                rows={3}
                placeholder="Add your remark…"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="textarea-remarks1"
              />
            </div>
            <div>
              <p className="text-xs font-body font-medium text-muted-foreground mb-1">
                Previous Remark
              </p>
              <div className="px-3 py-2 rounded-md border border-border bg-muted/30 text-sm font-body text-muted-foreground min-h-[76px] whitespace-pre-wrap break-words">
                {lead.remarks2 || (
                  <span className="italic text-muted-foreground/60">
                    No previous remark
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center justify-end gap-3 px-5 py-3 border-t border-border bg-muted/20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-border text-sm font-body text-muted-foreground hover:bg-muted transition-smooth"
            data-ocid="btn-cancel-update"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-body font-medium hover:bg-primary/90 disabled:opacity-60 transition-smooth"
            data-ocid="btn-save-lead"
          >
            <Save size={14} />
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
