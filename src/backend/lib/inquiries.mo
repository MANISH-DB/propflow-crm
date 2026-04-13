import List  "mo:core/List";
import Types "../types/inquiries";

module {

  // ── Software Inquiries ────────────────────────────────────────────────────

  public func getAllSoftwareInquiries(inquiries : List.List<Types.SoftwareInquiry>) : [Types.SoftwareInquiry] {
    inquiries.toArray();
  };

  public func addSoftwareInquiry(inquiries : List.List<Types.SoftwareInquiry>, inquiry : Types.SoftwareInquiry) : () {
    inquiries.add(inquiry);
  };

  // ── Project Inquiries ─────────────────────────────────────────────────────

  public func getAllProjectInquiries(inquiries : List.List<Types.ProjectInquiry>) : [Types.ProjectInquiry] {
    inquiries.toArray();
  };

  public func addProjectInquiry(
    inquiries : List.List<Types.ProjectInquiry>,
    nextId    : Nat,
    inquiry   : Types.ProjectInquiry,
  ) : Types.ProjectInquiry {
    let newInquiry : Types.ProjectInquiry = {
      inquiry with
      id   = nextId;
      srNo = nextId;
    };
    inquiries.add(newInquiry);
    newInquiry;
  };

  public func deleteProjectInquiry(inquiries : List.List<Types.ProjectInquiry>, id : Types.InquiryId) : Bool {
    let before = inquiries.size();
    let filtered = inquiries.filter(func(i : Types.ProjectInquiry) : Bool { i.id != id });
    inquiries.clear();
    inquiries.append(filtered);
    inquiries.size() < before;
  };
};
