import { u as useBackendActor, a as useQuery, b as useMutation, f as svcAddCallHistory, g as svcAddSalesCallHistory, h as svcGetCallHistory, i as svcGetSalesCallHistory } from "./useBackendActor-CDUnFUXW.js";
import { b as useQueryClient } from "./index-BYjlLTrJ.js";
function useCallHistory(telecaller = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["callHistory", telecaller ?? "all"],
    queryFn: () => svcGetCallHistory(actor, telecaller),
    enabled: !!actor && !isFetching,
    staleTime: 2e4
  });
}
function useAddCallHistory() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entry) => svcAddCallHistory(actor, entry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callHistory"] });
    }
  });
}
function useSalesCallHistory(salesPerson = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["salesCallHistory", salesPerson ?? "all"],
    queryFn: () => svcGetSalesCallHistory(actor, salesPerson),
    enabled: !!actor && !isFetching,
    staleTime: 2e4
  });
}
function useAddSalesCallHistory() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entry) => svcAddSalesCallHistory(actor, entry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salesCallHistory"] });
    }
  });
}
export {
  useAddSalesCallHistory as a,
  useSalesCallHistory as b,
  useAddCallHistory as c,
  useCallHistory as u
};
