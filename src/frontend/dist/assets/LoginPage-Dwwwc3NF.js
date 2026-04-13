import { u as useNavigate, a as useAuth, r as reactExports, j as jsxRuntimeExports } from "./index-BYjlLTrJ.js";
import { u as useUniqueProjectNames } from "./useProjects-DYXnZIVc.js";
import { c as createLucideIcon, B as Building2 } from "./useBackendActor-CDUnFUXW.js";
import { E as Eye, S as Smartphone } from "./smartphone-CJQPGBQn.js";
import { C as ChevronDown } from "./chevron-down-DWmfF_uF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const ROLE_CONFIG = [
  {
    role: "telecaller",
    label: "Telecaller",
    icon: "📞",
    desc: "Manage leads & call logs"
  },
  {
    role: "sales",
    label: "Sales Person",
    icon: "🏡",
    desc: "Track site visits & bookings"
  },
  {
    role: "admin",
    label: "Admin",
    icon: "⚙️",
    desc: "Full access & reports"
  }
];
function LoginPage() {
  const navigate = useNavigate();
  const { login, session } = useAuth();
  const { data: projectNames = [], isLoading: projectsLoading } = useUniqueProjectNames();
  const [username, setUsername] = reactExports.useState("");
  const [selectedRole, setSelectedRole] = reactExports.useState("telecaller");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [selectedProject, setSelectedProject] = reactExports.useState("All Projects");
  const [viewMode, setViewMode] = reactExports.useState("desktop");
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (session) {
      const path = session.role === "admin" ? "/admin" : session.role === "sales" ? "/sales" : "/telecaller";
      navigate({ to: path });
    }
  }, [session, navigate]);
  function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = login(
        selectedRole,
        password,
        selectedProject,
        viewMode,
        username.trim() || void 0
      );
      if (!result.success) {
        setError(result.error ?? "Login failed.");
        setIsLoading(false);
        return;
      }
      const path = selectedRole === "admin" ? "/admin" : selectedRole === "sales" ? "/sales" : "/telecaller";
      navigate({ to: path });
    }, 400);
  }
  const allProjects = ["All Projects", ...projectNames];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8 login-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl login-blob-1 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl login-blob-2 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl login-blob-3 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/60 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full login-accent-bar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pt-8 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl login-logo-bg flex items-center justify-center mb-4 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-7 h-7 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold tracking-tight login-title-text leading-tight", children: "PropFlow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body login-subtitle-text mt-1 tracking-widest uppercase font-semibold", children: "Real Estate CRM" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "login-username",
                  className: "block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2",
                  children: "User Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "login-username",
                    type: "text",
                    value: username,
                    onChange: (e) => setUsername(e.target.value),
                    placeholder: "Enter your name",
                    autoComplete: "name",
                    "data-ocid": "username-input",
                    className: "w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-background/80 text-foreground font-body text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-smooth placeholder:text-muted-foreground/60"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2", children: "Select Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ROLE_CONFIG.map(({ role, label, icon, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelectedRole(role);
                    setError("");
                    setPassword("");
                  },
                  "data-ocid": `role-btn-${role}`,
                  className: [
                    "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-smooth cursor-pointer text-center",
                    selectedRole === role ? "login-role-active border-primary/80 shadow-md" : "border-border/60 bg-background/50 hover:border-primary/40 hover:bg-primary/5"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-display font-semibold leading-tight ${selectedRole === role ? "text-primary" : "text-foreground"}`,
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight hidden sm:block", children: desc })
                  ]
                },
                role
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "login-password",
                  className: "block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2",
                  children: "Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "login-password",
                    type: showPassword ? "text" : "password",
                    value: password,
                    onChange: (e) => {
                      setPassword(e.target.value);
                      setError("");
                    },
                    placeholder: "Enter your password",
                    autoComplete: "current-password",
                    "data-ocid": "password-input",
                    className: [
                      "w-full pl-10 pr-10 py-3 rounded-xl border bg-background/80 text-foreground font-body text-sm",
                      "outline-none focus:ring-2 transition-smooth placeholder:text-muted-foreground/60",
                      error ? "border-destructive/70 focus:ring-destructive/30" : "border-border/60 focus:border-primary/60 focus:ring-primary/30"
                    ].join(" ")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword((v) => !v),
                    "aria-label": showPassword ? "Hide password" : "Show password",
                    className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "mt-1.5 text-xs font-body text-destructive flex items-center gap-1.5",
                  "data-ocid": "login-error",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" }),
                    error
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "project-select",
                  className: "block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2",
                  children: "Select Project"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "project-select",
                    value: selectedProject,
                    onChange: (e) => setSelectedProject(e.target.value),
                    "data-ocid": "project-select",
                    disabled: projectsLoading,
                    className: "w-full pl-4 pr-9 py-3 rounded-xl border border-border/60 bg-background/80 text-foreground font-body text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-smooth disabled:opacity-60 cursor-pointer",
                    children: projectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All Projects", children: "Loading projects…" }) : allProjects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2", children: "View Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-xl border border-border/60 overflow-hidden bg-background/50", children: [
                {
                  mode: "mobile",
                  label: "Mobile View",
                  Icon: Smartphone
                },
                {
                  mode: "desktop",
                  label: "Desktop View",
                  Icon: Monitor
                }
              ].map(({ mode, label, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setViewMode(mode),
                  "data-ocid": `view-mode-${mode}`,
                  className: [
                    "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-display font-semibold transition-smooth",
                    viewMode === mode ? "login-view-active text-white" : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                    label
                  ]
                },
                mode
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading,
                "data-ocid": "login-submit",
                className: "w-full py-3.5 rounded-xl font-display font-bold text-sm tracking-wide login-btn-primary transition-smooth disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg mt-1",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" }),
                  "Signing in…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                  "Sign In to PropFlow"
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[11px] text-muted-foreground/60 font-body", children: [
          "Secure access · Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noreferrer",
              className: "hover:text-accent transition-colors underline underline-offset-2",
              children: "caffeine.ai"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs mt-4 font-body login-version-text", children: "PropFlow v1.0 · Real Estate CRM" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .login-bg {
          background: linear-gradient(
            135deg,
            oklch(0.22 0.06 260) 0%,
            oklch(0.18 0.05 250) 40%,
            oklch(0.14 0.04 270) 100%
          );
        }
        .login-blob-1 { background: oklch(0.45 0.18 260); }
        .login-blob-2 { background: oklch(0.68 0.18 70); }
        .login-blob-3 { background: oklch(0.55 0.15 240); }
        .login-accent-bar {
          background: linear-gradient(
            90deg,
            oklch(0.62 0.18 70) 0%,
            oklch(0.74 0.17 80) 50%,
            oklch(0.62 0.18 70) 100%
          );
        }
        .login-logo-bg {
          background: linear-gradient(135deg, oklch(0.32 0.18 260) 0%, oklch(0.40 0.20 255) 100%);
        }
        .login-title-text {
          background: linear-gradient(135deg, oklch(0.32 0.18 260) 0%, oklch(0.68 0.18 70) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .login-subtitle-text {
          color: oklch(0.60 0.12 70);
        }
        .login-role-active {
          background: linear-gradient(
            135deg,
            oklch(0.32 0.18 260 / 0.08) 0%,
            oklch(0.68 0.18 70 / 0.08) 100%
          );
        }
        .login-view-active {
          background: linear-gradient(135deg, oklch(0.32 0.18 260) 0%, oklch(0.38 0.20 255) 100%);
        }
        .login-btn-primary {
          background: linear-gradient(135deg, oklch(0.32 0.18 260) 0%, oklch(0.40 0.20 255) 100%);
          color: white;
          box-shadow: 0 4px 20px oklch(0.32 0.18 260 / 0.4);
        }
        .login-btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, oklch(0.36 0.20 260) 0%, oklch(0.44 0.22 255) 100%);
          box-shadow: 0 6px 28px oklch(0.32 0.18 260 / 0.5);
          transform: translateY(-1px);
        }
        .login-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .login-version-text {
          color: oklch(1.0 0.0 0 / 0.25);
        }
      ` })
  ] });
}
export {
  LoginPage as default
};
