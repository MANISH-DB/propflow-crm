import type { Lead } from "../types";
import { leadAgeDays } from "../utils/dateUtils";

interface AgingBox {
  key: string;
  label: string;
  minDays: number;
  maxDays: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const AGING_BOXES: AgingBox[] = [
  {
    key: "0-9",
    label: "0–9 Days",
    minDays: 0,
    maxDays: 9,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
  },
  {
    key: "10-19",
    label: "10–19 Days",
    minDays: 10,
    maxDays: 19,
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-700",
  },
  {
    key: "20-29",
    label: "20–29 Days",
    minDays: 20,
    maxDays: 29,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  {
    key: "30-59",
    label: "30–59 Days",
    minDays: 30,
    maxDays: 59,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
  },
  {
    key: "60-90",
    label: "60–90 Days",
    minDays: 60,
    maxDays: 90,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
  },
  {
    key: "90+",
    label: "90+ Days",
    minDays: 91,
    maxDays: 99999,
    bgColor: "bg-destructive/8",
    borderColor: "border-destructive/20",
    textColor: "text-destructive",
  },
];

const EXCLUDED_STATUSES = ["Lost", "Qualified1"];

function countAgingLeads(leads: Lead[], box: AgingBox): number {
  return leads
    .filter((l) => !EXCLUDED_STATUSES.includes(l.latestStatus))
    .filter((l) => {
      const age = leadAgeDays(l.leadDate);
      return age >= box.minDays && age <= box.maxDays;
    }).length;
}

interface LeadAgingBoxesProps {
  leads: Lead[];
  activeFilter: string | null;
  onFilterChange: (key: string | null) => void;
}

export function LeadAgingBoxes({
  leads,
  activeFilter,
  onFilterChange,
}: LeadAgingBoxesProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {AGING_BOXES.map((box) => {
        const count = countAgingLeads(leads, box);
        const isActive = activeFilter === box.key;
        return (
          <button
            key={box.key}
            type="button"
            onClick={() => onFilterChange(isActive ? null : box.key)}
            data-ocid={`aging-box-${box.key}`}
            className={`
              flex flex-col items-center justify-center min-w-[64px] px-2.5 py-1.5 rounded-md border cursor-pointer
              transition-smooth select-none
              ${
                isActive
                  ? `${box.bgColor} ${box.borderColor} ring-2 ring-offset-1 ring-current ${box.textColor} shadow-sm`
                  : `${box.bgColor} ${box.borderColor} ${box.textColor} hover:shadow-sm hover:scale-105`
              }
            `}
          >
            <span className="font-display font-bold text-base leading-none tabular-nums">
              {count}
            </span>
            <span className="text-[9px] font-body font-medium mt-0.5 text-center leading-tight whitespace-nowrap">
              {box.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
