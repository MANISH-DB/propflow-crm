import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProjectInquiry {
    id: InquiryId;
    svPlan: DateStr;
    projectName: string;
    source: string;
    name: string;
    srNo: bigint;
    mobile: string;
}
export type LeadId = bigint;
export interface Task {
    status: string;
    assignedTo: string;
    createdBy: string;
    role: string;
    createdDate: DateStr;
    dueDate: DateStr;
    taskTitle: string;
    description: string;
    taskId: TaskId;
    leadSr: bigint;
}
export interface ColumnDef {
    key: string;
    sortOrder: bigint;
    colLabel: string;
    visible: boolean;
    colType: string;
    options: Array<string>;
}
export interface SalesCallHistory {
    remark: string;
    status: string;
    projectName: string;
    date: DateStr;
    name: string;
    salesPerson: string;
    mobile: string;
}
export type StatusDates = Array<[string, DateStr]>;
export interface Lead {
    id: LeadId;
    leadDate: DateStr;
    svRemark: string;
    svStatus: string;
    projectName: string;
    lossReason: string;
    source: string;
    statusDates: StatusDates;
    srNo: bigint;
    mobileNo: string;
    leadCloseStatus: string;
    svNextFollowup: DateStr;
    requirement: string;
    assignedSales: string;
    remarks1: string;
    remarks2: string;
    telecaller: string;
    statusDate: DateStr;
    latestStatus: string;
    latestStatusDate: DateStr;
    budget: string;
    lastName: string;
    firstName: string;
}
export type InquiryId = bigint;
export type TaskId = bigint;
export interface Telecaller {
    name: string;
    role: string;
}
export interface SoftwareInquiry {
    name: string;
    mobile: string;
}
export interface Project {
    brochure: string;
    projectName: string;
}
export interface CallHistory {
    remark: string;
    status: string;
    projectName: string;
    date: DateStr;
    name: string;
    telecaller: string;
    mobile: string;
}
export type DateStr = string;
export interface backendInterface {
    addCallHistory(entry: CallHistory): Promise<void>;
    addLead(lead: Lead): Promise<Lead>;
    addProject(project: Project): Promise<void>;
    addProjectInquiry(inquiry: ProjectInquiry): Promise<ProjectInquiry>;
    addSalesCallHistory(entry: SalesCallHistory): Promise<void>;
    addSoftwareInquiry(inquiry: SoftwareInquiry): Promise<void>;
    addTask(task: Task): Promise<Task>;
    addTelecaller(t: Telecaller): Promise<void>;
    deleteLead(id: LeadId): Promise<boolean>;
    deleteProject(name: string): Promise<boolean>;
    deleteProjectInquiry(id: InquiryId): Promise<boolean>;
    deleteTask(taskId: TaskId): Promise<boolean>;
    deleteTelecaller(name: string): Promise<boolean>;
    getAllLeads(): Promise<Array<Lead>>;
    getAllProjectInquiries(): Promise<Array<ProjectInquiry>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllSoftwareInquiries(): Promise<Array<SoftwareInquiry>>;
    getAllTasks(): Promise<Array<Task>>;
    getAllTelecallers(): Promise<Array<Telecaller>>;
    getBrochureLink(projectName: string): Promise<string | null>;
    getCallHistory(telecaller: string | null): Promise<Array<CallHistory>>;
    getLeadById(id: LeadId): Promise<Lead | null>;
    getLeadSchema(): Promise<Array<ColumnDef>>;
    getLeadsBySalesPerson(salesPerson: string): Promise<Array<Lead>>;
    getLeadsByTelecaller(telecaller: string): Promise<Array<Lead>>;
    getSalesCallHistory(salesPerson: string | null): Promise<Array<SalesCallHistory>>;
    getTaskById(taskId: TaskId): Promise<Task | null>;
    getTasksByAssignee(assignedTo: string): Promise<Array<Task>>;
    getUniqueProjectNames(): Promise<Array<string>>;
    getUniqueSalesPersons(): Promise<Array<string>>;
    getUniqueTelecallers(): Promise<Array<string>>;
    removeColumnDef(key: string): Promise<boolean>;
    updateLead(lead: Lead): Promise<boolean>;
    updateProject(name: string, updated: Project): Promise<boolean>;
    updateTask(task: Task): Promise<boolean>;
    updateTaskStatus(taskId: TaskId, status: string): Promise<boolean>;
    updateTelecaller(name: string, updated: Telecaller): Promise<boolean>;
    upsertColumnDef(col: ColumnDef): Promise<void>;
}
