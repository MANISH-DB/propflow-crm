import List  "mo:core/List";
import Types "../types/tasks";

module {

  public func getAllTasks(tasks : List.List<Types.Task>) : [Types.Task] {
    tasks.toArray();
  };

  // Returns tasks for a specific assignee
  public func getTasksByAssignee(tasks : List.List<Types.Task>, assignedTo : Text) : [Types.Task] {
    tasks.toArray().filter(func(t : Types.Task) : Bool { t.assignedTo == assignedTo });
  };

  // Adds a new task; auto-assigns stable taskId
  public func addTask(tasks : List.List<Types.Task>, nextId : Nat, task : Types.Task) : Types.Task {
    let newTask : Types.Task = { task with taskId = nextId };
    tasks.add(newTask);
    newTask;
  };

  // Updates task status (for telecaller/sales)
  public func updateTaskStatus(tasks : List.List<Types.Task>, taskId : Types.TaskId, status : Text) : Bool {
    var found = false;
    tasks.mapInPlace(func(t : Types.Task) : Types.Task {
      if (t.taskId == taskId) { found := true; { t with status } } else t;
    });
    found;
  };

  // Full task update (for admin)
  public func updateTask(tasks : List.List<Types.Task>, updated : Types.Task) : Bool {
    var found = false;
    tasks.mapInPlace(func(t : Types.Task) : Types.Task {
      if (t.taskId == updated.taskId) { found := true; updated } else t;
    });
    found;
  };

  // Deletes a task by id
  public func deleteTask(tasks : List.List<Types.Task>, taskId : Types.TaskId) : Bool {
    let before = tasks.size();
    let filtered = tasks.filter(func(t : Types.Task) : Bool { t.taskId != taskId });
    tasks.clear();
    tasks.append(filtered);
    tasks.size() < before;
  };

  public func getTaskById(tasks : List.List<Types.Task>, taskId : Types.TaskId) : ?Types.Task {
    tasks.find(func(t : Types.Task) : Bool { t.taskId == taskId });
  };
};
