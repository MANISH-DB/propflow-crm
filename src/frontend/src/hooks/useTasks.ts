import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  svcAddTask,
  svcDeleteTask,
  svcGetAllTasks,
  svcGetTaskById,
  svcGetTasksByAssignee,
  svcUpdateTask,
  svcUpdateTaskStatus,
} from "../services/backend";
import type { Task, TaskId } from "../types";
import { useBackendActor } from "./useBackendActor";

export function useAllTasks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Task[]>({
    queryKey: ["tasks", "all"],
    queryFn: () => svcGetAllTasks(actor),
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useTasksByAssignee(assignedTo: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Task[]>({
    queryKey: ["tasks", "assignee", assignedTo],
    queryFn: () => svcGetTasksByAssignee(actor, assignedTo),
    enabled: !!actor && !isFetching && !!assignedTo,
    staleTime: 30_000,
  });
}

export function useTaskById(taskId: TaskId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Task | null>({
    queryKey: ["tasks", "single", taskId?.toString()],
    queryFn: () => svcGetTaskById(actor, taskId!),
    enabled: !!actor && !isFetching && taskId !== null,
    staleTime: 10_000,
  });
}

export function useAddTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => svcAddTask(actor, task),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => svcUpdateTask(actor, task),
    onMutate: async (task) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const prev = qc.getQueryData<Task[]>(["tasks", "all"]);
      qc.setQueryData<Task[]>(["tasks", "all"], (old) =>
        old ? old.map((t) => (t.taskId === task.taskId ? task : t)) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["tasks", "all"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTaskStatus() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: TaskId; status: string }) =>
      svcUpdateTaskStatus(actor, taskId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (taskId: TaskId) => svcDeleteTask(actor, taskId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
