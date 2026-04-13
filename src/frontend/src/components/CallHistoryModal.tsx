import { Phone, X } from "lucide-react";
import { useCallHistory, useSalesCallHistory } from "../hooks/useCallHistory";
import { DateDisplay } from "./ui/DateDisplay";
import { StatusBadge } from "./ui/StatusBadge";

// ── Telecaller Call History Modal ─────────────────────────────────────────────

interface CallHistoryModalProps {
  mobileNo: string;
  leadName: string;
  onClose: () => void;
}

export function CallHistoryModal({
  mobileNo,
  leadName,
  onClose,
}: CallHistoryModalProps) {
  const { data: allHistory = [], isLoading } = useCallHistory(null);

  const history = allHistory
    .filter((h) => h.mobile === mobileNo)
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  return (
    <CallHistoryPanel
      title={leadName}
      mobileNo={mobileNo}
      isLoading={isLoading}
      onClose={onClose}
      count={history.length}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : history.length === 0 ? (
        <EmptyState />
      ) : (
        history.map((entry, idx) => (
          <div
            key={`${entry.date}-${entry.status}-${idx}`}
            className="flex gap-3 p-3 rounded-lg bg-background border border-border"
            data-ocid={`call-history-row-${idx}`}
          >
            <PhoneIcon idx={idx} total={history.length} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={entry.status} size="sm" />
                <DateDisplay value={entry.date} className="text-[10px]" />
                {entry.projectName && (
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-body">
                    {entry.projectName}
                  </span>
                )}
              </div>
              {entry.remark && (
                <p className="text-xs text-foreground mt-1 font-body leading-relaxed break-words">
                  {entry.remark}
                </p>
              )}
              <p className="text-[10px] text-muted-foreground mt-0.5 font-body">
                By: {entry.telecaller}
              </p>
            </div>
          </div>
        ))
      )}
    </CallHistoryPanel>
  );
}

// ── Sales Call History Modal ──────────────────────────────────────────────────

interface SalesCallHistoryModalProps {
  mobileNo: string;
  leadName: string;
  salesPerson: string;
  onClose: () => void;
}

export function SalesCallHistoryModal({
  mobileNo,
  leadName,
  salesPerson,
  onClose,
}: SalesCallHistoryModalProps) {
  const { data: allHistory = [], isLoading } = useSalesCallHistory(salesPerson);

  const history = allHistory
    .filter((h) => h.mobile === mobileNo)
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  return (
    <CallHistoryPanel
      title={leadName}
      mobileNo={mobileNo}
      isLoading={isLoading}
      onClose={onClose}
      count={history.length}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : history.length === 0 ? (
        <EmptyState />
      ) : (
        history.map((entry, idx) => (
          <div
            key={`${entry.date}-${entry.status}-${idx}`}
            className="flex gap-3 p-3 rounded-lg bg-background border border-border"
            data-ocid={`sales-call-history-row-${idx}`}
          >
            <PhoneIcon idx={idx} total={history.length} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={entry.status} size="sm" />
                <DateDisplay value={entry.date} className="text-[10px]" />
                {entry.projectName && (
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-body">
                    {entry.projectName}
                  </span>
                )}
              </div>
              {entry.remark && (
                <p className="text-xs text-foreground mt-1 font-body leading-relaxed break-words">
                  {entry.remark}
                </p>
              )}
              <p className="text-[10px] text-muted-foreground mt-0.5 font-body">
                By: {entry.salesPerson}
              </p>
            </div>
          </div>
        ))
      )}
    </CallHistoryPanel>
  );
}

// ── Full Call Log Modal (all calls for a sales person) ────────────────────────

interface FullCallLogModalProps {
  salesPerson: string;
  todayOnly?: boolean;
  onClose: () => void;
}

export function FullCallLogModal({
  salesPerson,
  todayOnly = false,
  onClose,
}: FullCallLogModalProps) {
  const { data: allHistory = [], isLoading } = useSalesCallHistory(salesPerson);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const todayDDMMMYYYY = `${dd}/${months[today.getMonth()]}/${today.getFullYear()}`;

  const history = (
    todayOnly
      ? allHistory.filter((h) => h.date === todayDDMMMYYYY)
      : [...allHistory]
  ).sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-label={todayOnly ? "Today's call log" : "Full call log"}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="relative w-full sm:max-w-2xl bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone size={14} className="text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground text-sm">
                {todayOnly ? "Today's Call Log" : "Full Call Log"}
              </h2>
              <p className="text-xs text-muted-foreground font-body">
                {salesPerson} · {history.length} record
                {history.length !== 1 ? "s" : ""}
              </p>
            </div>
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
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-2">
              <LoadingSkeleton />
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <Phone size={32} className="text-muted-foreground/40 mb-3" />
              <p className="text-sm font-body text-muted-foreground">
                {todayOnly ? "No calls made today" : "No call history found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body">
                <thead className="sticky top-0 bg-muted/80 border-b border-border">
                  <tr>
                    {[
                      "Date",
                      "Name",
                      "Mobile",
                      "Project",
                      "Status",
                      "Remarks",
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-3 py-2.5 text-left text-[10px] font-display font-semibold text-primary uppercase tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr
                      key={`${h.date}-${h.mobile}-${i}`}
                      className={`border-b border-border/60 hover:bg-muted/40 ${i % 2 === 1 ? "bg-muted/10" : ""}`}
                    >
                      <td className="px-3 py-2 font-mono whitespace-nowrap text-muted-foreground">
                        {h.date || "—"}
                      </td>
                      <td className="px-3 py-2 text-foreground font-medium whitespace-nowrap">
                        {h.name || "—"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <a
                          href={`tel:${h.mobile}`}
                          className="text-primary hover:underline font-mono"
                        >
                          {h.mobile}
                        </a>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                        {h.projectName || "—"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <StatusBadge status={h.status} size="sm" />
                      </td>
                      <td className="px-3 py-2 max-w-[180px]">
                        <span className="line-clamp-1 text-muted-foreground">
                          {h.remark || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function CallHistoryPanel({
  title,
  mobileNo,
  isLoading,
  onClose,
  count,
  children,
}: {
  title: string;
  mobileNo: string;
  isLoading: boolean;
  onClose: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-label={`Call history for ${title}`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="relative w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone size={14} className="text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground text-sm">
                {title}
              </h2>
              <a
                href={`tel:${mobileNo}`}
                className="text-xs text-muted-foreground font-mono hover:text-primary transition-smooth"
              >
                {mobileNo}
              </a>
            </div>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-2">{children}</div>
        <div className="flex-shrink-0 px-5 py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center font-body">
            {isLoading
              ? "Loading…"
              : `${count} call record${count !== 1 ? "s" : ""} for this lead`}
          </p>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon({ idx, total }: { idx: number; total: number }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Phone size={10} className="text-primary" />
      </div>
      {idx < total - 1 && (
        <div className="flex-1 w-px bg-border min-h-[12px]" />
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-10 text-center"
      data-ocid="call-history-empty"
    >
      <Phone size={32} className="text-muted-foreground/40 mb-3" />
      <p className="text-sm font-body text-muted-foreground">
        No call history found
      </p>
      <p className="text-xs text-muted-foreground/60 mt-1">
        Calls logged via Lead Update will appear here
      </p>
    </div>
  );
}
