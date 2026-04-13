import {
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  useAddProjectInquiry,
  useUniqueProjectNames,
} from "../hooks/useProjects";
import type { ProjectInquiry } from "../types";
import { fromInputDate, toInputDate } from "../utils/dateUtils";

// ---- Trigger button ----
interface ProjectInquiryButtonProps {
  className?: string;
}

export function ProjectInquiryButton({
  className = "",
}: ProjectInquiryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-ocid="btn-project-inquiry"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-accent/90 transition-smooth shadow-sm ${className}`}
      >
        <ClipboardList size={14} />
        Project Inquiry
      </button>

      {open && <ProjectInquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}

// ---- Modal ----
interface ProjectInquiryModalProps {
  onClose: () => void;
}

export function ProjectInquiryModal({ onClose }: ProjectInquiryModalProps) {
  const { data: projectNames = [] } = useUniqueProjectNames();
  const addInquiry = useAddProjectInquiry();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [projectName, setProjectName] = useState("");
  const [svDate, setSvDate] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!mobile.trim() || !/^\d{7,15}$/.test(mobile.trim())) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (!projectName) {
      setError("Please select a project.");
      return;
    }

    const inquiry: ProjectInquiry = {
      id: BigInt(0),
      srNo: BigInt(0),
      name: name.trim(),
      mobile: mobile.trim(),
      projectName,
      svPlan: svDate ? fromInputDate(svDate) : "",
      source: "Web",
    };

    try {
      await addInquiry.mutateAsync(inquiry);
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      data-ocid="modal-project-inquiry"
    >
      {/* Click outside to close */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
        className="absolute inset-0"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 bg-primary">
          <div className="flex items-center gap-3">
            <Building2 size={20} className="text-primary-foreground/80" />
            <div>
              <h2 className="font-display font-semibold text-primary-foreground text-base">
                Project Inquiry
              </h2>
              <p className="text-primary-foreground/60 text-xs font-body mt-0.5">
                Interested in a property? Fill this form.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="btn-close-inquiry-modal"
            className="p-1 rounded-lg text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            /* Success */
            <div
              className="flex flex-col items-center gap-4 py-4 text-center"
              data-ocid="inquiry-project-success"
            >
              <CheckCircle2
                size={48}
                className="text-emerald-500"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  Inquiry Submitted!
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-1">
                  Thank you,{" "}
                  <span className="font-medium text-foreground">{name}</span>.
                  We'll reach out to you on{" "}
                  <span className="font-medium text-foreground">{mobile}</span>{" "}
                  soon.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-primary/90 transition-smooth"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="pi-name"
                  className="block text-sm font-body font-medium text-foreground mb-1.5"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="pi-name"
                  type="text"
                  data-ocid="input-pi-name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="pi-mobile"
                  className="block text-sm font-body font-medium text-foreground mb-1.5"
                >
                  Mobile Number <span className="text-destructive">*</span>
                </label>
                <input
                  id="pi-mobile"
                  type="tel"
                  data-ocid="input-pi-mobile"
                  placeholder="Your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  maxLength={15}
                />
              </div>

              {/* Project Name */}
              <div>
                <label
                  htmlFor="pi-project"
                  className="block text-sm font-body font-medium text-foreground mb-1.5"
                >
                  Project Name <span className="text-destructive">*</span>
                </label>
                <select
                  id="pi-project"
                  data-ocid="select-pi-project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                >
                  <option value="">Select a project…</option>
                  {projectNames.map((pn) => (
                    <option key={pn} value={pn}>
                      {pn}
                    </option>
                  ))}
                </select>
              </div>

              {/* SV Plan Date (optional) */}
              <div>
                <label
                  htmlFor="pi-sv-date"
                  className="block text-sm font-body font-medium text-foreground mb-1.5"
                >
                  <Calendar size={13} className="inline mr-1" />
                  Site Visit Plan Date{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="pi-sv-date"
                  type="date"
                  data-ocid="input-pi-sv-date"
                  value={svDate}
                  min={toInputDate(new Date())}
                  onChange={(e) => setSvDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  className="text-destructive text-sm font-body"
                  data-ocid="pi-error"
                >
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground font-body text-sm hover:bg-muted transition-smooth"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-ocid="btn-pi-submit"
                  disabled={addInquiry.isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {addInquiry.isPending ? (
                    <span className="animate-spin w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full" />
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
