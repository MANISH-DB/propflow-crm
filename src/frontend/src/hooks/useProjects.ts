import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  svcAddProject,
  svcAddProjectInquiry,
  svcAddSoftwareInquiry,
  svcAddTelecaller,
  svcDeleteProject,
  svcDeleteProjectInquiry,
  svcDeleteTelecaller,
  svcGetAllProjectInquiries,
  svcGetAllProjects,
  svcGetAllSoftwareInquiries,
  svcGetAllTelecallers,
  svcGetBrochureLink,
  svcGetUniqueProjectNames,
  svcGetUniqueSalesPersons,
  svcGetUniqueTelecallers,
  svcUpdateProject,
  svcUpdateTelecaller,
} from "../services/backend";
import type {
  InquiryId,
  Project,
  ProjectInquiry,
  SoftwareInquiry,
  Telecaller,
} from "../types";
import { useBackendActor } from "./useBackendActor";

// ---- Projects ----

export function useAllProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects", "all"],
    queryFn: () => svcGetAllProjects(actor),
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUniqueProjectNames() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string[]>({
    queryKey: ["projects", "names"],
    queryFn: () => svcGetUniqueProjectNames(actor),
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useBrochureLink(projectName: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string | null>({
    queryKey: ["projects", "brochure", projectName],
    queryFn: () => svcGetBrochureLink(actor, projectName),
    enabled: !!actor && !isFetching && !!projectName,
    staleTime: 120_000,
  });
}

export function useAddProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => svcAddProject(actor, project),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ name, updated }: { name: string; updated: Project }) =>
      svcUpdateProject(actor, name, updated),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => svcDeleteProject(actor, name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ---- Telecallers ----

export function useAllTelecallers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Telecaller[]>({
    queryKey: ["telecallers", "all"],
    queryFn: () => svcGetAllTelecallers(actor),
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUniqueTelecallers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string[]>({
    queryKey: ["telecallers", "names"],
    queryFn: () => svcGetUniqueTelecallers(actor),
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUniqueSalesPersons() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string[]>({
    queryKey: ["salesPersons", "names"],
    queryFn: () => svcGetUniqueSalesPersons(actor),
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAddTelecaller() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (t: Telecaller) => svcAddTelecaller(actor, t),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["telecallers"] });
    },
  });
}

export function useUpdateTelecaller() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ name, updated }: { name: string; updated: Telecaller }) =>
      svcUpdateTelecaller(actor, name, updated),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["telecallers"] });
    },
  });
}

export function useDeleteTelecaller() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => svcDeleteTelecaller(actor, name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["telecallers"] });
    },
  });
}

// ---- Inquiries ----

export function useAllSoftwareInquiries() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SoftwareInquiry[]>({
    queryKey: ["softwareInquiries"],
    queryFn: () => svcGetAllSoftwareInquiries(actor),
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAddSoftwareInquiry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inquiry: SoftwareInquiry) =>
      svcAddSoftwareInquiry(actor, inquiry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["softwareInquiries"] });
    },
  });
}

export function useAllProjectInquiries() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ProjectInquiry[]>({
    queryKey: ["projectInquiries"],
    queryFn: () => svcGetAllProjectInquiries(actor),
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAddProjectInquiry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inquiry: ProjectInquiry) =>
      svcAddProjectInquiry(actor, inquiry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projectInquiries"] });
    },
  });
}

export function useDeleteProjectInquiry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: InquiryId) => svcDeleteProjectInquiry(actor, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projectInquiries"] });
    },
  });
}
