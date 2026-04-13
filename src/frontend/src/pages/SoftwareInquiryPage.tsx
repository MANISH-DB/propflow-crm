import { Building2, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useAddSoftwareInquiry } from "../hooks/useProjects";
import type { SoftwareInquiry } from "../types";

export default function SoftwareInquiryPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const addInquiry = useAddSoftwareInquiry();

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

    const inquiry: SoftwareInquiry = {
      name: name.trim(),
      mobile: mobile.trim(),
    };

    try {
      await addInquiry.mutateAsync(inquiry);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo / branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg mb-4">
            <Building2 size={28} className="text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground tracking-wide">
            PropFlow
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1 uppercase tracking-widest">
            Real Estate CRM
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Header stripe */}
          <div className="bg-primary px-6 py-4">
            <h2 className="font-display font-semibold text-primary-foreground text-lg">
              Software Inquiry
            </h2>
            <p className="text-primary-foreground/70 text-xs font-body mt-0.5">
              Interested in PropFlow CRM? Leave your details and we'll get back
              to you.
            </p>
          </div>

          <div className="p-6">
            {submitted ? (
              /* Success state */
              <div
                className="flex flex-col items-center gap-4 py-6 text-center"
                data-ocid="inquiry-success"
              >
                <CheckCircle2
                  size={52}
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
                    Our team will contact you on{" "}
                    <span className="font-medium text-foreground">
                      {mobile}
                    </span>{" "}
                    shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setMobile("");
                  }}
                  className="mt-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-primary/90 transition-smooth"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="si-name"
                    className="block text-sm font-body font-medium text-foreground mb-1.5"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="si-name"
                    type="text"
                    data-ocid="input-si-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                    autoComplete="name"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label
                    htmlFor="si-mobile"
                    className="block text-sm font-body font-medium text-foreground mb-1.5"
                  >
                    Mobile Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="si-mobile"
                    type="tel"
                    data-ocid="input-si-mobile"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                    autoComplete="tel"
                    maxLength={15}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="text-destructive text-sm font-body"
                    data-ocid="si-error"
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  data-ocid="btn-si-submit"
                  disabled={addInquiry.isPending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {addInquiry.isPending ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Branding */}
        <p className="text-center text-xs text-muted-foreground font-body mt-6">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
