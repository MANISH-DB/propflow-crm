import { j as jsxRuntimeExports, f as STATUS_COLORS } from "./index-BYjlLTrJ.js";
function StatusBadge({
  status,
  className = "",
  size = "md"
}) {
  const colorClass = STATUS_COLORS[status] ?? "bg-muted text-muted-foreground border-border";
  const sizeClass = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `
        inline-flex items-center rounded border font-body font-medium
        whitespace-nowrap select-none
        ${sizeClass} ${colorClass} ${className}
      `,
      "data-ocid": `status-badge-${status.toLowerCase().replace(/\s+/g, "-")}`,
      children: status || "—"
    }
  );
}
export {
  StatusBadge as S
};
