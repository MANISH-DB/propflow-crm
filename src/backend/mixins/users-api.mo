import List      "mo:core/List";
import UserTypes "../types/users";
import UserLib   "../lib/users";

mixin (
  telecallers      : List.List<UserTypes.Telecaller>,
  callHistory      : List.List<UserTypes.CallHistory>,
  salesCallHistory : List.List<UserTypes.SalesCallHistory>,
  projects         : List.List<UserTypes.Project>,
) {

  // ---- Telecallers ----

  public query func getAllTelecallers() : async [UserTypes.Telecaller] {
    UserLib.getAllTelecallers(telecallers);
  };

  public func addTelecaller(t : UserTypes.Telecaller) : async () {
    UserLib.addTelecaller(telecallers, t);
  };

  public func updateTelecaller(name : Text, updated : UserTypes.Telecaller) : async Bool {
    UserLib.updateTelecaller(telecallers, name, updated);
  };

  public func deleteTelecaller(name : Text) : async Bool {
    UserLib.deleteTelecaller(telecallers, name);
  };

  // ---- Call History ----

  // telecaller = null → return all (admin view); ?name → filter
  public query func getCallHistory(telecaller : ?Text) : async [UserTypes.CallHistory] {
    UserLib.getCallHistory(callHistory, telecaller);
  };

  public func addCallHistory(entry : UserTypes.CallHistory) : async () {
    UserLib.addCallHistory(callHistory, entry);
  };

  // ---- Sales Call History ----

  // salesPerson = null → return all; ?name → filter
  public query func getSalesCallHistory(salesPerson : ?Text) : async [UserTypes.SalesCallHistory] {
    UserLib.getSalesCallHistory(salesCallHistory, salesPerson);
  };

  public func addSalesCallHistory(entry : UserTypes.SalesCallHistory) : async () {
    UserLib.addSalesCallHistory(salesCallHistory, entry);
  };

  // ---- Projects ----

  public query func getAllProjects() : async [UserTypes.Project] {
    UserLib.getAllProjects(projects);
  };

  public func addProject(project : UserTypes.Project) : async () {
    UserLib.addProject(projects, project);
  };

  public func updateProject(name : Text, updated : UserTypes.Project) : async Bool {
    UserLib.updateProject(projects, name, updated);
  };

  public func deleteProject(name : Text) : async Bool {
    UserLib.deleteProject(projects, name);
  };

  public query func getBrochureLink(projectName : Text) : async ?Text {
    UserLib.getBrochureLink(projects, projectName);
  };
};
