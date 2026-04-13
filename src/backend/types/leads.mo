import Common "common";

module {
  public type LeadId   = Common.LeadId;
  public type DateStr  = Common.DateStr;

  // Requirement dropdown values
  public type Requirement = { #BHK1; #BHK2; #BHK3; #BHK4; #Shop };

  // Budget dropdown values
  public type Budget = {
    #Lacs30;
    #Lacs30to40;
    #Lacs40to50;
    #Lacs50to60;
    #Lacs60to70;
    #Lacs70to80;
    #Lacs80to1Cr;
    #Cr1to1_5;
    #Above1_5Cr;
  };

  // SV Status dropdown
  public type SvStatus = {
    #NextFollowup;
    #SvRescheduled;
    #BookingDone;
    #RegistrationDone;
    #LeadClose;
  };

  // Lead close status
  public type LeadCloseStatus = { #Open; #LeadClose };

  // Dynamic status date columns (Not Connect, Share Brochure, Follow-up, SV Plan, SV Done, Lost, Last Call)
  // Stored as a map of column-key -> DateStr so schema changes auto-reflect
  public type StatusDates = [(Text, DateStr)];

  // The full lead record stored in stable state
  public type Lead = {
    id            : LeadId;
    srNo          : Nat;        // stable, never reordered
    leadDate      : DateStr;
    firstName     : Text;
    lastName      : Text;
    mobileNo      : Text;
    projectName   : Text;
    source        : Text;
    telecaller    : Text;
    statusDates   : StatusDates; // dynamic columns
    latestStatus  : Text;
    latestStatusDate : DateStr;
    remarks1      : Text;
    remarks2      : Text;
    requirement   : Text;       // stored as text for flexibility
    budget        : Text;       // stored as text for flexibility
    assignedSales : Text;
    svRemark      : Text;
    lossReason    : Text;
    svStatus      : Text;       // SvStatus as text
    statusDate    : DateStr;
    svNextFollowup : DateStr;
    leadCloseStatus : Text;     // LeadCloseStatus as text
  };

  // Schema column descriptor for dynamic frontend rendering
  public type ColumnDef = {
    key       : Text;
    colLabel  : Text;  // renamed from 'label' — reserved keyword
    colType   : Text;  // "text" | "date" | "dropdown" | "number"
    options   : [Text]; // dropdown options if any
    sortOrder : Nat;
    visible   : Bool;
  };
};
