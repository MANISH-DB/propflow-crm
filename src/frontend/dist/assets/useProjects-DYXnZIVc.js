import { u as useBackendActor, a as useQuery, b as useMutation, p as svcAddSoftwareInquiry, q as svcAddProjectInquiry, r as svcGetAllProjects, t as svcGetUniqueProjectNames, v as svcGetBrochureLink, w as svcGetUniqueTelecallers, x as svcGetUniqueSalesPersons } from "./useBackendActor-CDUnFUXW.js";
import { b as useQueryClient } from "./index-BYjlLTrJ.js";
function useAllProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["projects", "all"],
    queryFn: () => svcGetAllProjects(actor),
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useUniqueProjectNames() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["projects", "names"],
    queryFn: () => svcGetUniqueProjectNames(actor),
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useBrochureLink(projectName) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["projects", "brochure", projectName],
    queryFn: () => svcGetBrochureLink(actor, projectName),
    enabled: !!actor && !isFetching && !!projectName,
    staleTime: 12e4
  });
}
function useUniqueTelecallers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["telecallers", "names"],
    queryFn: () => svcGetUniqueTelecallers(actor),
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useUniqueSalesPersons() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["salesPersons", "names"],
    queryFn: () => svcGetUniqueSalesPersons(actor),
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useAddSoftwareInquiry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inquiry) => svcAddSoftwareInquiry(actor, inquiry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["softwareInquiries"] });
    }
  });
}
function useAddProjectInquiry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inquiry) => svcAddProjectInquiry(actor, inquiry),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projectInquiries"] });
    }
  });
}
export {
  useAllProjects as a,
  useUniqueSalesPersons as b,
  useBrochureLink as c,
  useUniqueTelecallers as d,
  useAddProjectInquiry as e,
  useAddSoftwareInquiry as f,
  useUniqueProjectNames as u
};
