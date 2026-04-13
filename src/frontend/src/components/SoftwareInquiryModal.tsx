import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { useAddSoftwareInquiry } from "../hooks/useProjects";

interface SoftwareInquiryModalProps {
  onClose: () => void;
}

export function SoftwareInquiryModal({ onClose }: SoftwareInquiryModalProps) {
  const addInquiry = useAddSoftwareInquiry();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
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
      setError("Please enter a valid mobile number (7-15 digits).");
      return;
    }
    try {
      await addInquiry.mutateAsync({
        name: name.trim(),
        mobile: mobile.trim(),
      });
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      data-ocid="modal-software-inquiry"
    >
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

      <div className="relative z-10 w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 bg-primary">
          <div>
            <h2 className="font-display font-semibold text-primary-foreground text-base">
              Software Inquiry
            </h2>
            <p className="text-primary-foreground/60 text-xs font-body mt-0.5">
              Interested in PropFlow CRM? Contact us!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="btn-close-sw-modal"
            className="p-1 rounded-lg text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div
              className="flex flex-col items-center gap-4 py-4 text-center"
              data-ocid="sw-inquiry-success"
            >
              <CheckCircle2
                size={48}
                className="text-emerald-500"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  Dhanyavaad!
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-1">
                  Hamari team aapko jald hi contact karegi.
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
              <div>
                <label
                  htmlFor="sw-name"
                  className="block text-sm font-body font-medium text-foreground mb-1.5"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="sw-name"
                  type="text"
                  data-ocid="input-sw-name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
              </div>

              <div>
                <label
                  htmlFor="sw-mobile"
                  className="block text-sm font-body font-medium text-foreground mb-1.5"
                >
                  Mobile Number <span className="text-destructive">*</span>
                </label>
                <input
                  id="sw-mobile"
                  type="tel"
                  data-ocid="input-sw-mobile"
                  placeholder="Your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  maxLength={15}
                />
              </div>

              {error && (
                <p
                  className="text-destructive text-sm font-body"
                  data-ocid="sw-error"
                >
                  {error}
                </p>
              )}

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
                  data-ocid="btn-sw-submit"
                  disabled={addInquiry.isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {addInquiry.isPending ? (
                    <span className="animate-spin w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full" />
                  ) : (
                    "Submit"
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
