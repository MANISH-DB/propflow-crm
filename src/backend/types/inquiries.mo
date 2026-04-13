import Common "common";

module {
  public type InquiryId = Common.InquiryId;
  public type DateStr   = Common.DateStr;

  // Software inquiry
  public type SoftwareInquiry = {
    name   : Text;
    mobile : Text;
  };

  // Project inquiry
  public type ProjectInquiry = {
    id          : InquiryId;
    srNo        : Nat;
    name        : Text;
    mobile      : Text;
    projectName : Text;
    svPlan      : DateStr; // optional — empty text means not provided
    source      : Text;    // default "Web"
  };
};
