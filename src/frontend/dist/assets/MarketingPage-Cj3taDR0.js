import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-BYjlLTrJ.js";
import { u as useUniqueProjectNames, e as useAddProjectInquiry, f as useAddSoftwareInquiry } from "./useProjects-DYXnZIVc.js";
import { X, d as toInputDate, f as fromInputDate, P as Phone } from "./dateUtils-CEWG1Xtm.js";
import { c as createLucideIcon, B as Building2 } from "./useBackendActor-CDUnFUXW.js";
import { C as CircleCheck } from "./circle-check-DyAcnbJK.js";
import { C as Calendar } from "./calendar-6xntBkJe.js";
import { U as Users } from "./users-8IJymAeF.js";
import { M as MessageCircle } from "./message-circle-CHSCirWY.js";
import { C as ChartColumn } from "./chart-column-DnJLxgFx.js";
import { T as TrendingUp } from "./trending-up-zWv_5U-U.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8", key: "10dyio" }],
  ["path", { d: "M10 19v-3.96 3.15", key: "1irgej" }],
  ["path", { d: "M7 19h5", key: "qswx4l" }],
  ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2", key: "1egngj" }]
];
const MonitorSmartphone = createLucideIcon("monitor-smartphone", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function ProjectInquiryModal({ onClose }) {
  const { data: projectNames = [] } = useUniqueProjectNames();
  const addInquiry = useAddProjectInquiry();
  const [name, setName] = reactExports.useState("");
  const [mobile, setMobile] = reactExports.useState("");
  const [projectName, setProjectName] = reactExports.useState("");
  const [svDate, setSvDate] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!mobile.trim() || !/^\d{7,15}$/.test(mobile.trim())) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (!projectName) {
      setError("Please select a project.");
      return;
    }
    const inquiry = {
      id: BigInt(0),
      srNo: BigInt(0),
      name: name.trim(),
      mobile: mobile.trim(),
      projectName,
      svPlan: svDate ? fromInputDate(svDate) : "",
      source: "Web"
    };
    try {
      await addInquiry.mutateAsync(inquiry);
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    }
  }
  return (
    /* Backdrop */
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm",
        "data-ocid": "modal-project-inquiry",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              role: "button",
              tabIndex: -1,
              "aria-label": "Close modal",
              className: "absolute inset-0",
              onClick: onClose,
              onKeyDown: (e) => {
                if (e.key === "Escape") onClose();
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between px-6 py-4 bg-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 20, className: "text-primary-foreground/80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-primary-foreground text-base", children: "Project Inquiry" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/60 text-xs font-body mt-0.5", children: "Interested in a property? Fill this form." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "btn-close-inquiry-modal",
                  className: "p-1 rounded-lg text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: submitted ? (
              /* Success */
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-4 py-4 text-center",
                  "data-ocid": "inquiry-project-success",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        size: 48,
                        className: "text-emerald-500",
                        strokeWidth: 1.5
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Inquiry Submitted!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body text-sm mt-1", children: [
                        "Thank you,",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: name }),
                        ". We'll reach out to you on",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: mobile }),
                        " ",
                        "soon."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        className: "mt-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-primary/90 transition-smooth",
                        children: "Close"
                      }
                    )
                  ]
                }
              )
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "pi-name",
                    className: "block text-sm font-body font-medium text-foreground mb-1.5",
                    children: [
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pi-name",
                    type: "text",
                    "data-ocid": "input-pi-name",
                    placeholder: "Your full name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    className: "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "pi-mobile",
                    className: "block text-sm font-body font-medium text-foreground mb-1.5",
                    children: [
                      "Mobile Number ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pi-mobile",
                    type: "tel",
                    "data-ocid": "input-pi-mobile",
                    placeholder: "Your mobile number",
                    value: mobile,
                    onChange: (e) => setMobile(e.target.value.replace(/\D/g, "")),
                    className: "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    maxLength: 15
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "pi-project",
                    className: "block text-sm font-body font-medium text-foreground mb-1.5",
                    children: [
                      "Project Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "pi-project",
                    "data-ocid": "select-pi-project",
                    value: projectName,
                    onChange: (e) => setProjectName(e.target.value),
                    className: "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a project…" }),
                      projectNames.map((pn) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: pn, children: pn }, pn))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "pi-sv-date",
                    className: "block text-sm font-body font-medium text-foreground mb-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "inline mr-1" }),
                      "Site Visit Plan Date",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "pi-sv-date",
                    type: "date",
                    "data-ocid": "input-pi-sv-date",
                    value: svDate,
                    min: toInputDate(/* @__PURE__ */ new Date()),
                    onChange: (e) => setSvDate(e.target.value),
                    className: "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-sm font-body",
                  "data-ocid": "pi-error",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground font-body text-sm hover:bg-muted transition-smooth",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    "data-ocid": "btn-pi-submit",
                    disabled: addInquiry.isPending,
                    className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed shadow-sm",
                    children: addInquiry.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full" }) : "Submit Inquiry"
                  }
                )
              ] })
            ] }) })
          ] })
        ]
      }
    )
  );
}
function SoftwareInquiryModal({ onClose }) {
  const addInquiry = useAddSoftwareInquiry();
  const [name, setName] = reactExports.useState("");
  const [mobile, setMobile] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!mobile.trim() || !/^\d{7,15}$/.test(mobile.trim())) {
      setError("Please enter a valid mobile number (7-15 digits).");
      return;
    }
    try {
      await addInquiry.mutateAsync({
        name: name.trim(),
        mobile: mobile.trim()
      });
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm",
      "data-ocid": "modal-software-inquiry",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "button",
            tabIndex: -1,
            "aria-label": "Close modal",
            className: "absolute inset-0",
            onClick: onClose,
            onKeyDown: (e) => {
              if (e.key === "Escape") onClose();
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between px-6 py-4 bg-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-primary-foreground text-base", children: "Software Inquiry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/60 text-xs font-body mt-0.5", children: "Interested in PropFlow CRM? Contact us!" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "data-ocid": "btn-close-sw-modal",
                className: "p-1 rounded-lg text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth",
                "aria-label": "Close modal",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-4 py-4 text-center",
              "data-ocid": "sw-inquiry-success",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    size: 48,
                    className: "text-emerald-500",
                    strokeWidth: 1.5
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "Dhanyavaad!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: "Hamari team aapko jald hi contact karegi." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "mt-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-primary/90 transition-smooth",
                    children: "Close"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "sw-name",
                  className: "block text-sm font-body font-medium text-foreground mb-1.5",
                  children: [
                    "Full Name ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "sw-name",
                  type: "text",
                  "data-ocid": "input-sw-name",
                  placeholder: "Your full name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "sw-mobile",
                  className: "block text-sm font-body font-medium text-foreground mb-1.5",
                  children: [
                    "Mobile Number ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "sw-mobile",
                  type: "tel",
                  "data-ocid": "input-sw-mobile",
                  placeholder: "Your mobile number",
                  value: mobile,
                  onChange: (e) => setMobile(e.target.value.replace(/\D/g, "")),
                  className: "w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                  maxLength: 15
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-sm font-body",
                "data-ocid": "sw-error",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground font-body text-sm hover:bg-muted transition-smooth",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  "data-ocid": "btn-sw-submit",
                  disabled: addInquiry.isPending,
                  className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed shadow-sm",
                  children: addInquiry.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full" }) : "Submit"
                }
              )
            ] })
          ] }) })
        ] })
      ]
    }
  );
}
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 22 }),
    title: "Smart Lead Management",
    desc: "Track every lead from first call to final booking. Status dates, remarks, and full history — nothing slips through.",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconColor: "text-blue-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 22 }),
    title: "Role-Based Access",
    desc: "Separate dashboards for Telecaller, Sales Person, and Admin. Each role sees exactly what they need.",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/30",
    iconColor: "text-violet-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 22 }),
    title: "Real-Time Call Logs",
    desc: "Every call tracked with date, status, and remark. All Call Log, Today Call Log, and live count at a glance.",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
    iconColor: "text-cyan-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 22 }),
    title: "WhatsApp Integration",
    desc: "Send project brochures directly from any lead card. One-click WhatsApp message with pre-filled content.",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    iconColor: "text-emerald-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 22 }),
    title: "Advanced Reports",
    desc: "Telecaller performance, project summary, lead aging, monthly trends, conversion funnel — all in one dashboard.",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    iconColor: "text-amber-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorSmartphone, { size: 22 }),
    title: "Mobile Optimized",
    desc: "Switch between mobile card view and desktop table view. Works perfectly on phones, tablets, and desktops.",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/30",
    iconColor: "text-rose-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 22 }),
    title: "Lightning Fast Search",
    desc: "Filter by name, mobile, remark, status date in milliseconds. In-memory filtering with live result counts.",
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
    iconColor: "text-yellow-400"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 22 }),
    title: "Site Visit Tracking",
    desc: "Complete SV pipeline: Plan → Rescheduled → Done → Booking → Registration. Never miss a site visit.",
    color: "from-teal-500/20 to-teal-600/10 border-teal-500/30",
    iconColor: "text-teal-400"
  }
];
const STATS = [
  { value: "100%", label: "Lead Visibility" },
  { value: "3x", label: "Faster Follow-ups" },
  { value: "Zero", label: "Lead Slippage" },
  { value: "Real-time", label: "Call Tracking" }
];
const TESTIMONIALS = [
  {
    text: "PropFlow completely transformed how our telecallers manage leads. Every follow-up is tracked, nothing is missed.",
    author: "Rajesh Kumar",
    role: "Sales Manager"
  },
  {
    text: "The site visit pipeline is brilliant. We can see exactly where every lead is in the buying journey.",
    author: "Priya Sharma",
    role: "Real Estate Director"
  },
  {
    text: "Admin reports give me instant visibility into team performance. The WhatsApp brochure feature is a game changer.",
    author: "Amit Patel",
    role: "Business Owner"
  }
];
function MarketingPage() {
  const navigate = useNavigate();
  const featuresRef = reactExports.useRef(null);
  const [showSWInquiry, setShowSWInquiry] = reactExports.useState(false);
  const [showPIInquiry, setShowPIInquiry] = reactExports.useState(false);
  function scrollToFeatures() {
    var _a;
    (_a = featuresRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col marketing-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 marketing-nav border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl marketing-logo-bg flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 16, className: "text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-white text-lg tracking-tight", children: "PropFlow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: scrollToFeatures,
            className: "text-white/70 hover:text-white text-sm font-body transition-colors hidden sm:block",
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowSWInquiry(true),
            "data-ocid": "btn-nav-sw-inquiry",
            className: "text-white/70 hover:text-white text-sm font-body transition-colors hidden sm:block",
            children: "Contact"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/login" }),
            "data-ocid": "btn-nav-login",
            className: "flex items-center gap-1.5 px-4 py-2 rounded-xl marketing-cta-btn text-white text-sm font-body font-semibold transition-smooth shadow-md",
            children: [
              "Login",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/propflow-hero.dim_1200x600.jpg",
            alt: "PropFlow CRM visualization",
            className: "w-full h-full object-cover opacity-25"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 marketing-hero-overlay" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 marketing-orb-1 rounded-full blur-3xl opacity-20 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute bottom-1/4 right-1/4 w-80 h-80 marketing-orb-2 rounded-full blur-3xl opacity-15 animate-pulse",
          style: { animationDelay: "1s" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center max-w-5xl mx-auto px-6 py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full marketing-badge border border-white/20 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: "text-amber-400 fill-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 text-xs font-body tracking-wide", children: "India's Smartest Real Estate CRM" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black leading-none mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "block text-white",
              style: { fontSize: "clamp(48px,8vw,88px)" },
              children: "Close More Deals."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "block marketing-orange-text",
              style: { fontSize: "clamp(48px,8vw,88px)" },
              children: "Zero Lead Slippage."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-lg font-body max-w-2xl mx-auto mb-10 leading-relaxed", children: "PropFlow CRM helps real estate teams manage every lead, telecaller, site visit and follow-up — from first call to booking done." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/login" }),
              "data-ocid": "btn-hero-open-crm",
              className: "flex items-center gap-2 px-8 py-4 rounded-2xl marketing-btn-primary text-white font-display font-bold text-base transition-smooth shadow-xl hover:-translate-y-0.5",
              children: [
                "Open CRM Dashboard",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: scrollToFeatures,
              "data-ocid": "btn-hero-see-features",
              className: "flex items-center gap-2 px-8 py-4 rounded-2xl marketing-btn-ghost text-white font-display font-semibold text-base transition-smooth border border-white/30 hover:border-white/60 hover:bg-white/10",
              children: "See Features"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto", children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center p-4 rounded-xl marketing-stat-card border border-white/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl text-white leading-none", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs font-body mt-1", children: stat.label })
            ]
          },
          stat.label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-2.5 rounded-full bg-white/50" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        ref: featuresRef,
        id: "features",
        className: "py-24 px-6 marketing-features-bg",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-body", children: "Everything you need" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-4xl sm:text-5xl text-white mb-4", children: "Why PropFlow?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-base font-body max-w-xl mx-auto", children: "Built specifically for Indian real estate teams. Every feature designed to close more deals, faster." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: FEATURES.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `p-5 rounded-2xl border bg-gradient-to-br transition-smooth hover:-translate-y-1 hover:shadow-xl ${feature.color}`,
              "data-ocid": `feature-card-${feature.title.toLowerCase().replace(/\s+/g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${feature.iconColor}`,
                    children: feature.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-white text-sm mb-2", children: feature.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-xs font-body leading-relaxed", children: feature.desc })
              ]
            },
            feature.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 marketing-testimonials-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl text-white mb-3", children: "Trusted by Real Estate Teams" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm font-body", children: "Join hundreds of teams closing deals with PropFlow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-5", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-6 rounded-2xl marketing-testimonial-card border border-white/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: 13,
                className: "text-amber-400 fill-amber-400"
              },
              s
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-sm font-body leading-relaxed mb-4", children: [
              '"',
              t.text,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-display font-semibold text-sm", children: t.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-body", children: t.role })
            ] })
          ]
        },
        t.author
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "inquiry",
        className: "py-20 px-6 marketing-inquiry-bg",
        "data-ocid": "inquiry-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-4xl text-white mb-4", children: "Get Started Today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-base font-body mb-12", children: "Whether you're interested in our software or one of our featured projects, we're here to help." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl marketing-inquiry-card border border-white/10 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 20, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-white text-xl mb-2", children: "Adopt PropFlow CRM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-sm font-body mb-6 leading-relaxed", children: "Transform your real estate team with world-class lead management. Get a free demo today." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowSWInquiry(true),
                  "data-ocid": "btn-sw-inquiry-open",
                  className: "flex items-center gap-2 px-6 py-3 rounded-xl marketing-btn-primary text-white font-body font-semibold text-sm transition-smooth shadow-md hover:-translate-y-0.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
                    "Software Inquiry"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-2xl marketing-inquiry-card border border-white/10 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 20, className: "text-amber-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-white text-xl mb-2", children: "Explore Our Projects" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-sm font-body mb-6 leading-relaxed", children: "Interested in buying a property? Browse our projects and book a site visit with our team." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPIInquiry(true),
                  "data-ocid": "btn-pi-inquiry-open",
                  className: "flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-body font-semibold text-sm transition-smooth hover:bg-amber-500/30 hover:-translate-y-0.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14 }),
                    "Project Inquiry"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-10 px-6 marketing-footer-bg border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-xl marketing-logo-bg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 13, className: "text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-white/80 text-sm", children: "PropFlow CRM" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/35 text-xs font-body text-center", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-white/55 hover:text-white/80 underline transition-colors",
            children: "caffeine.ai"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs font-body text-white/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/login" }),
            className: "hover:text-white/70 transition-colors",
            children: "Login"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowSWInquiry(true),
            className: "hover:text-white/70 transition-colors",
            children: "Contact"
          }
        )
      ] })
    ] }) }),
    showSWInquiry && /* @__PURE__ */ jsxRuntimeExports.jsx(SoftwareInquiryModal, { onClose: () => setShowSWInquiry(false) }),
    showPIInquiry && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectInquiryModal, { onClose: () => setShowPIInquiry(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .marketing-page {
          background: oklch(0.12 0.04 255);
        }
        .marketing-nav {
          background: oklch(0.12 0.04 255 / 0.85);
          backdrop-filter: blur(16px);
        }
        .marketing-logo-bg {
          background: linear-gradient(135deg, oklch(0.35 0.20 260), oklch(0.42 0.22 255));
        }
        .marketing-hero-overlay {
          background: linear-gradient(
            to bottom,
            oklch(0.12 0.04 255 / 0.7) 0%,
            oklch(0.12 0.04 255 / 0.5) 50%,
            oklch(0.12 0.04 255 / 0.9) 100%
          );
        }
        .marketing-orb-1 {
          background: oklch(0.45 0.22 260);
        }
        .marketing-orb-2 {
          background: oklch(0.65 0.20 70);
        }
        .marketing-badge {
          background: oklch(0.20 0.06 255 / 0.8);
        }
        .marketing-orange-text {
          background: linear-gradient(135deg, oklch(0.72 0.20 55) 0%, oklch(0.80 0.18 70) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .marketing-btn-primary {
          background: linear-gradient(135deg, oklch(0.35 0.20 260) 0%, oklch(0.42 0.22 255) 100%);
          box-shadow: 0 4px 24px oklch(0.35 0.20 260 / 0.5);
        }
        .marketing-btn-primary:hover {
          background: linear-gradient(135deg, oklch(0.40 0.22 260) 0%, oklch(0.47 0.24 255) 100%);
          box-shadow: 0 6px 32px oklch(0.35 0.20 260 / 0.6);
        }
        .marketing-btn-ghost {
          background: transparent;
        }
        .marketing-cta-btn {
          background: linear-gradient(135deg, oklch(0.35 0.20 260), oklch(0.42 0.22 255));
        }
        .marketing-cta-btn:hover {
          filter: brightness(1.1);
        }
        .marketing-stat-card {
          background: oklch(0.18 0.06 255 / 0.6);
          backdrop-filter: blur(8px);
        }
        .marketing-features-bg {
          background: oklch(0.15 0.05 258);
        }
        .marketing-testimonials-bg {
          background: oklch(0.12 0.04 255);
        }
        .marketing-testimonial-card {
          background: oklch(0.18 0.06 255 / 0.7);
          backdrop-filter: blur(8px);
        }
        .marketing-inquiry-bg {
          background: linear-gradient(
            135deg,
            oklch(0.17 0.06 260) 0%,
            oklch(0.13 0.04 258) 100%
          );
        }
        .marketing-inquiry-card {
          background: oklch(0.20 0.06 255 / 0.6);
          backdrop-filter: blur(12px);
        }
        .marketing-footer-bg {
          background: oklch(0.10 0.03 255);
        }
      ` })
  ] });
}
export {
  MarketingPage as default
};
