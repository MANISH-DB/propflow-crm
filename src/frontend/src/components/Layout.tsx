import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  ClipboardList,
  Eye,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  RefreshCw,
  Smartphone,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    to: "/telecaller",
    icon: <LayoutDashboard size={16} />,
    roles: ["telecaller"],
  },
  {
    label: "Dashboard",
    to: "/sales",
    icon: <LayoutDashboard size={16} />,
    roles: ["sales"],
  },
  {
    label: "Dashboard",
    to: "/admin",
    icon: <LayoutDashboard size={16} />,
    roles: ["admin"],
  },
  {
    label: "My Call Log",
    to: "/call-log",
    icon: <Phone size={16} />,
    roles: ["telecaller", "sales"],
  },
  {
    label: "Call Log",
    to: "/call-log",
    icon: <Phone size={16} />,
    roles: ["admin"],
  },
  {
    label: "My Tasks",
    to: "/tasks",
    icon: <ClipboardList size={16} />,
    roles: ["telecaller", "sales"],
  },
  {
    label: "Manage Tasks",
    to: "/tasks",
    icon: <ClipboardList size={16} />,
    roles: ["admin"],
  },
  {
    label: "Reports",
    to: "/admin/reports",
    icon: <BarChart3 size={16} />,
    roles: ["admin"],
  },
  {
    label: "SV Overview",
    to: "/admin/sv-overview",
    icon: <Building2 size={16} />,
    roles: ["admin"],
  },
];

interface LayoutProps {
  children: ReactNode;
  title?: string;
  headerRight?: ReactNode;
}

// PropFlow Logo
function PropFlowLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
          <span className="text-primary font-display font-bold text-sm leading-none">
            PF
          </span>
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-sidebar" />
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-sidebar-foreground text-base tracking-wide">
            PropFlow
          </span>
          <span className="text-sidebar-primary text-[10px] font-body tracking-widest uppercase">
            Real Estate CRM
          </span>
        </div>
      )}
    </div>
  );
}

export function Layout({ children, title, headerRight }: LayoutProps) {
  const { session, logout, setViewMode } = useAuth();
  const location = useLocation();
  const qc = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.role ?? "telecaller";
  const viewMode = session?.viewMode ?? "desktop";

  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(role));

  function handleRefresh() {
    qc.invalidateQueries();
  }

  function handleToggleView() {
    setViewMode(viewMode === "desktop" ? "mobile" : "desktop");
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  const roleLabel = {
    telecaller: "Telecaller",
    sales: "Sales Person",
    admin: "Admin",
  }[role];

  const roleBadgeClass = {
    telecaller: "bg-accent/20 text-accent-foreground border-accent/30",
    sales: "bg-primary/10 text-primary border-primary/20",
    admin: "bg-emerald-100 text-emerald-800 border-emerald-200",
  }[role];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-60 flex flex-col bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo area */}
        <div className="px-4 py-4 border-b border-sidebar-border">
          <PropFlowLogo />
          {session && (
            <div className="mt-2.5 flex flex-col gap-0.5">
              <span className="text-sidebar-foreground/80 text-xs font-body truncate max-w-full">
                {session.username}
              </span>
              {session.projectFilter &&
                session.projectFilter !== "All Projects" && (
                  <span className="text-sidebar-primary text-[11px] truncate max-w-full font-body">
                    {session.projectFilter}
                  </span>
                )}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">
          {visibleNav.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={`${item.to}-${item.label}`}
                to={item.to}
                onClick={closeMobile}
                className={`
                  flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-body
                  transition-smooth cursor-pointer
                  ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
                data-ocid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: role badge + logout */}
        <div className="px-3 py-3 border-t border-sidebar-border space-y-2">
          <div
            className={`px-2 py-1 rounded border text-[11px] font-body font-medium text-center ${roleBadgeClass}`}
          >
            {roleLabel}
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-smooth"
            data-ocid="nav-logout"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={closeMobile}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") closeMobile();
          }}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 flex items-center gap-3 px-4 bg-card border-b border-border shadow-xs flex-shrink-0">
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-md hover:bg-muted transition-smooth"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            {title && (
              <h1 className="font-display font-semibold text-foreground text-base truncate">
                {title}
              </h1>
            )}
          </div>

          {/* Header right controls */}
          <div className="flex items-center gap-2">
            {headerRight}

            {/* View mode toggle */}
            <button
              type="button"
              onClick={handleToggleView}
              title={`Switch to ${viewMode === "desktop" ? "Mobile" : "Desktop"} view`}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-border bg-background hover:bg-muted text-muted-foreground text-xs font-body transition-smooth"
              data-ocid="toggle-view-mode"
            >
              {viewMode === "desktop" ? (
                <>
                  <Smartphone size={13} />
                  <span className="hidden sm:inline">Mobile</span>
                </>
              ) : (
                <>
                  <Eye size={13} />
                  <span className="hidden sm:inline">Desktop</span>
                </>
              )}
            </button>

            {/* Refresh button */}
            <button
              type="button"
              onClick={handleRefresh}
              title="Refresh data"
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
              data-ocid="btn-refresh"
            >
              <RefreshCw size={15} />
            </button>

            {/* User info (desktop) */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-border">
              <div className="flex flex-col items-end leading-none">
                <span className="text-xs font-body font-medium text-foreground">
                  {session?.username}
                </span>
                <span className="text-[10px] text-muted-foreground capitalize">
                  {session?.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}

// Export PropFlowLogo for use in Login page
export { PropFlowLogo };
