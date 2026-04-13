import List   "mo:core/List";
import Array  "mo:core/Array";
import Iter   "mo:core/Iter";
import Text   "mo:core/Text";
import Set    "mo:core/Set";
import Types  "../types/leads";

module {

  // ── Helpers ──────────────────────────────────────────────────────────────

  // Compare two leads: newest latestStatusDate first
  // Dates are DD/MMM/YYYY — lexicographic compare won't work across years/months
  // We parse to a sortable key: YYYY + monthIndex(MMM) + DD
  func monthIndex(m : Text) : Text {
    switch m {
      case "Jan" "01"; case "Feb" "02"; case "Mar" "03";
      case "Apr" "04"; case "May" "05"; case "Jun" "06";
      case "Jul" "07"; case "Aug" "08"; case "Sep" "09";
      case "Oct" "10"; case "Nov" "11"; case "Dec" "12";
      case _ "00";
    };
  };

  // Convert DD/MMM/YYYY → YYYYMMDD sortable text
  func toSortKey(d : Text) : Text {
    let parts = d.split(#char '/');
    let arr   = parts.toArray();
    if (arr.size() != 3) return "00000000";
    let dd  = arr[0];
    let mmm = arr[1];
    let yyyy = arr[2];
    yyyy # monthIndex(mmm) # (if (dd.size() == 1) ("0" # dd) else dd);
  };

  func compareLeads(a : Types.Lead, b : Types.Lead) : { #less; #equal; #greater } {
    let ka = toSortKey(a.latestStatusDate);
    let kb = toSortKey(b.latestStatusDate);
    Text.compare(kb, ka); // descending — newest first
  };

  // ── Public functions ──────────────────────────────────────────────────────

  // Returns all leads sorted newest status-date first; srNo never changes
  public func getAllLeads(leads : List.List<Types.Lead>) : [Types.Lead] {
    let arr = leads.toArray();
    arr.sort(compareLeads);
  };

  // Returns leads assigned to a specific telecaller
  public func getLeadsByTelecaller(leads : List.List<Types.Lead>, telecaller : Text) : [Types.Lead] {
    let filtered = leads.toArray().filter(func(l : Types.Lead) : Bool {
      l.telecaller == telecaller
    });
    filtered.sort(compareLeads);
  };

  // Returns leads assigned to a specific sales person
  public func getLeadsBySalesPerson(leads : List.List<Types.Lead>, salesPerson : Text) : [Types.Lead] {
    let filtered = leads.toArray().filter(func(l : Types.Lead) : Bool {
      l.assignedSales == salesPerson
    });
    filtered.sort(compareLeads);
  };

  // Adds a new lead; auto-assigns stable srNo and id
  public func addLead(leads : List.List<Types.Lead>, nextId : Nat, lead : Types.Lead) : Types.Lead {
    let newLead : Types.Lead = {
      lead with
      id   = nextId;
      srNo = nextId;
    };
    leads.add(newLead);
    newLead;
  };

  // Updates an existing lead by id; returns false if not found
  public func updateLead(leads : List.List<Types.Lead>, updated : Types.Lead) : Bool {
    var found = false;
    leads.mapInPlace(func(l : Types.Lead) : Types.Lead {
      if (l.id == updated.id) {
        found := true;
        // preserve srNo from original
        { updated with srNo = l.srNo };
      } else l;
    });
    found;
  };

  // Deletes a lead by id; returns false if not found
  public func deleteLead(leads : List.List<Types.Lead>, id : Types.LeadId) : Bool {
    let before = leads.size();
    let filtered = leads.filter(func(l : Types.Lead) : Bool { l.id != id });
    leads.clear();
    leads.append(filtered);
    leads.size() < before;
  };

  // Returns a single lead by id
  public func getLeadById(leads : List.List<Types.Lead>, id : Types.LeadId) : ?Types.Lead {
    leads.find(func(l : Types.Lead) : Bool { l.id == id });
  };

  // Returns unique project names from all leads
  public func getUniqueProjectNames(leads : List.List<Types.Lead>) : [Text] {
    let seen = Set.empty<Text>();
    leads.forEach(func(l : Types.Lead) {
      seen.add(l.projectName);
    });
    seen.toArray();
  };

  // Returns unique telecaller names from all leads
  public func getUniqueTelecallers(leads : List.List<Types.Lead>) : [Text] {
    let seen = Set.empty<Text>();
    leads.forEach(func(l : Types.Lead) {
      if (l.telecaller != "") seen.add(l.telecaller);
    });
    seen.toArray();
  };

  // Returns unique sales person names from all leads
  public func getUniqueSalesPersons(leads : List.List<Types.Lead>) : [Text] {
    let seen = Set.empty<Text>();
    leads.forEach(func(l : Types.Lead) {
      if (l.assignedSales != "") seen.add(l.assignedSales);
    });
    seen.toArray();
  };

  // Returns the current dynamic column schema definitions
  public func getLeadSchema(schemaDefs : List.List<Types.ColumnDef>) : [Types.ColumnDef] {
    let arr = schemaDefs.toArray();
    arr.sort(func(a : Types.ColumnDef, b : Types.ColumnDef) : { #less; #equal; #greater } {
      if (a.sortOrder < b.sortOrder) #less
      else if (a.sortOrder > b.sortOrder) #greater
      else #equal
    });
  };

  // Adds or updates a column definition (upsert by key)
  public func upsertColumnDef(schemaDefs : List.List<Types.ColumnDef>, col : Types.ColumnDef) : () {
    var found = false;
    schemaDefs.mapInPlace(func(c : Types.ColumnDef) : Types.ColumnDef {
      if (c.key == col.key) { found := true; col } else c;
    });
    if (not found) schemaDefs.add(col);
  };

  // Removes a column definition by key; returns false if not found
  public func removeColumnDef(schemaDefs : List.List<Types.ColumnDef>, key : Text) : Bool {
    let before = schemaDefs.size();
    let filtered = schemaDefs.filter(func(c : Types.ColumnDef) : Bool { c.key != key });
    schemaDefs.clear();
    schemaDefs.append(filtered);
    schemaDefs.size() < before;
  };
};
