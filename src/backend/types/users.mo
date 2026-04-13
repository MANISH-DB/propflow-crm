import Common "common";

module {
  public type DateStr = Common.DateStr;

  // Telecaller / user record
  public type Telecaller = {
    name : Text;
    role : Text; // "Telecaller" | "Sales" | "Admin"
  };

  // Call history entry (telecaller side)
  public type CallHistory = {
    date        : DateStr;
    name        : Text;
    mobile      : Text;
    status      : Text;
    remark      : Text;
    telecaller  : Text;
    projectName : Text;
  };

  // Call history entry (sales side)
  public type SalesCallHistory = {
    date        : DateStr;
    name        : Text;
    mobile      : Text;
    status      : Text;
    remark      : Text;
    salesPerson : Text;
    projectName : Text;
  };

  // Project record
  public type Project = {
    projectName : Text;
    brochure    : Text; // Google Drive link
  };
};
