module {
  // Shared date string type — always DD/MMM/YYYY
  public type DateStr = Text;

  // Unique identifiers
  public type LeadId = Nat;
  public type TaskId = Nat;
  public type InquiryId = Nat;

  // Role variants
  public type Role = { #Telecaller; #Sales; #Admin };

  // Lead status column keys (dynamic schema support)
  public type ColumnKey = Text;
};
