import List      "mo:core/List";
import TaskTypes "../types/tasks";
import TaskLib   "../lib/tasks";

mixin (
  tasks      : List.List<TaskTypes.Task>,
  nextTaskId : { var value : Nat },
) {

  public query func getAllTasks() : async [TaskTypes.Task] {
    TaskLib.getAllTasks(tasks);
  };

  public query func getTasksByAssignee(assignedTo : Text) : async [TaskTypes.Task] {
    TaskLib.getTasksByAssignee(tasks, assignedTo);
  };

  public query func getTaskById(taskId : TaskTypes.TaskId) : async ?TaskTypes.Task {
    TaskLib.getTaskById(tasks, taskId);
  };

  // Admin: create task
  public func addTask(task : TaskTypes.Task) : async TaskTypes.Task {
    let id = nextTaskId.value;
    nextTaskId.value += 1;
    TaskLib.addTask(tasks, id, task);
  };

  // Telecaller / Sales: update own task status
  public func updateTaskStatus(taskId : TaskTypes.TaskId, status : Text) : async Bool {
    TaskLib.updateTaskStatus(tasks, taskId, status);
  };

  // Admin: full task update
  public func updateTask(task : TaskTypes.Task) : async Bool {
    TaskLib.updateTask(tasks, task);
  };

  // Admin: delete task
  public func deleteTask(taskId : TaskTypes.TaskId) : async Bool {
    TaskLib.deleteTask(tasks, taskId);
  };
};
