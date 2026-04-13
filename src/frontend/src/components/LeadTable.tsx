import { History, MessageCircle, Pencil, Phone } from "lucide-react";
import { useAllProjects } from "../hooks/useProjects";
import type { CallHistory, Lead } from "../types";
import { leadAgeDays, parseDate } from "../utils/dateUtils";
import { DateDisplay } from "./ui/DateDisplay";
import { StatusBadge } from "./ui/StatusBadge";

interface LeadTableProps {
  leads: Lead[];
  viewMode: "desktop" | "mobile";
  isLoading: boolean;
  onLeadUpdate: (lead: Lead) => void;
  onCallHistory: (lead: Lead) => void;
  /** Optional: all call history records so we can compute LAST CALL per lead */
  callHistoryAll?: CallHistory[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Build a map from mobile → most recent CallHistory date (DD/MMM/YYYY) */
function buildLastCallMap(history: CallHistory[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const h of history) {
    if (!h.mobile || !h.date) continue;
    const existing = map[h.mobile];
    if (!existing || h.date > existing) {
      map[h.mobile] = h.date;
    }
  }
  return map;
}

/** Days between a DD/MMM/YYYY date and today */
function daysAgo(dateStr: string): number {
  const d = parseDate(dateStr);
  if (Number.isNaN(d.getTime())) return -1;
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ── Sub-components ────────────────────────────────────────────────────────────

function WhatsAppButton({
  lead,
  brochureUrl,
}: { lead: Lead; brochureUrl: string | undefined }) {
  const mobile = lead.mobileNo.replace(/\D/g, "");
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const brochureText = brochureUrl ? `\n\nBrochure: ${brochureUrl}` : "";
  const text = encodeURIComponent(
    `Hi ${name}, Thank you for your interest in ${lead.projectName}. Please find the details below.${brochureText}`,
  );
  return (
    <a
      href={`https://wa.me/${mobile}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Send WhatsApp"
      className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-smooth"
      data-ocid="btn-whatsapp"
    >
      <MessageCircle size={13} />
    </a>
  );
}

function ActionButtons({
  lead,
  brochureUrl,
  onLeadUpdate,
  onCallHistory,
}: {
  lead: Lead;
  brochureUrl: string | undefined;
  onLeadUpdate: (l: Lead) => void;
  onCallHistory: (l: Lead) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        title="Update Lead"
        onClick={() => onLeadUpdate(lead)}
        className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-smooth"
        data-ocid="btn-lead-update"
      >
        <Pencil size={12} />
      </button>
      <button
        type="button"
        title="Call History"
        onClick={() => onCallHistory(lead)}
        className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-smooth"
        data-ocid="btn-call-history"
      >
        <History size={12} />
      </button>
      <WhatsAppButton lead={lead} brochureUrl={brochureUrl} />
    </div>
  );
}

function AgeChip({ days }: { days: number }) {
  const cls =
    days <= 9
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : days <= 19
        ? "bg-sky-50 text-sky-700 border-sky-200"
        : days <= 29
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : days <= 59
            ? "bg-orange-50 text-orange-700 border-orange-200"
            : "bg-destructive/10 text-destructive border-destructive/20";
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-body font-semibold tabular-nums ${cls}`}
    >
      {days}d
    </span>
  );
}

/** Last call cell — shows DD/MMM/YYYY + small "Xd ago" text */
function LastCallCell({ dateStr }: { dateStr: string }) {
  if (!dateStr) {
    return <span className="text-muted-foreground/50">—</span>;
  }
  const days = daysAgo(dateStr);
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-foreground text-xs font-mono whitespace-nowrap">
        {dateStr}
      </span>
      {days >= 0 && (
        <span className="text-[10px] text-muted-foreground font-body whitespace-nowrap">
          {days === 0 ? "Today" : `${days}d ago`}
        </span>
      )}
    </div>
  );
}

// Skeleton rows for loading state
function TableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={`skel-row-${i}`} className="border-b border-border">
          {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"].map(
            (col) => (
              <td key={`skel-col-${i}-${col}`} className="px-3 py-2.5">
                <div
                  className="h-3 bg-muted rounded animate-pulse"
                  style={{ width: "60%" }}
                />
              </td>
            ),
          )}
        </tr>
      ))}
    </>
  );
}

