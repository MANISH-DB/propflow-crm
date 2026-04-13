import { u as useBackendActor, a as useQuery, b as useMutation, s as svcUpdateLead, d as svcAddLead, e as svcGetAllLeads } from "./useBackendActor-CDUnFUXW.js";
import { b as useQueryClient } from "./index-BYjlLTrJ.js";
function useAllLeads() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["leads", "all"],
    queryFn: () => svcGetAllLeads(actor),
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useAddLead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lead) => svcAddLead(actor, lead),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
function useUpdateLead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lead) => svcUpdateLead(actor, lead),
    onMutate: async (lead) => {
      await qc.cancelQueries({ queryKey: ["leads"] });
      const prev = qc.getQueryData(["leads", "all"]);
      qc.setQueryData(
        ["leads", "all"],
        (old) => old ? old.map((l) => l.id === lead.id ? lead : l) : old
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx == null ? void 0 : ctx.prev) qc.setQueryData(["leads", "all"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
export {
  useUpdateLead as a,
  useAddLead as b,
  useAllLeads as u
};
