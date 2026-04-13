import type { Lead } from "../types";

interface StatusBox {
  key: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const STATUS_BOXES: StatusBox[] = [
  {
    key: "total",
    label: "Total",
    color: "primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
  },
  {
    key: "New",
    label: "New",
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
  },
  {
    key: "Not Connect",
    label: "Not Connect",
    color: "red",
    bgColor: "bg-destructive/8",
    borderColor: "border-destructive/20",
    textColor: "text-destructive",
  },
  {
    key: "Qualified",
    label: "Qualified",
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
  },
  {
    key: "Share Brochure",
    label: "Share Brochure",
    color: "amber",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  {
    key: "Follow-up",
    label: "Follow-up",
    color: "sky",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700",
  },
  {
    key: "SV Plan",
    label: "SV Plan",
    color: "violet",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-700",
  },
  {
    key: "SV Done",
    label: "SV Done",
    color: "emerald",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
  },
  {
    key: "Qualified1",
    label: "Qualified1",
    color: "teal",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-700",
  },
  {
    key: "Lost",
    label: "Lost",
    color: "gray",
    bgColor: "bg-muted",
    borderColor: "border-border",
    textColor: "text-muted-foreground",
  },
];

const QUALIFIED_STATUSES = ["Share Brochure", "Follow-up", "SV Plan"];

function countLeads(leads: Lead[], key: string): number {
  if (key === "total") return leads.length;
  if (key === "Qualified")
    return leads.filter((l) => QUALIFIED_STATUSES.includes(l.latestStatus))
      .length;
  if (key === "New")
    return leads.filter(
      (l) =>
        !l.latestStatus || l.latestStatus === "" || l.latestStatus === "New",
    ).length;
  return leads.filter((l) => l.latestStatus === key).length;
}

interface LeadStatusBoxesProps {
  leads: Lead[];
  activeFilter: string | null;
  onFilterChange: (key: string | null) => void;
}

export function LeadStatusBoxes({
  leads,
  activeFilter,
  onFilterChange,
}: LeadStatusBoxesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_BOXES.map((box) => {
        const count = countLeads(leads, box.key);
        const isActive = activeFilter === box.key;
        return (
          <button
            key={box.key}
            type="button"
            onClick={() => onFilterChange(isActive ? null : box.key)}
            data-ocid={`status-box-${box.key.toLowerCase().replace(/\s+/g, "-")}`}
            className={`
              flex flex-col items-center justify-center min-w-[72px] px-3 py-2 rounded-lg border cursor-pointer
              transition-smooth select-none
              ${
                isActive
                  ? `${box.bgColor} ${box.borderColor} ring-2 ring-offset-1 ring-current ${box.textColor} shadow-md`
                  : `${box.bgColor} ${box.borderColor} ${box.textColor} hover:shadow-sm hover:scale-105`
              }
            `}
          >
            <span className="font-display font-bold text-xl leading-none tabular-nums">
              {count}
            </span>
            <span className="text-[10px] font-body font-medium mt-0.5 text-center leading-tight whitespace-nowrap">
              {box.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
