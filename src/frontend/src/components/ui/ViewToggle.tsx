import { Monitor, Smartphone } from "lucide-react";
import type { ViewMode } from "../../types";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({
  mode,
  onChange,
  className = "",
}: ViewToggleProps) {
  return (
    <div
      className={`inline-flex items-center rounded-lg border border-border bg-muted p-0.5 ${className}`}
      aria-label="View mode"
    >
      <button
        type="button"
        aria-pressed={mode === "desktop"}
        onClick={() => onChange("desktop")}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium
          transition-smooth
          ${
            mode === "desktop"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }
        `}
        data-ocid="toggle-desktop-view"
      >
        <Monitor size={13} />
        <span>Desktop</span>
      </button>

      <button
        type="button"
        aria-pressed={mode === "mobile"}
        onClick={() => onChange("mobile")}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium
          transition-smooth
          ${
            mode === "mobile"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }
        `}
        data-ocid="toggle-mobile-view"
      >
        <Smartphone size={13} />
        <span>Mobile</span>
      </button>
    </div>
  );
}
