import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";

// Lazy-loaded pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const TelecallerDashboard = lazy(() => import("./pages/TelecallerDashboard"));
const SalesDashboard = lazy(() => import("./pages/SalesDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminReports = lazy(() => import("./pages/AdminReports"));
const AdminSVOverview = lazy(() => import("./pages/AdminSVOverview"));
const CallLogPage = lazy(() => import("./pages/CallLogPage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));

// Loading fallback
function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center animate-pulse">
          <span className="text-primary font-display font-bold text-sm">
            PF
          </span>
        </div>
        <p className="text-muted-foreground text-sm font-body">
          Loading PropFlow…
        </p>
      </div>
    </div>
  );
}

// Helper: get session from sessionStorage (for route guards)
function getSession() {
  try {
    const raw = sessionStorage.getItem("propflow_session");
    if (!raw) return null;
    return JSON.parse(raw) as { role: string };
  } catch {
    return null;
  }
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MarketingPage />
    </Suspense>
  ),
});

const telecallerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/telecaller",
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "telecaller") throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TelecallerDashboard />
    </Suspense>
  ),
});

const salesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sales",
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "sales") throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SalesDashboard />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "admin") throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
});

const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reports",
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "admin") throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminReports />
    </Suspense>
  ),
});

const adminSVOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/sv-overview",
  validateSearch: (search: Record<string, unknown>) => ({
    svStatus: (search.svStatus as string) || "",
  }),
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "admin") throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminSVOverview />
    </Suspense>
  ),
});

const callLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/call-log",
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CallLogPage />
    </Suspense>
  ),
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tasks",
  beforeLoad: () => {
    const session = getSession();
    if (!session) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TasksPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  telecallerRoute,
  salesRoute,
  adminRoute,
  adminReportsRoute,
  adminSVOverviewRoute,
  callLogRoute,
  tasksRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
