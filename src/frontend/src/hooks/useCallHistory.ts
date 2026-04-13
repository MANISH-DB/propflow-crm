import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  svcAddCallHistory,
  svcAddSalesCallHistory,
  svcGetCallHistory,
  svcGetSalesCallHistory,
} from "../services/backend";
import type { CallHistory, SalesCallHistory } from "../types";
import { useBackendActor } from "./useBackendActor";

/** Get call history — pass null for all, or telecaller name for filtered */
export function useCallHistory(telecaller: string | null = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CallHistory[]>({
    queryKey: ["callHistory", telecaller ?? "all"],
    queryFn: () => svcGetCallHistory(actor, telecaller),
    enabled: !!actor && !isFetching,
    staleTime: 20_000,
  });
}

export function useAddCallHistory() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entry: CallHistory) => svcAddCallHistory(actor, entry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callHistory"] });
    },
  });
}

/** Get sales call history — pass null for all */
export function useSalesCallHistory(salesPerson: string | null = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SalesCallHistory[]>({
    queryKey: ["salesCallHistory", salesPerson ?? "all"],
    queryFn: () => svcGetSalesCallHistory(actor, salesPerson),
    enabled: !!actor && !isFetching,
    staleTime: 20_000,
  });
}

export function useAddSalesCallHistory() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entry: SalesCallHistory) =>
      svcAddSalesCallHistory(actor, entry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salesCallHistory"] });
    },
  });
}
