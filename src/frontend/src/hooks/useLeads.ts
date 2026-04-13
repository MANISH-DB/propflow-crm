import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  svcAddLead,
  svcDeleteLead,
  svcGetAllLeads,
  svcGetLeadById,
  svcGetLeadSchema,
  svcGetLeadsBySalesPerson,
  svcGetLeadsByTelecaller,
  svcRemoveColumnDef,
  svcUpdateLead,
  svcUpsertColumnDef,
} from "../services/backend";
import type { ColumnDef, Lead, LeadId } from "../types";
import { useBackendActor } from "./useBackendActor";

export function useAllLeads() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Lead[]>({
    queryKey: ["leads", "all"],
    queryFn: () => svcGetAllLeads(actor),
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useLeadsByTelecaller(telecaller: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Lead[]>({
    queryKey: ["leads", "telecaller", telecaller],
    queryFn: () => svcGetLeadsByTelecaller(actor, telecaller),
    enabled: !!actor && !isFetching && !!telecaller,
    staleTime: 30_000,
  });
}

export function useLeadsBySalesPerson(salesPerson: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Lead[]>({
    queryKey: ["leads", "sales", salesPerson],
    queryFn: () => svcGetLeadsBySalesPerson(actor, salesPerson),
    enabled: !!actor && !isFetching && !!salesPerson,
    staleTime: 30_000,
  });
}

export function useLeadById(id: LeadId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Lead | null>({
    queryKey: ["leads", "single", id?.toString()],
    queryFn: () => svcGetLeadById(actor, id!),
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 10_000,
  });
}

export function useLeadSchema() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ColumnDef[]>({
    queryKey: ["leads", "schema"],
    queryFn: () => svcGetLeadSchema(actor),
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAddLead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lead: Lead) => svcAddLead(actor, lead),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useUpdateLead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lead: Lead) => svcUpdateLead(actor, lead),
    onMutate: async (lead) => {
      await qc.cancelQueries({ queryKey: ["leads"] });
      const prev = qc.getQueryData<Lead[]>(["leads", "all"]);
      qc.setQueryData<Lead[]>(["leads", "all"], (old) =>
        old ? old.map((l) => (l.id === lead.id ? lead : l)) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["leads", "all"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useDeleteLead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: LeadId) => svcDeleteLead(actor, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useUpsertColumnDef() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (col: ColumnDef) => svcUpsertColumnDef(actor, col),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads", "schema"] });
    },
  });
}

export function useRemoveColumnDef() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (key: string) => svcRemoveColumnDef(actor, key),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads", "schema"] });
    },
  });
}
