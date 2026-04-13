import List      "mo:core/List";
import LeadTypes "types/leads";
import UserTypes "types/users";
import TaskTypes "types/tasks";
import InqTypes  "types/inquiries";
import LeadsMixin "mixins/leads-api";
import UsersMixin "mixins/users-api";
import TasksMixin "mixins/tasks-api";
import InqMixin  "mixins/inquiries-api";

actor {
  // ── Leads domain state ──────────────────────────────────────────────────
  let leads      : List.List<LeadTypes.Lead>      = List.empty();
  let schemaDefs : List.List<LeadTypes.ColumnDef> = List.empty();
  let nextLeadId : { var value : Nat }            = { var value = 11 }; // 10 seed leads

  // ── Users domain state ──────────────────────────────────────────────────
  let telecallers      : List.List<UserTypes.Telecaller>       = List.empty();
  let callHistory      : List.List<UserTypes.CallHistory>      = List.empty();
  let salesCallHistory : List.List<UserTypes.SalesCallHistory> = List.empty();
  let projects         : List.List<UserTypes.Project>          = List.empty();

  // ── Tasks domain state ──────────────────────────────────────────────────
  let tasks      : List.List<TaskTypes.Task> = List.empty();
  let nextTaskId : { var value : Nat }       = { var value = 1 };

  // ── Inquiries domain state ───────────────────────────────────────────────
  let softwareInquiries : List.List<InqTypes.SoftwareInquiry> = List.empty();
  let projectInquiries  : List.List<InqTypes.ProjectInquiry>  = List.empty();
  let nextInquiryId     : { var value : Nat }                 = { var value = 1 };

  // ── Seed: Schema definitions ─────────────────────────────────────────────
  do {
    let cols : [LeadTypes.ColumnDef] = [
      { key = "srNo";           colLabel = "Sr.No";           colType = "number"; options = []; sortOrder = 1;  visible = true  },
      { key = "leadDate";       colLabel = "Lead Date";        colType = "date";   options = []; sortOrder = 2;  visible = true  },
      { key = "firstName";      colLabel = "First Name";       colType = "text";   options = []; sortOrder = 3;  visible = true  },
      { key = "lastName";       colLabel = "Last Name";        colType = "text";   options = []; sortOrder = 4;  visible = true  },
      { key = "mobileNo";       colLabel = "Mobile No";        colType = "text";   options = []; sortOrder = 5;  visible = true  },
      { key = "projectName";    colLabel = "Project Name";     colType = "text";   options = []; sortOrder = 6;  visible = true  },
      { key = "source";         colLabel = "Source";           colType = "text";   options = []; sortOrder = 7;  visible = true  },
      { key = "telecaller";     colLabel = "Telecaller";       colType = "text";   options = []; sortOrder = 8;  visible = true  },
      { key = "notConnect";     colLabel = "Not Connect";      colType = "date";   options = []; sortOrder = 9;  visible = true  },
      { key = "shareBrochure";  colLabel = "Share Brochure";   colType = "date";   options = []; sortOrder = 10; visible = true  },
      { key = "followUp";       colLabel = "Follow-up";        colType = "date";   options = []; sortOrder = 11; visible = true  },
      { key = "svPlan";         colLabel = "SV Plan";          colType = "date";   options = []; sortOrder = 12; visible = true  },
      { key = "svDone";         colLabel = "SV Done";          colType = "date";   options = []; sortOrder = 13; visible = true  },
      { key = "lost";           colLabel = "Lost";             colType = "date";   options = []; sortOrder = 14; visible = true  },
      { key = "lastCall";       colLabel = "Last Call";        colType = "date";   options = []; sortOrder = 15; visible = true  },
      { key = "latestStatus";   colLabel = "Latest Status";    colType = "text";   options = []; sortOrder = 16; visible = true  },
      { key = "latestStatusDate"; colLabel = "Status Date";    colType = "date";   options = []; sortOrder = 17; visible = true  },
      { key = "remarks1";       colLabel = "Remarks1";         colType = "text";   options = []; sortOrder = 18; visible = true  },
      { key = "remarks2";       colLabel = "Remarks2";         colType = "text";   options = []; sortOrder = 19; visible = true  },
      { key = "requirement";    colLabel = "Requirement";      colType = "dropdown";
        options = ["1 BHK","2 BHK","3 BHK","4 BHK","SHOP"]; sortOrder = 20; visible = true },
      { key = "budget";         colLabel = "Budget";           colType = "dropdown";
        options = ["30 Lacs","30.1-40 Lacs","40.1-50 Lacs","50.1-60 Lacs","60.1-70 Lacs","70.1-80 Lacs","80.1 to 1 Crore","1 Cr to 1.5 Cr","Above 1.5 Cr"];
        sortOrder = 21; visible = true },
      { key = "assignedSales";  colLabel = "Sales Person";     colType = "text";   options = []; sortOrder = 22; visible = true  },
      { key = "svRemark";       colLabel = "SV Remark";        colType = "text";   options = []; sortOrder = 23; visible = true  },
      { key = "lossReason";     colLabel = "Loss Reason";      colType = "text";   options = []; sortOrder = 24; visible = true  },
      { key = "svStatus";       colLabel = "SV Status";        colType = "dropdown";
        options = ["Next Followup","SV Rescheduled","Booking Done","Registration Done","Lead Close"];
        sortOrder = 25; visible = true },
      { key = "statusDate";     colLabel = "Status Date (SV)"; colType = "date";   options = []; sortOrder = 26; visible = true  },
      { key = "svNextFollowup"; colLabel = "SV Next Followup"; colType = "date";   options = []; sortOrder = 27; visible = true  },
      { key = "leadCloseStatus"; colLabel = "Lead Close";      colType = "dropdown";
        options = ["Open","Lead Close"]; sortOrder = 28; visible = true },
    ];
    for (col in cols.values()) {
      schemaDefs.add(col);
    };
  };

  // ── Seed: Projects ────────────────────────────────────────────────────────
  do {
    let seedProjects : [UserTypes.Project] = [
      { projectName = "Skyline Heights";    brochure = "https://drive.google.com/file/d/skyline-heights-brochure" },
      { projectName = "Green Valley";       brochure = "https://drive.google.com/file/d/green-valley-brochure"   },
      { projectName = "Tech Park Plaza";    brochure = "https://drive.google.com/file/d/tech-park-plaza-brochure" },
    ];
    for (p in seedProjects.values()) { projects.add(p) };
  };

  // ── Seed: Telecallers / Users ─────────────────────────────────────────────
  do {
    let seedUsers : [UserTypes.Telecaller] = [
      { name = "Priya Sharma";  role = "Telecaller" },
      { name = "Rahul Mehta";   role = "Telecaller" },
      { name = "Anita Patel";   role = "Sales"      },
      { name = "Vikram Singh";  role = "Sales"      },
      { name = "Admin User";    role = "Admin"      },
    ];
    for (u in seedUsers.values()) { telecallers.add(u) };
  };

  // ── Seed: 10 Sample Leads ─────────────────────────────────────────────────
  do {
    let seedLeads : [LeadTypes.Lead] = [
      {
        id = 1; srNo = 1;
        leadDate = "01/Apr/2026"; firstName = "Arjun"; lastName = "Sharma";
        mobileNo = "9876543210"; projectName = "Skyline Heights"; source = "Facebook";
        telecaller = "Priya Sharma";
        statusDates = [("notConnect","01/Apr/2026"),("shareBrochure","02/Apr/2026"),("followUp","05/Apr/2026")];
        latestStatus = "Follow-up"; latestStatusDate = "05/Apr/2026";
        remarks1 = "Interested in 2BHK, call back Thursday"; remarks2 = "";
        requirement = "2 BHK"; budget = "40.1-50 Lacs";
        assignedSales = "Anita Patel"; svRemark = ""; lossReason = "";
        svStatus = "Next Followup"; statusDate = "06/Apr/2026"; svNextFollowup = "08/Apr/2026";
        leadCloseStatus = "Open";
      },
      {
        id = 2; srNo = 2;
        leadDate = "02/Apr/2026"; firstName = "Meena"; lastName = "Gupta";
        mobileNo = "9871234567"; projectName = "Green Valley"; source = "99acres";
        telecaller = "Rahul Mehta";
        statusDates = [("notConnect","02/Apr/2026"),("shareBrochure","03/Apr/2026"),("svPlan","07/Apr/2026")];
        latestStatus = "SV Plan"; latestStatusDate = "07/Apr/2026";
        remarks1 = "Site visit scheduled for Saturday"; remarks2 = "Brochure sent via WhatsApp";
        requirement = "3 BHK"; budget = "60.1-70 Lacs";
        assignedSales = "Vikram Singh"; svRemark = "Client excited about amenities"; lossReason = "";
        svStatus = "Next Followup"; statusDate = "07/Apr/2026"; svNextFollowup = "12/Apr/2026";
        leadCloseStatus = "Open";
      },
      {
        id = 3; srNo = 3;
        leadDate = "25/Mar/2026"; firstName = "Rohit"; lastName = "Verma";
        mobileNo = "9823456789"; projectName = "Tech Park Plaza"; source = "MagicBricks";
        telecaller = "Priya Sharma";
        statusDates = [("notConnect","25/Mar/2026"),("shareBrochure","26/Mar/2026"),("followUp","30/Mar/2026"),("svDone","04/Apr/2026")];
        latestStatus = "SV Done"; latestStatusDate = "04/Apr/2026";
        remarks1 = "Site visit done, liked 3rd floor units"; remarks2 = "Follow-up done on 30/Mar";
        requirement = "SHOP"; budget = "80.1 to 1 Crore";
        assignedSales = "Anita Patel"; svRemark = "Very positive, sending final quote"; lossReason = "";
        svStatus = "Booking Done"; statusDate = "05/Apr/2026"; svNextFollowup = "";
        leadCloseStatus = "Open";
      },
      {
        id = 4; srNo = 4;
        leadDate = "10/Mar/2026"; firstName = "Sunita"; lastName = "Patel";
        mobileNo = "9765432109"; projectName = "Skyline Heights"; source = "Reference";
        telecaller = "Rahul Mehta";
        statusDates = [("notConnect","10/Mar/2026"),("lost","15/Mar/2026")];
        latestStatus = "Lost"; latestStatusDate = "15/Mar/2026";
        remarks1 = "Budget too high for client"; remarks2 = "Called 3 times, not interested";
        requirement = "1 BHK"; budget = "30 Lacs";
        assignedSales = ""; svRemark = ""; lossReason = "Budget constraint";
        svStatus = "Lead Close"; statusDate = "15/Mar/2026"; svNextFollowup = "";
        leadCloseStatus = "Lead Close";
      },
      {
        id = 5; srNo = 5;
        leadDate = "05/Apr/2026"; firstName = "Kiran"; lastName = "Joshi";
        mobileNo = "9812345678"; projectName = "Green Valley"; source = "Walk-in";
        telecaller = "Priya Sharma";
        statusDates = [("notConnect","05/Apr/2026"),("shareBrochure","06/Apr/2026")];
        latestStatus = "Share Brochure"; latestStatusDate = "06/Apr/2026";
        remarks1 = "Asked for Green Valley brochure details"; remarks2 = "";
        requirement = "2 BHK"; budget = "50.1-60 Lacs";
        assignedSales = ""; svRemark = ""; lossReason = "";
        svStatus = ""; statusDate = ""; svNextFollowup = "";
        leadCloseStatus = "Open";
      },
      {
        id = 6; srNo = 6;
        leadDate = "28/Mar/2026"; firstName = "Deepak"; lastName = "Nair";
        mobileNo = "9834567890"; projectName = "Skyline Heights"; source = "Google Ads";
        telecaller = "Rahul Mehta";
        statusDates = [("notConnect","28/Mar/2026"),("shareBrochure","29/Mar/2026"),("followUp","02/Apr/2026"),("svPlan","08/Apr/2026")];
        latestStatus = "SV Plan"; latestStatusDate = "08/Apr/2026";
        remarks1 = "Confirmed visit for 10th April"; remarks2 = "Very interested in 4BHK penthouse";
        requirement = "4 BHK"; budget = "1 Cr to 1.5 Cr";
        assignedSales = "Vikram Singh"; svRemark = "Premium client, handle carefully"; lossReason = "";
        svStatus = "SV Rescheduled"; statusDate = "08/Apr/2026"; svNextFollowup = "10/Apr/2026";
        leadCloseStatus = "Open";
      },
      {
        id = 7; srNo = 7;
        leadDate = "01/Apr/2026"; firstName = "Pooja"; lastName = "Singh";
        mobileNo = "9856789012"; projectName = "Tech Park Plaza"; source = "Housing.com";
        telecaller = "Priya Sharma";
        statusDates = [("notConnect","01/Apr/2026")];
        latestStatus = "Not Connect"; latestStatusDate = "01/Apr/2026";
        remarks1 = "Number not reachable"; remarks2 = "";
        requirement = "SHOP"; budget = "70.1-80 Lacs";
        assignedSales = ""; svRemark = ""; lossReason = "";
        svStatus = ""; statusDate = ""; svNextFollowup = "";
        leadCloseStatus = "Open";
      },
      {
        id = 8; srNo = 8;
        leadDate = "15/Mar/2026"; firstName = "Vivek"; lastName = "Reddy";
        mobileNo = "9878901234"; projectName = "Green Valley"; source = "Facebook";
        telecaller = "Rahul Mehta";
        statusDates = [("notConnect","15/Mar/2026"),("shareBrochure","16/Mar/2026"),("followUp","20/Mar/2026"),("svPlan","01/Apr/2026"),("svDone","06/Apr/2026")];
        latestStatus = "SV Done"; latestStatusDate = "06/Apr/2026";
        remarks1 = "Completed site visit, interested in booking"; remarks2 = "2nd follow-up on 20 March";
        requirement = "3 BHK"; budget = "70.1-80 Lacs";
        assignedSales = "Anita Patel"; svRemark = "Wants corner unit on floor 5"; lossReason = "";
        svStatus = "Registration Done"; statusDate = "09/Apr/2026"; svNextFollowup = "";
        leadCloseStatus = "Open";
      },
      {
        id = 9; srNo = 9;
        leadDate = "07/Apr/2026"; firstName = "Neha"; lastName = "Kulkarni";
        mobileNo = "9845678901"; projectName = "Skyline Heights"; source = "NoBroker";
        telecaller = "Priya Sharma";
        statusDates = [("notConnect","07/Apr/2026"),("shareBrochure","08/Apr/2026")];
        latestStatus = "Share Brochure"; latestStatusDate = "08/Apr/2026";
        remarks1 = "WhatsApp brochure sent"; remarks2 = "";
        requirement = "2 BHK"; budget = "40.1-50 Lacs";
        assignedSales = ""; svRemark = ""; lossReason = "";
        svStatus = ""; statusDate = ""; svNextFollowup = "";
        leadCloseStatus = "Open";
      },
      {
        id = 10; srNo = 10;
        leadDate = "03/Apr/2026"; firstName = "Suresh"; lastName = "Yadav";
        mobileNo = "9867890123"; projectName = "Tech Park Plaza"; source = "Reference";
        telecaller = "Rahul Mehta";
        statusDates = [("notConnect","03/Apr/2026"),("shareBrochure","04/Apr/2026"),("followUp","07/Apr/2026"),("svPlan","10/Apr/2026")];
        latestStatus = "SV Plan"; latestStatusDate = "10/Apr/2026";
        remarks1 = "Needs commercial shop for textile business"; remarks2 = "Brochure sent 4th April";
        requirement = "SHOP"; budget = "Above 1.5 Cr";
        assignedSales = "Vikram Singh"; svRemark = ""; lossReason = "";
        svStatus = "Next Followup"; statusDate = "10/Apr/2026"; svNextFollowup = "13/Apr/2026";
        leadCloseStatus = "Open";
      },
    ];
    for (l in seedLeads.values()) { leads.add(l) };
  };

  // ── Seed: Sample Call History ─────────────────────────────────────────────
  do {
    let seedCalls : [UserTypes.CallHistory] = [
      { date = "05/Apr/2026"; name = "Arjun Sharma";  mobile = "9876543210"; status = "Follow-up";     remark = "Interested in 2BHK";         telecaller = "Priya Sharma"; projectName = "Skyline Heights" },
      { date = "07/Apr/2026"; name = "Meena Gupta";   mobile = "9871234567"; status = "SV Plan";       remark = "SV Saturday scheduled";       telecaller = "Rahul Mehta";  projectName = "Green Valley"   },
      { date = "06/Apr/2026"; name = "Kiran Joshi";   mobile = "9812345678"; status = "Share Brochure"; remark = "Brochure sent on WhatsApp";   telecaller = "Priya Sharma"; projectName = "Green Valley"   },
      { date = "08/Apr/2026"; name = "Neha Kulkarni"; mobile = "9845678901"; status = "Share Brochure"; remark = "WhatsApp brochure sent";      telecaller = "Priya Sharma"; projectName = "Skyline Heights"},
      { date = "08/Apr/2026"; name = "Deepak Nair";   mobile = "9834567890"; status = "SV Plan";       remark = "Confirmed visit 10th April";   telecaller = "Rahul Mehta";  projectName = "Skyline Heights"},
    ];
    for (c in seedCalls.values()) { callHistory.add(c) };
  };

  // ── Seed: Sample Sales Call History ──────────────────────────────────────
  do {
    let seedSalesCalls : [UserTypes.SalesCallHistory] = [
      { date = "06/Apr/2026"; name = "Arjun Sharma"; mobile = "9876543210"; status = "Next Followup";    remark = "Discussed amenities";        salesPerson = "Anita Patel";  projectName = "Skyline Heights" },
      { date = "07/Apr/2026"; name = "Meena Gupta";  mobile = "9871234567"; status = "Next Followup";    remark = "Client very excited";        salesPerson = "Vikram Singh"; projectName = "Green Valley"   },
      { date = "09/Apr/2026"; name = "Vivek Reddy";  mobile = "9878901234"; status = "Registration Done"; remark = "Registration paperwork done"; salesPerson = "Anita Patel"; projectName = "Green Valley"   },
    ];
    for (sc in seedSalesCalls.values()) { salesCallHistory.add(sc) };
  };

  // ── Seed: Sample Tasks ────────────────────────────────────────────────────
  do {
    let seedTasks : [TaskTypes.Task] = [
      {
        taskId = 1; assignedTo = "Priya Sharma"; role = "Telecaller";
        taskTitle = "Follow-up with Arjun Sharma";
        description = "Call Arjun and confirm SV date for Skyline Heights";
        dueDate = "12/Apr/2026"; leadSr = 1; status = "Pending";
        createdDate = "09/Apr/2026"; createdBy = "Admin User";
      },
      {
        taskId = 2; assignedTo = "Rahul Mehta"; role = "Telecaller";
        taskTitle = "Call back Deepak Nair";
        description = "Premium client – confirm SV rescheduled to 10/Apr";
        dueDate = "10/Apr/2026"; leadSr = 6; status = "InProgress";
        createdDate = "08/Apr/2026"; createdBy = "Admin User";
      },
      {
        taskId = 3; assignedTo = "Anita Patel"; role = "Sales";
        taskTitle = "Send quote to Arjun Sharma";
        description = "Prepare pricing sheet for 2BHK units in Skyline Heights";
        dueDate = "11/Apr/2026"; leadSr = 1; status = "Pending";
        createdDate = "09/Apr/2026"; createdBy = "Admin User";
      },
      {
        taskId = 4; assignedTo = "Vikram Singh"; role = "Sales";
        taskTitle = "SV Follow-up Meena Gupta";
        description = "Follow-up after Saturday site visit Green Valley";
        dueDate = "13/Apr/2026"; leadSr = 2; status = "Pending";
        createdDate = "07/Apr/2026"; createdBy = "Admin User";
      },
    ];
    for (t in seedTasks.values()) { tasks.add(t) };
    nextTaskId.value := 5;
  };

  // ── Mixin composition ────────────────────────────────────────────────────
  include LeadsMixin(leads, schemaDefs, nextLeadId);
  include UsersMixin(telecallers, callHistory, salesCallHistory, projects);
  include TasksMixin(tasks, nextTaskId);
  include InqMixin(softwareInquiries, projectInquiries, nextInquiryId);
};
