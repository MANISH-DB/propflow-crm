import List     "mo:core/List";
import InqTypes "../types/inquiries";
import InqLib   "../lib/inquiries";

mixin (
  softwareInquiries : List.List<InqTypes.SoftwareInquiry>,
  projectInquiries  : List.List<InqTypes.ProjectInquiry>,
  nextInquiryId     : { var value : Nat },
) {

  // ---- Software Inquiries ----

  public query func getAllSoftwareInquiries() : async [InqTypes.SoftwareInquiry] {
    InqLib.getAllSoftwareInquiries(softwareInquiries);
  };

  public func addSoftwareInquiry(inquiry : InqTypes.SoftwareInquiry) : async () {
    InqLib.addSoftwareInquiry(softwareInquiries, inquiry);
  };

  // ---- Project Inquiries ----

  public query func getAllProjectInquiries() : async [InqTypes.ProjectInquiry] {
    InqLib.getAllProjectInquiries(projectInquiries);
  };

  public func addProjectInquiry(inquiry : InqTypes.ProjectInquiry) : async InqTypes.ProjectInquiry {
    let id = nextInquiryId.value;
    nextInquiryId.value += 1;
    InqLib.addProjectInquiry(projectInquiries, id, inquiry);
  };

  public func deleteProjectInquiry(id : InqTypes.InquiryId) : async Bool {
    InqLib.deleteProjectInquiry(projectInquiries, id);
  };
};
