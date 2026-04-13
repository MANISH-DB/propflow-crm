import { i as useRouterState, j as jsxRuntimeExports, a as useAuth, b as useQueryClient, r as reactExports, k as Link } from "./index-BYjlLTrJ.js";
import { c as createLucideIcon, B as Building2 } from "./useBackendActor-CDUnFUXW.js";
import { X, P as Phone } from "./dateUtils-CEWG1Xtm.js";
import { S as Smartphone, E as Eye } from "./smartphone-CJQPGBQn.js";
import { R as RefreshCw, C as ClipboardList } from "./refresh-cw-C5sG_0Bc.js";
import { C as ChartColumn } from "./chart-column-DnJLxgFx.js";
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode);
const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/telecaller",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 16 }),
    roles: ["telecaller"]
  },
  {
    label: "Dashboard",
    to: "/sales",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 16 }),
    roles: ["sales"]
  },
  {
    label: "Dashboard",
    to: "/admin",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 16 }),
    roles: ["admin"]
  },
  {
    label: "My Call Log",
    to: "/call-log",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
    roles: ["telecaller", "sales"]
  },
  {
    label: "Call Log",
    to: "/call-log",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
    roles: ["admin"]
  },
  {
    label: "My Tasks",
    to: "/tasks",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 16 }),
    roles: ["telecaller", "sales"]
  },
  {
    label: "Manage Tasks",
    to: "/tasks",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 16 }),
    roles: ["admin"]
  },
  {
    label: "Reports",
    to: "/admin/reports",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 16 }),
    roles: ["admin"]
  },
  {
    label: "SV Overview",
    to: "/admin/sv-overview",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 16 }),
    roles: ["admin"]
  }
];
function PropFlowLogo({ compact = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-bold text-sm leading-none", children: "PF" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-sidebar" })
    ] }),
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sidebar-foreground text-base tracking-wide", children: "PropFlow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sidebar-primary text-[10px] font-body tracking-widest uppercase", children: "Real Estate CRM" })
    ] })
  ] });
}
function Layout({ children, title, headerRight }) {
  const { session, logout, setViewMode } = useAuth();
  const location = useLocation();
  const qc = useQueryClient();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const role = (session == null ? void 0 : session.role) ?? "telecaller";
  const viewMode = (session == null ? void 0 : session.viewMode) ?? "desktop";
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
    admin: "Admin"
  }[role];
  const roleBadgeClass = {
    telecaller: "bg-accent/20 text-accent-foreground border-accent/30",
    sales: "bg-primary/10 text-primary border-primary/20",
    admin: "bg-emerald-100 text-emerald-800 border-emerald-200"
  }[role];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `
          fixed inset-y-0 left-0 z-50 w-60 flex flex-col bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 border-b border-sidebar-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PropFlowLogo, {}),
            session && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sidebar-foreground/80 text-xs font-body truncate max-w-full", children: session.username }),
              session.projectFilter && session.projectFilter !== "All Projects" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sidebar-primary text-[11px] truncate max-w-full font-body", children: session.projectFilter })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-2 py-3 overflow-y-auto space-y-0.5", children: visibleNav.map((item) => {
            const isActive = location.pathname === item.to;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                onClick: closeMobile,
                className: `
                  flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-body
                  transition-smooth cursor-pointer
                  ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}
                `,
                "data-ocid": `nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: item.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                ]
              },
              `${item.to}-${item.label}`
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 border-t border-sidebar-border space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `px-2 py-1 rounded border text-[11px] font-body font-medium text-center ${roleBadgeClass}`,
                children: roleLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: logout,
                className: "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-smooth",
                "data-ocid": "nav-logout",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 15 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
                ]
              }
            )
          ] })
        ]
      }
    ),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": "Close menu",
        className: "fixed inset-0 z-40 bg-foreground/30 lg:hidden",
        onClick: closeMobile,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") closeMobile();
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-14 flex items-center gap-3 px-4 bg-card border-b border-border shadow-xs flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "lg:hidden p-1.5 rounded-md hover:bg-muted transition-smooth",
            onClick: () => setMobileOpen((v) => !v),
            "aria-label": "Toggle menu",
            children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: title && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-semibold text-foreground text-base truncate", children: title }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          headerRight,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggleView,
              title: `Switch to ${viewMode === "desktop" ? "Mobile" : "Desktop"} view`,
              className: "flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-border bg-background hover:bg-muted text-muted-foreground text-xs font-body transition-smooth",
              "data-ocid": "toggle-view-mode",
              children: viewMode === "desktop" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 13 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Mobile" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Desktop" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              title: "Refresh data",
              className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth",
              "data-ocid": "btn-refresh",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-2 pl-2 border-l border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end leading-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-foreground", children: session == null ? void 0 : session.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground capitalize", children: session == null ? void 0 : session.role })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-background", children })
    ] })
  ] });
}
export {
  LogOut as L,
  PropFlowLogo as P,
  Layout as a
};
