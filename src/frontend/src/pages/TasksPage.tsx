import { useAuth } from "../context/AuthContext";
import AdminTasksPage from "./AdminTasksPage";
import SalesTasksPage from "./SalesTasksPage";
import TelecallerTasksPage from "./TelecallerTasksPage";

export default function TasksPage() {
  const { session } = useAuth();
  const role = session?.role;

  if (role === "admin") return <AdminTasksPage />;
  if (role === "sales") return <SalesTasksPage />;
  return <TelecallerTasksPage />;
}