function MobileCard({
  lead,
  brochureUrl,
  onLeadUpdate,
  onCallHistory,
  idx,
  lastCallDate,
}: {
  lead: Lead;
  brochureUrl: string | undefined;
  onLeadUpdate: (l: Lead) => void;
  onCallHistory: (l: Lead) => void;
  idx: number;
  lastCallDate: string;
}) {
  const age = leadAgeDays(lead.leadDate);
  const days = lastCallDate ? daysAgo(lastCallDate) : -1;
  return (
    <div
      className="bg-card border border-border rounded-lg p-3 space-y-2"
      data-ocid={`lead-card-${idx}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded flex-shrink-0">
            #{lead.srNo.toString()}
          </span>
          <div className="min-w-0">
            <p className="font-body font-semibold text-sm text-foreground truncate">
              {lead.firstName} {lead.lastName}
            </p>
            <a
              href={`tel:${lead.mobileNo}`}
              className="flex items-center gap-1 text-xs text-primary hover:underline font-mono"
            >
              <Phone size={10} />
              {lead.mobileNo}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusBadge status={lead.latestStatus || "New"} size="sm" />
          <AgeChip days={age} />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground font-body">
        <span>
          <span className="text-foreground/60">Project:</span>{" "}
          {lead.projectName || "—"}
        </span>
        {lead.assignedSales && (
          <span>
            <span className="text-foreground/60">Sales:</span>{" "}
            {lead.assignedSales}
          </span>
        )}
        {lastCallDate && (
          <span>
            <span className="text-foreground/60">Last Call:</span>{" "}
            {lastCallDate}
            {days >= 0 && (
              <span className="ml-1 text-muted-foreground/70">
                ({days === 0 ? "Today" : `${days}d ago`})
              </span>
            )}
          </span>
        )}
        {lead.remarks1 && (
          <span className="w-full">
            <span className="text-foreground/60">Remark:</span>{" "}
            <span className="text-foreground line-clamp-1">
              {lead.remarks1}
            </span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border">
        <div className="text-[10px] text-muted-foreground font-body space-x-2">
          <span>
            Status:{" "}
            <DateDisplay
              value={lead.latestStatusDate}
              className="text-[10px]"
            />
          </span>
        </div>
        <ActionButtons
          lead={lead}
          brochureUrl={brochureUrl}
          onLeadUpdate={onLeadUpdate}
          onCallHistory={onCallHistory}
        />
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function LeadTable({
  leads,
  viewMode,
  isLoading,
  onLeadUpdate,
  onCallHistory,
  callHistoryAll = [],
}: LeadTableProps) {
  const { data: projects = [] } = useAllProjects();
  const brochureMap: Record<string, string> = {};
  for (const p of projects) {
    if (p.brochure) brochureMap[p.projectName] = p.brochure;
  }

  const lastCallMap = buildLastCallMap(callHistoryAll);

  if (viewMode === "mobile") {
    return (
      <div className="space-y-2" data-ocid="lead-cards-list">
        {isLoading ? (
          ["s1", "s2", "s3", "s4", "s5"].map((sk) => (
            <div key={sk} className="h-28 bg-muted rounded-lg animate-pulse" />
          ))
        ) : leads.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="leads-empty-state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Phone size={28} className="text-muted-foreground/40" />
            </div>
            <p className="font-display font-semibold text-foreground text-base">
              No leads found
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-body">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          leads.map((lead, idx) => (
            <MobileCard
              key={lead.id.toString()}
              lead={lead}
              brochureUrl={brochureMap[lead.projectName]}
              onLeadUpdate={onLeadUpdate}
              onCallHistory={onCallHistory}
              idx={idx}
              lastCallDate={lastCallMap[lead.mobileNo] ?? ""}
            />
          ))
        )}
      </div>
    );
  }

  // Desktop table
  return (
    <div
      className="overflow-x-auto rounded-xl border border-border bg-card"
      data-ocid="lead-table-desktop"
    >
      <table className="w-full text-xs font-body border-collapse">
        <thead>
          <tr className="bg-primary/5 border-b border-border">
            {[
              "SR.NO",
              "NAME",
              "MOBILE",
              "PROJECT",
              "TELECALLER",
              "STATUS",
              "LAST CALL",
              "STATUS DATE",
              "AGE",
              "REMARKS",
              "SALES",
              "ACTIONS",
            ].map((col) => (
              <th
                key={col}
                className="px-3 py-2.5 text-left text-[10px] font-display font-semibold text-primary uppercase tracking-wider whitespace-nowrap sticky top-0 bg-primary/5"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <TableSkeleton />
          ) : leads.length === 0 ? (
            <tr>
              <td colSpan={12} className="px-3 py-16 text-center">
                <div
                  className="flex flex-col items-center gap-3"
                  data-ocid="leads-empty-state"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Phone size={24} className="text-muted-foreground/40" />
                  </div>
                  <p className="font-display font-medium text-foreground">
                    No leads found
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            leads.map((lead, idx) => {
              const age = leadAgeDays(lead.leadDate);
              const brochureUrl = brochureMap[lead.projectName];
              const lastCallDate = lastCallMap[lead.mobileNo] ?? "";
              return (
                <tr
                  key={lead.id.toString()}
                  className={`border-b border-border transition-colors hover:bg-muted/40 ${idx % 2 === 1 ? "bg-muted/10" : "bg-card"}`}
                  data-ocid={`lead-row-${idx}`}
                >
                  <td className="px-3 py-2 font-mono text-muted-foreground whitespace-nowrap">
                    {lead.srNo.toString()}
                  </td>
                  <td className="px-3 py-2 font-body font-medium text-foreground whitespace-nowrap max-w-[120px]">
                    <span
                      className="truncate block"
                      title={`${lead.firstName} ${lead.lastName}`}
                    >
                      {lead.firstName}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <a
                      href={`tel:${lead.mobileNo}`}
                      className="flex items-center gap-1 text-primary hover:underline font-mono"
                    >
                      <Phone size={10} />
                      {lead.mobileNo}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap max-w-[120px]">
                    <span
                      className="truncate block text-foreground"
                      title={lead.projectName}
                    >
                      {lead.projectName || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                    {lead.telecaller || "—"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <StatusBadge
                      status={lead.latestStatus || "New"}
                      size="sm"
                    />
                  </td>
                  {/* LAST CALL — from real CallHistory */}
                  <td className="px-3 py-2 whitespace-nowrap">
                    <LastCallCell dateStr={lastCallDate} />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <DateDisplay value={lead.latestStatusDate} />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <AgeChip days={age} />
                  </td>
                  <td className="px-3 py-2 max-w-[160px]">
                    <span
                      className="line-clamp-1 text-muted-foreground"
                      title={lead.remarks1}
                    >
                      {lead.remarks1 || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                    {lead.assignedSales || "—"}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <ActionButtons
                      lead={lead}
                      brochureUrl={brochureUrl}
                      onLeadUpdate={onLeadUpdate}
                      onCallHistory={onCallHistory}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {!isLoading && leads.length > 0 && (
        <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground font-body">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {leads.length}
            </span>{" "}
            lead{leads.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
