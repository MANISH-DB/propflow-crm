import List  "mo:core/List";
import Types "../types/users";

module {

  // ── Telecallers ───────────────────────────────────────────────────────────

  public func getAllTelecallers(telecallers : List.List<Types.Telecaller>) : [Types.Telecaller] {
    telecallers.toArray();
  };

  public func addTelecaller(telecallers : List.List<Types.Telecaller>, t : Types.Telecaller) : () {
    telecallers.add(t);
  };

  public func updateTelecaller(telecallers : List.List<Types.Telecaller>, name : Text, updated : Types.Telecaller) : Bool {
    var found = false;
    telecallers.mapInPlace(func(t : Types.Telecaller) : Types.Telecaller {
      if (t.name == name) { found := true; updated } else t;
    });
    found;
  };

  public func deleteTelecaller(telecallers : List.List<Types.Telecaller>, name : Text) : Bool {
    let before = telecallers.size();
    let filtered = telecallers.filter(func(t : Types.Telecaller) : Bool { t.name != name });
    telecallers.clear();
    telecallers.append(filtered);
    telecallers.size() < before;
  };

  // ── Call History (telecaller side) ────────────────────────────────────────

  // telecaller = null → return all; ?name → filter
  public func getCallHistory(callHistory : List.List<Types.CallHistory>, telecaller : ?Text) : [Types.CallHistory] {
    switch telecaller {
      case null callHistory.toArray();
      case (?name) {
        callHistory.toArray().filter(func(e : Types.CallHistory) : Bool {
          e.telecaller == name
        });
      };
    };
  };

  public func addCallHistory(callHistory : List.List<Types.CallHistory>, entry : Types.CallHistory) : () {
    callHistory.add(entry);
  };

  // ── Sales Call History ────────────────────────────────────────────────────

  // salesPerson = null → return all; ?name → filter
  public func getSalesCallHistory(salesCallHistory : List.List<Types.SalesCallHistory>, salesPerson : ?Text) : [Types.SalesCallHistory] {
    switch salesPerson {
      case null salesCallHistory.toArray();
      case (?name) {
        salesCallHistory.toArray().filter(func(e : Types.SalesCallHistory) : Bool {
          e.salesPerson == name
        });
      };
    };
  };

  public func addSalesCallHistory(salesCallHistory : List.List<Types.SalesCallHistory>, entry : Types.SalesCallHistory) : () {
    salesCallHistory.add(entry);
  };

  // ── Projects ──────────────────────────────────────────────────────────────

  public func getAllProjects(projects : List.List<Types.Project>) : [Types.Project] {
    projects.toArray();
  };

  public func addProject(projects : List.List<Types.Project>, project : Types.Project) : () {
    projects.add(project);
  };

  public func updateProject(projects : List.List<Types.Project>, name : Text, updated : Types.Project) : Bool {
    var found = false;
    projects.mapInPlace(func(p : Types.Project) : Types.Project {
      if (p.projectName == name) { found := true; updated } else p;
    });
    found;
  };

  public func deleteProject(projects : List.List<Types.Project>, name : Text) : Bool {
    let before = projects.size();
    let filtered = projects.filter(func(p : Types.Project) : Bool { p.projectName != name });
    projects.clear();
    projects.append(filtered);
    projects.size() < before;
  };

  // Returns brochure link for a given project name
  public func getBrochureLink(projects : List.List<Types.Project>, projectName : Text) : ?Text {
    switch (projects.find(func(p : Types.Project) : Bool { p.projectName == projectName })) {
      case (?p) ?(p.brochure);
      case null null;
    };
  };
};
