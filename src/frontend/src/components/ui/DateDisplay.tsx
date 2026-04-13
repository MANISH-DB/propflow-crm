import { formatDateForDisplay } from "../../utils/dateUtils";

interface DateDisplayProps {
  value: string;
  className?: string;
  showEmpty?: string;
}

/**
 * Renders a DD/MMM/YYYY date string in mono font.
 * Shows placeholder if empty.
 */
export function DateDisplay({
  value,
  className = "",
  showEmpty = "—",
}: DateDisplayProps) {
  const display = formatDateForDisplay(value);
  const isEmpty = display === "—";

  return (
    <span
      className={`font-mono text-xs tabular-nums ${
        isEmpty ? "text-muted-foreground" : "text-foreground"
      } ${className}`}
    >
      {isEmpty ? showEmpty : display}
    </span>
  );
}
