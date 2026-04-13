import { c as createLucideIcon, u as useBackendActor, a as useQuery, b as useMutation, j as svcAddTask, k as svcUpdateTask, l as svcUpdateTaskStatus, m as svcDeleteTask, n as svcGetAllTasks, o as svcGetTasksByAssignee } from "./useBackendActor-CDUnFUXW.js";
import { b as useQueryClient } from "./index-BYjlLTrJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function useAllTasks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["tasks", "all"],
    queryFn: () => svcGetAllTasks(actor),
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useTasksByAssignee(assignedTo) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["tasks", "assignee", assignedTo],
    queryFn: () => svcGetTasksByAssignee(actor, assignedTo),
    enabled: !!actor && !isFetching && !!assignedTo,
    staleTime: 3e4
  });
}
function useAddTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task) => svcAddTask(actor, task),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useUpdateTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task) => svcUpdateTask(actor, task),
    onMutate: async (task) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const prev = qc.getQueryData(["tasks", "all"]);
      qc.setQueryData(
        ["tasks", "all"],
        (old) => old ? old.map((t) => t.taskId === task.taskId ? task : t) : old
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx == null ? void 0 : ctx.prev) qc.setQueryData(["tasks", "all"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useUpdateTaskStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, status }) => svcUpdateTaskStatus(actor, taskId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
function useDeleteTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (taskId) => svcDeleteTask(actor, taskId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}
export {
  CircleX as C,
  useAllTasks as a,
  useAddTask as b,
  useUpdateTask as c,
  useUpdateTaskStatus as d,
  useDeleteTask as e,
  useTasksByAssignee as u
};
