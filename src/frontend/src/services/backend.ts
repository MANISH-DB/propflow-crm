/**
 * Service layer — typed wrappers around backend canister calls.
 * All methods accept/return frontend-friendly types.
 */
import type { backendInterface } from "../backend";
import type {
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
} from "../backend";

export type ActorType = backendInterface | null;

// ---- Leads ----

export async function svcGetAllLeads(actor: ActorType): Promise<Lead[]> {
  if (!actor) return [];
  return actor.getAllLeads();
}

export async function svcGetLeadsByTelecaller(
  actor: ActorType,
  telecaller: string
): Promise<Lead[]> {
  if (!actor) return [];
  return actor.getLeadsByTelecaller(telecaller);
}

export async function svcGetLeadsBySalesPerson(
  actor: ActorType,
  salesPerson: string
): Promise<Lead[]> {
  if (!actor) return [];
  return actor.getLeadsBySalesPerson(salesPerson);
}

export async function svcGetLeadById(
  actor: ActorType,
  id: LeadId
): Promise<Lead | null> {
  if (!actor) return null;
  return actor.getLeadById(id);
}

export async function svcAddLead(actor: ActorType, lead: Lead): Promise<Lead> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addLead(lead);
}

export async function svcUpdateLead(actor: ActorType, lead: Lead): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.updateLead(lead);
}

export async function svcDeleteLead(actor: ActorType, id: LeadId): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.deleteLead(id);
}

export async function svcGetLeadSchema(actor: ActorType): Promise<ColumnDef[]> {
  if (!actor) return [];
  return actor.getLeadSchema();
}

export async function svcUpsertColumnDef(
  actor: ActorType,
  col: ColumnDef
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  return actor.upsertColumnDef(col);
}

export async function svcRemoveColumnDef(
  actor: ActorType,
  key: string
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.removeColumnDef(key);
}

// ---- Projects ----

export async function svcGetAllProjects(actor: ActorType): Promise<Project[]> {
  if (!actor) return [];
  return actor.getAllProjects();
}

export async function svcGetUniqueProjectNames(actor: ActorType): Promise<string[]> {
  if (!actor) return [];
  return actor.getUniqueProjectNames();
}

export async function svcGetBrochureLink(
  actor: ActorType,
  projectName: string
): Promise<string | null> {
  if (!actor) return null;
  return actor.getBrochureLink(projectName);
}

export async function svcAddProject(
  actor: ActorType,
  project: Project
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addProject(project);
}

export async function svcUpdateProject(
  actor: ActorType,
  name: string,
  updated: Project
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.updateProject(name, updated);
}

export async function svcDeleteProject(
  actor: ActorType,
  name: string
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.deleteProject(name);
}

// ---- Telecallers ----

export async function svcGetAllTelecallers(
  actor: ActorType
): Promise<Telecaller[]> {
  if (!actor) return [];
  return actor.getAllTelecallers();
}

export async function svcGetUniqueTelecallers(
  actor: ActorType
): Promise<string[]> {
  if (!actor) return [];
  return actor.getUniqueTelecallers();
}

export async function svcGetUniqueSalesPersons(
  actor: ActorType
): Promise<string[]> {
  if (!actor) return [];
  return actor.getUniqueSalesPersons();
}

export async function svcAddTelecaller(
  actor: ActorType,
  t: Telecaller
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addTelecaller(t);
}

export async function svcUpdateTelecaller(
  actor: ActorType,
  name: string,
  updated: Telecaller
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.updateTelecaller(name, updated);
}

export async function svcDeleteTelecaller(
  actor: ActorType,
  name: string
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.deleteTelecaller(name);
}

// ---- Call History ----

export async function svcGetCallHistory(
  actor: ActorType,
  telecaller: string | null
): Promise<CallHistory[]> {
  if (!actor) return [];
  return actor.getCallHistory(telecaller);
}

export async function svcAddCallHistory(
  actor: ActorType,
  entry: CallHistory
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addCallHistory(entry);
}

export async function svcGetSalesCallHistory(
  actor: ActorType,
  salesPerson: string | null
): Promise<SalesCallHistory[]> {
  if (!actor) return [];
  return actor.getSalesCallHistory(salesPerson);
}

export async function svcAddSalesCallHistory(
  actor: ActorType,
  entry: SalesCallHistory
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addSalesCallHistory(entry);
}

// ---- Tasks ----

export async function svcGetAllTasks(actor: ActorType): Promise<Task[]> {
  if (!actor) return [];
  return actor.getAllTasks();
}

export async function svcGetTasksByAssignee(
  actor: ActorType,
  assignedTo: string
): Promise<Task[]> {
  if (!actor) return [];
  return actor.getTasksByAssignee(assignedTo);
}

export async function svcGetTaskById(
  actor: ActorType,
  taskId: TaskId
): Promise<Task | null> {
  if (!actor) return null;
  return actor.getTaskById(taskId);
}

export async function svcAddTask(actor: ActorType, task: Task): Promise<Task> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addTask(task);
}

export async function svcUpdateTask(actor: ActorType, task: Task): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.updateTask(task);
}

export async function svcUpdateTaskStatus(
  actor: ActorType,
  taskId: TaskId,
  status: string
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.updateTaskStatus(taskId, status);
}

export async function svcDeleteTask(
  actor: ActorType,
  taskId: TaskId
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.deleteTask(taskId);
}

// ---- Inquiries ----

export async function svcGetAllSoftwareInquiries(
  actor: ActorType
): Promise<SoftwareInquiry[]> {
  if (!actor) return [];
  return actor.getAllSoftwareInquiries();
}

export async function svcAddSoftwareInquiry(
  actor: ActorType,
  inquiry: SoftwareInquiry
): Promise<void> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addSoftwareInquiry(inquiry);
}

export async function svcGetAllProjectInquiries(
  actor: ActorType
): Promise<ProjectInquiry[]> {
  if (!actor) return [];
  return actor.getAllProjectInquiries();
}

export async function svcAddProjectInquiry(
  actor: ActorType,
  inquiry: ProjectInquiry
): Promise<ProjectInquiry> {
  if (!actor) throw new Error("Actor not ready");
  return actor.addProjectInquiry(inquiry);
}

export async function svcDeleteProjectInquiry(
  actor: ActorType,
  id: InquiryId
): Promise<boolean> {
  if (!actor) throw new Error("Actor not ready");
  return actor.deleteProjectInquiry(id);
}
