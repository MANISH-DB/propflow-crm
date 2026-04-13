import Common "common";

module {
  public type TaskId  = Common.TaskId;
  public type DateStr = Common.DateStr;

  // Task status
  public type TaskStatus = { #Pending; #InProgress; #Done; #Closed };

  // Task record
  public type Task = {
    taskId      : TaskId;
    assignedTo  : Text;
    role        : Text;  // "Telecaller" | "Sales" | "Admin"
    taskTitle   : Text;
    description : Text;
    dueDate     : DateStr;
    leadSr      : Nat;
    status      : Text;  // TaskStatus as text
    createdDate : DateStr;
    createdBy   : Text;
  };
};
