// Re-export backend types and define frontend-specific types

export type {
  Lead,
  LeadId,
  Telecaller,
  CallHistory,
  SalesCallHistory,
  Project,
  Task,
  TaskId,
  SoftwareInquiry,
  ProjectInquiry,
  InquiryId,
  ColumnDef,
  StatusDates,
  DateStr,
} from "../backend";

// ---- Frontend-specific types ----

export type Role = "telecaller" | "sales" | "admin";
export type ViewMode = "mobile" | "desktop";

export interface AuthSession {
  role: Role;
  username: string;
  projectFilter: string;
  viewMode: ViewMode;
}

// Lead status constants
export const LEAD_STATUSES = [
  "New",
  "Not Connect",
  "Share Brochure",
  "Follow-up",
  "SV Plan",
  "SV Done",
  "Qualified1",
  "Lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const SV_STATUSES = [
  "Next Followup",
  "SV Rescheduled",
  "Booking Done",
  "Registration Done",
  "Lead Close",
] as const;

export type SVStatus = (typeof SV_STATUSES)[number];

export const REQUIREMENT_OPTIONS = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "SHOP",
] as const;

export const BUDGET_OPTIONS = [
  "30 Lacs",
  "30.1-40 Lacs",
  "40.1-50 Lacs",
  "50.1-60 Lacs",
  "60.1-70 Lacs",
  "70.1-80 Lacs",
  "80.1 to 1 Crore",
  "1 Cr to 1.5 Cr",
  "Above 1.5 Cr",
] as const;

export const TASK_STATUSES = ["Pending", "In Progress", "Completed"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

// Passwords
export const PASSWORDS: Record<Role, string> = {
  telecaller: "ReProj@713",
  sales: "ReSales@1",
  admin: "ReProj@1",
};

// Lead status colors for StatusBadge
export const STATUS_COLORS: Record<string, string> = {
  New: "bg-primary/10 text-primary border-primary/20",
  "Not Connect": "bg-destructive/10 text-destructive border-destructive/20",
  "Share Brochure": "bg-accent/20 text-accent-foreground border-accent/30",
  "Follow-up": "bg-blue-100 text-blue-700 border-blue-200",
  "SV Plan": "bg-purple-100 text-purple-700 border-purple-200",
  "SV Done": "bg-emerald-100 text-emerald-700 border-emerald-200",
  Qualified1: "bg-teal-100 text-teal-700 border-teal-200",
  Lost: "bg-muted text-muted-foreground border-border",
  // SV Statuses
  "Next Followup": "bg-accent/20 text-accent-foreground border-accent/30",
  "SV Rescheduled": "bg-amber-100 text-amber-700 border-amber-200",
  "Booking Done": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Registration Done": "bg-green-100 text-green-800 border-green-200",
  "Lead Close": "bg-muted text-muted-foreground border-border",
  // Task statuses
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};
