import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Monitor,
  Smartphone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useUniqueProjectNames } from "../hooks/useProjects";
import type { Role, ViewMode } from "../types";

const ROLE_CONFIG = [
  {
    role: "telecaller" as Role,
    label: "Telecaller",
    icon: "📞",
    desc: "Manage leads & call logs",
  },
  {
    role: "sales" as Role,
    label: "Sales Person",
    icon: "🏡",
    desc: "Track site visits & bookings",
  },
  {
    role: "admin" as Role,
    label: "Admin",
    icon: "⚙️",
    desc: "Full access & reports",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, session } = useAuth();
  const { data: projectNames = [], isLoading: projectsLoading } =
    useUniqueProjectNames();

  const [username, setUsername] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("telecaller");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      const path =
        session.role === "admin"
          ? "/admin"
          : session.role === "sales"
            ? "/sales"
            : "/telecaller";
      navigate({ to: path });
    }
  }, [session, navigate]);

  function handleLogin(e: React.FormEvent) {
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
        username.trim() || undefined,
      );
      if (!result.success) {
        setError(result.error ?? "Login failed.");
        setIsLoading(false);
        return;
      }
      const path =
        selectedRole === "admin"
          ? "/admin"
          : selectedRole === "sales"
            ? "/sales"
            : "/telecaller";
      navigate({ to: path });
    }, 400);
  }

  const allProjects = ["All Projects", ...projectNames];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8 login-bg">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl login-blob-1 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl login-blob-2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl login-blob-3 pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md z-10">
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/60 overflow-hidden">
          {/* Gold top accent bar */}
          <div className="h-1 w-full login-accent-bar" />

          <div className="px-8 pt-8 pb-2">
            {/* Logo & Branding */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl login-logo-bg flex items-center justify-center mb-4 shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold tracking-tight login-title-text leading-tight">
                PropFlow
              </h1>
              <p className="text-xs font-body login-subtitle-text mt-1 tracking-widest uppercase font-semibold">
                Real Estate CRM
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* User Name */}
              <div>
                <label
                  htmlFor="login-username"
                  className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2"
                >
                  User Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    data-ocid="username-input"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-background/80 text-foreground font-body text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-smooth placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <p className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  Select Role
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {ROLE_CONFIG.map(({ role, label, icon, desc }) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role);
                        setError("");
                        setPassword("");
                      }}
                      data-ocid={`role-btn-${role}`}
                      className={[
                        "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-smooth cursor-pointer text-center",
                        selectedRole === role
                          ? "login-role-active border-primary/80 shadow-md"
                          : "border-border/60 bg-background/50 hover:border-primary/40 hover:bg-primary/5",
                      ].join(" ")}
                    >
                      <span className="text-xl leading-none">{icon}</span>
                      <span
                        className={`text-xs font-display font-semibold leading-tight ${selectedRole === role ? "text-primary" : "text-foreground"}`}
                      >
                        {label}
                      </span>
                      <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                        {desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    data-ocid="password-input"
                    className={[
                      "w-full pl-10 pr-10 py-3 rounded-xl border bg-background/80 text-foreground font-body text-sm",
                      "outline-none focus:ring-2 transition-smooth placeholder:text-muted-foreground/60",
                      error
                        ? "border-destructive/70 focus:ring-destructive/30"
                        : "border-border/60 focus:border-primary/60 focus:ring-primary/30",
                    ].join(" ")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p
                    className="mt-1.5 text-xs font-body text-destructive flex items-center gap-1.5"
                    data-ocid="login-error"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                    {error}
                  </p>
                )}
              </div>

              {/* Select Project */}
              <div>
                <label
                  htmlFor="project-select"
                  className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2"
                >
                  Select Project
                </label>
                <div className="relative">
                  <select
                    id="project-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    data-ocid="project-select"
                    disabled={projectsLoading}
                    className="w-full pl-4 pr-9 py-3 rounded-xl border border-border/60 bg-background/80 text-foreground font-body text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-smooth disabled:opacity-60 cursor-pointer"
                  >
                    {projectsLoading ? (
                      <option value="All Projects">Loading projects…</option>
                    ) : (
                      allProjects.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* View Mode */}
              <div>
                <p className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  View Mode
                </p>
                <div className="flex rounded-xl border border-border/60 overflow-hidden bg-background/50">
                  {(
                    [
                      {
                        mode: "mobile" as ViewMode,
                        label: "Mobile View",
                        Icon: Smartphone,
                      },
                      {
                        mode: "desktop" as ViewMode,
                        label: "Desktop View",
                        Icon: Monitor,
                      },
                    ] as const
                  ).map(({ mode, label, Icon }) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setViewMode(mode)}
                      data-ocid={`view-mode-${mode}`}
                      className={[
                        "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-display font-semibold transition-smooth",
                        viewMode === mode
                          ? "login-view-active text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                      ].join(" ")}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                data-ocid="login-submit"
                className="w-full py-3.5 rounded-xl font-display font-bold text-sm tracking-wide login-btn-primary transition-smooth disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg mt-1"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign In to PropFlow
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-5">
            <p className="text-center text-[11px] text-muted-foreground/60 font-body">
              Secure access · Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-4 font-body login-version-text">
          PropFlow v1.0 · Real Estate CRM
        </p>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
