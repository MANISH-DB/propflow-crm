import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAddSalesCallHistory } from "../hooks/useCallHistory";
import { useUpdateLead } from "../hooks/useLeads";
import type { Lead, SVStatus, SalesCallHistory } from "../types";
import { SV_STATUSES } from "../types";
import {
  fromInputDate,
  toInputDateFromStr,
  todayStr,
} from "../utils/dateUtils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface Props {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  salesPersonName: string;
  onSaved?: (lead: Lead) => void;
}

export function SalesLeadUpdateModal({
  lead,
  open,
  onClose,
  salesPersonName,
  onSaved,
}: Props) {
  const updateLead = useUpdateLead();
  const addHistory = useAddSalesCallHistory();

  const [svRemark, setSvRemark] = useState("");
  const [svStatus, setSvStatus] = useState<SVStatus | "">("");
  const [statusDate, setStatusDate] = useState("");
  const [svNextFollowup, setSvNextFollowup] = useState("");
  const [leadClose, setLeadClose] = useState("Open");

  useEffect(() => {
    if (lead) {
      setSvRemark(lead.svRemark ?? "");
      setSvStatus((lead.svStatus as SVStatus) ?? "");
      setStatusDate(toInputDateFromStr(lead.statusDate ?? ""));
      setSvNextFollowup(toInputDateFromStr(lead.svNextFollowup ?? ""));
      setLeadClose(lead.leadCloseStatus || "Open");
    }
  }, [lead]);

  if (!open || !lead) return null;

  async function handleSave() {
    if (!lead) return;

    const statusDateStr = statusDate ? fromInputDate(statusDate) : "";
    const svNextFollowupStr = svNextFollowup
      ? fromInputDate(svNextFollowup)
      : "";

    const updatedLead: Lead = {
      ...lead,
      svRemark,
      svStatus: svStatus || lead.svStatus,
      statusDate: statusDateStr || lead.statusDate,
      svNextFollowup: svNextFollowupStr || lead.svNextFollowup,
      leadCloseStatus: leadClose,
    };

    const historyEntry: SalesCallHistory = {
      date: todayStr(),
      name: `${lead.firstName} ${lead.lastName}`.trim(),
      mobile: lead.mobileNo,
      status: svStatus || lead.svStatus,
      remark: svRemark,
      salesPerson: salesPersonName,
      projectName: lead.projectName,
    };

    try {
      await updateLead.mutateAsync(updatedLead);
      await addHistory.mutateAsync(historyEntry);
      toast.success("Lead updated successfully");
      onSaved?.(updatedLead);
      onClose();
    } catch {
      toast.error("Failed to update lead");
    }
  }

  const isBusy = updateLead.isPending || addHistory.isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h2 className="font-display font-semibold text-foreground text-base">
              Update SV Lead
            </h2>
            <p className="text-muted-foreground text-xs font-body mt-0.5">
              Update site visit details and call history
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Lead Identity */}
          <div className="rounded-lg bg-primary/5 border border-primary/15 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display font-semibold text-foreground text-base truncate">
                  {lead.firstName} {lead.lastName}
                </p>
                <p className="text-muted-foreground text-sm font-body mt-0.5">
                  {lead.mobileNo}
                </p>
                <p className="text-muted-foreground text-xs font-body mt-0.5">
                  {lead.projectName}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <Badge variant="outline" className="text-xs font-body">
                  Sr. {lead.srNo.toString()}
                </Badge>
                <span className="text-xs text-muted-foreground font-body">
                  {lead.telecaller}
                </span>
              </div>
            </div>
          </div>

          {/* SV Status */}
          <div className="space-y-1.5">
            <Label className="text-sm font-body text-foreground font-medium">
              SV Status
            </Label>
            <Select
              value={svStatus}
              onValueChange={(v) => setSvStatus(v as SVStatus)}
            >
              <SelectTrigger
                className="w-full border-input bg-background"
                data-ocid="sales-sv-status-select"
              >
                <SelectValue placeholder="Select SV Status…" />
              </SelectTrigger>
              <SelectContent>
                {SV_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Date */}
          <div className="space-y-1.5">
            <Label className="text-sm font-body text-foreground font-medium">
              Status Date
            </Label>
            <input
              type="date"
              value={statusDate}
              onChange={(e) => setStatusDate(e.target.value)}
              className="w-full h-9 px-3 py-1 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="sales-status-date-input"
            />
          </div>

          {/* SV Next Followup */}
          <div className="space-y-1.5">
            <Label className="text-sm font-body text-foreground font-medium">
              SV Next Followup
            </Label>
            <input
              type="date"
              value={svNextFollowup}
              onChange={(e) => setSvNextFollowup(e.target.value)}
              className="w-full h-9 px-3 py-1 rounded-md border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="sales-sv-next-followup-input"
            />
          </div>

          {/* SV Remark */}
          <div className="space-y-1.5">
            <Label className="text-sm font-body text-foreground font-medium">
              SV Remark
            </Label>
            <Textarea
              value={svRemark}
              onChange={(e) => setSvRemark(e.target.value)}
              rows={3}
              placeholder="Enter site visit remarks…"
              className="resize-none font-body text-sm"
              data-ocid="sales-sv-remark-textarea"
            />
          </div>

          {/* Lead Close Status */}
          <div className="space-y-1.5">
            <Label className="text-sm font-body text-foreground font-medium">
              Lead Close Status
            </Label>
            <Select value={leadClose} onValueChange={setLeadClose}>
              <SelectTrigger
                className="w-full border-input bg-background"
                data-ocid="sales-lead-close-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Lead Close">Lead Close</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-border flex-shrink-0">
          <Button
            variant="outline"
            className="flex-1 font-body"
            onClick={onClose}
            disabled={isBusy}
            data-ocid="sales-modal-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 font-body bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSave}
            disabled={isBusy}
            data-ocid="sales-modal-save-btn"
          >
            {isBusy ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
