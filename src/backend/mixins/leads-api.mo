import List       "mo:core/List";
import LeadTypes  "../types/leads";
import LeadLib    "../lib/leads";

mixin (
  leads      : List.List<LeadTypes.Lead>,
  schemaDefs : List.List<LeadTypes.ColumnDef>,
  nextLeadId : { var value : Nat },
) {

  // ---- Schema (dynamic columns) ----

  public query func getLeadSchema() : async [LeadTypes.ColumnDef] {
    LeadLib.getLeadSchema(schemaDefs);
  };

  public func upsertColumnDef(col : LeadTypes.ColumnDef) : async () {
    LeadLib.upsertColumnDef(schemaDefs, col);
  };

  public func removeColumnDef(key : Text) : async Bool {
    LeadLib.removeColumnDef(schemaDefs, key);
  };

  // ---- Lead CRUD ----

  public query func getAllLeads() : async [LeadTypes.Lead] {
    LeadLib.getAllLeads(leads);
  };

  public query func getLeadById(id : LeadTypes.LeadId) : async ?LeadTypes.Lead {
    LeadLib.getLeadById(leads, id);
  };

  public query func getLeadsByTelecaller(telecaller : Text) : async [LeadTypes.Lead] {
    LeadLib.getLeadsByTelecaller(leads, telecaller);
  };

  public query func getLeadsBySalesPerson(salesPerson : Text) : async [LeadTypes.Lead] {
    LeadLib.getLeadsBySalesPerson(leads, salesPerson);
  };

  public func addLead(lead : LeadTypes.Lead) : async LeadTypes.Lead {
    let id = nextLeadId.value;
    nextLeadId.value += 1;
    LeadLib.addLead(leads, id, lead);
  };

  public func updateLead(lead : LeadTypes.Lead) : async Bool {
    LeadLib.updateLead(leads, lead);
  };

  public func deleteLead(id : LeadTypes.LeadId) : async Bool {
    LeadLib.deleteLead(leads, id);
  };

  // ---- Unique value lookups ----

  public query func getUniqueProjectNames() : async [Text] {
    LeadLib.getUniqueProjectNames(leads);
  };

  public query func getUniqueTelecallers() : async [Text] {
    LeadLib.getUniqueTelecallers(leads);
  };

  public query func getUniqueSalesPersons() : async [Text] {
    LeadLib.getUniqueSalesPersons(leads);
  };
};
