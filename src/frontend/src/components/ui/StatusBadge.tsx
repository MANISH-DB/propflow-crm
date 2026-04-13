import { STATUS_COLORS } from "../../types";

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "md";
}

export function StatusBadge({
  status,
  className = "",
  size = "md",
}: StatusBadgeProps) {
  const colorClass =
    STATUS_COLORS[status] ?? "bg-muted text-muted-foreground border-border";

  const sizeClass =
    size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs";

  return (
    <span
      className={`
        inline-flex items-center rounded border font-body font-medium
        whitespace-nowrap select-none
        ${sizeClass} ${colorClass} ${className}
      `}
      data-ocid={`status-badge-${status.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {status || "—"}
    </span>
  );
}
