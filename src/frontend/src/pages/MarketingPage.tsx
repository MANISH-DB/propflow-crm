import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  ChevronRight,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { ProjectInquiryModal } from "../components/ProjectInquiryModal";
import { SoftwareInquiryModal } from "../components/SoftwareInquiryModal";

// ── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <Users size={22} />,
    title: "Smart Lead Management",
    desc: "Track every lead from first call to final booking. Status dates, remarks, and full history — nothing slips through.",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: <Shield size={22} />,
    title: "Role-Based Access",
    desc: "Separate dashboards for Telecaller, Sales Person, and Admin. Each role sees exactly what they need.",
    color: "from-violet-500/20 to-violet-600/10 border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    icon: <Phone size={22} />,
    title: "Real-Time Call Logs",
    desc: "Every call tracked with date, status, and remark. All Call Log, Today Call Log, and live count at a glance.",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "WhatsApp Integration",
    desc: "Send project brochures directly from any lead card. One-click WhatsApp message with pre-filled content.",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Advanced Reports",
    desc: "Telecaller performance, project summary, lead aging, monthly trends, conversion funnel — all in one dashboard.",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: <MonitorSmartphone size={22} />,
    title: "Mobile Optimized",
    desc: "Switch between mobile card view and desktop table view. Works perfectly on phones, tablets, and desktops.",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/30",
    iconColor: "text-rose-400",
  },
  {
    icon: <Zap size={22} />,
    title: "Lightning Fast Search",
    desc: "Filter by name, mobile, remark, status date in milliseconds. In-memory filtering with live result counts.",
    color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
    iconColor: "text-yellow-400",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Site Visit Tracking",
    desc: "Complete SV pipeline: Plan → Rescheduled → Done → Booking → Registration. Never miss a site visit.",
    color: "from-teal-500/20 to-teal-600/10 border-teal-500/30",
    iconColor: "text-teal-400",
  },
];

// ── Stats ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: "100%", label: "Lead Visibility" },
  { value: "3x", label: "Faster Follow-ups" },
  { value: "Zero", label: "Lead Slippage" },
  { value: "Real-time", label: "Call Tracking" },
];

// ── Testimonials ────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    text: "PropFlow completely transformed how our telecallers manage leads. Every follow-up is tracked, nothing is missed.",
    author: "Rajesh Kumar",
    role: "Sales Manager",
  },
  {
    text: "The site visit pipeline is brilliant. We can see exactly where every lead is in the buying journey.",
    author: "Priya Sharma",
    role: "Real Estate Director",
  },
  {
    text: "Admin reports give me instant visibility into team performance. The WhatsApp brochure feature is a game changer.",
    author: "Amit Patel",
    role: "Business Owner",
  },
];

// ── Main Component ──────────────────────────────────────────────────────────

export default function MarketingPage() {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showSWInquiry, setShowSWInquiry] = useState(false);
  const [showPIInquiry, setShowPIInquiry] = useState(false);

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen flex flex-col marketing-page">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 marketing-nav border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl marketing-logo-bg flex items-center justify-center shadow-lg">
            <Building2 size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            PropFlow
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToFeatures}
            className="text-white/70 hover:text-white text-sm font-body transition-colors hidden sm:block"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => setShowSWInquiry(true)}
            data-ocid="btn-nav-sw-inquiry"
            className="text-white/70 hover:text-white text-sm font-body transition-colors hidden sm:block"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/login" })}
            data-ocid="btn-nav-login"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl marketing-cta-btn text-white text-sm font-body font-semibold transition-smooth shadow-md"
          >
            Login
            <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/propflow-hero.dim_1200x600.jpg"
            alt="PropFlow CRM visualization"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 marketing-hero-overlay" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 marketing-orb-1 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 marketing-orb-2 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full marketing-badge border border-white/20 mb-8">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-white/80 text-xs font-body tracking-wide">
              India's Smartest Real Estate CRM
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display font-black leading-none mb-4">
            <span
              className="block text-white"
              style={{ fontSize: "clamp(48px,8vw,88px)" }}
            >
              Close More Deals.
            </span>
            <span
              className="block marketing-orange-text"
              style={{ fontSize: "clamp(48px,8vw,88px)" }}
            >
              Zero Lead Slippage.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/65 text-lg font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            PropFlow CRM helps real estate teams manage every lead, telecaller,
            site visit and follow-up — from first call to booking done.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              data-ocid="btn-hero-open-crm"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl marketing-btn-primary text-white font-display font-bold text-base transition-smooth shadow-xl hover:-translate-y-0.5"
            >
              Open CRM Dashboard
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              onClick={scrollToFeatures}
              data-ocid="btn-hero-see-features"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl marketing-btn-ghost text-white font-display font-semibold text-base transition-smooth border border-white/30 hover:border-white/60 hover:bg-white/10"
            >
              See Features
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-xl marketing-stat-card border border-white/10"
              >
                <span className="font-display font-black text-2xl text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-white/50 text-xs font-body mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2.5 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section
        ref={featuresRef}
        id="features"
        className="py-24 px-6 marketing-features-bg"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Zap size={12} className="text-amber-400" />
              <span className="text-white/60 text-xs font-body">
                Everything you need
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
              Why PropFlow?
            </h2>
            <p className="text-white/50 text-base font-body max-w-xl mx-auto">
              Built specifically for Indian real estate teams. Every feature
              designed to close more deals, faster.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className={`p-5 rounded-2xl border bg-gradient-to-br transition-smooth hover:-translate-y-1 hover:shadow-xl ${feature.color}`}
                data-ocid={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${feature.iconColor}`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-white text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-xs font-body leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 marketing-testimonials-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl text-white mb-3">
              Trusted by Real Estate Teams
            </h2>
            <p className="text-white/50 text-sm font-body">
              Join hundreds of teams closing deals with PropFlow
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="p-6 rounded-2xl marketing-testimonial-card border border-white/10"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-white/70 text-sm font-body leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div>
                  <p className="text-white font-display font-semibold text-sm">
                    {t.author}
                  </p>
                  <p className="text-white/40 text-xs font-body">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Section ── */}
      <section
        id="inquiry"
        className="py-20 px-6 marketing-inquiry-bg"
        data-ocid="inquiry-section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-black text-4xl text-white mb-4">
            Get Started Today
          </h2>
          <p className="text-white/60 text-base font-body mb-12">
            Whether you're interested in our software or one of our featured
            projects, we're here to help.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Software Inquiry */}
            <div className="p-8 rounded-2xl marketing-inquiry-card border border-white/10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-5">
                <Zap size={20} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                Adopt PropFlow CRM
              </h3>
              <p className="text-white/55 text-sm font-body mb-6 leading-relaxed">
                Transform your real estate team with world-class lead
                management. Get a free demo today.
              </p>
              <button
                type="button"
                onClick={() => setShowSWInquiry(true)}
                data-ocid="btn-sw-inquiry-open"
                className="flex items-center gap-2 px-6 py-3 rounded-xl marketing-btn-primary text-white font-body font-semibold text-sm transition-smooth shadow-md hover:-translate-y-0.5"
              >
                <Zap size={14} />
                Software Inquiry
              </button>
            </div>

            {/* Project Inquiry */}
            <div className="p-8 rounded-2xl marketing-inquiry-card border border-white/10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-5">
                <Building2 size={20} className="text-amber-400" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">
                Explore Our Projects
              </h3>
              <p className="text-white/55 text-sm font-body mb-6 leading-relaxed">
                Interested in buying a property? Browse our projects and book a
                site visit with our team.
              </p>
              <button
                type="button"
                onClick={() => setShowPIInquiry(true)}
                data-ocid="btn-pi-inquiry-open"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-body font-semibold text-sm transition-smooth hover:bg-amber-500/30 hover:-translate-y-0.5"
              >
                <Building2 size={14} />
                Project Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 marketing-footer-bg border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl marketing-logo-bg flex items-center justify-center">
              <Building2 size={13} className="text-white" />
            </div>
            <span className="font-display font-bold text-white/80 text-sm">
              PropFlow CRM
            </span>
          </div>
          <p className="text-white/35 text-xs font-body text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white/80 underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs font-body text-white/40">
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              className="hover:text-white/70 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setShowSWInquiry(true)}
              className="hover:text-white/70 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      {showSWInquiry && (
        <SoftwareInquiryModal onClose={() => setShowSWInquiry(false)} />
      )}
      {showPIInquiry && (
        <ProjectInquiryModal onClose={() => setShowPIInquiry(false)} />
      )}

      <style>{`
        .marketing-page {
          background: oklch(0.12 0.04 255);
        }
        .marketing-nav {
          background: oklch(0.12 0.04 255 / 0.85);
          backdrop-filter: blur(16px);
        }
        .marketing-logo-bg {
          background: linear-gradient(135deg, oklch(0.35 0.20 260), oklch(0.42 0.22 255));
        }
        .marketing-hero-overlay {
          background: linear-gradient(
            to bottom,
            oklch(0.12 0.04 255 / 0.7) 0%,
            oklch(0.12 0.04 255 / 0.5) 50%,
            oklch(0.12 0.04 255 / 0.9) 100%
          );
        }
        .marketing-orb-1 {
          background: oklch(0.45 0.22 260);
        }
        .marketing-orb-2 {
          background: oklch(0.65 0.20 70);
        }
        .marketing-badge {
          background: oklch(0.20 0.06 255 / 0.8);
        }
        .marketing-orange-text {
          background: linear-gradient(135deg, oklch(0.72 0.20 55) 0%, oklch(0.80 0.18 70) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .marketing-btn-primary {
          background: linear-gradient(135deg, oklch(0.35 0.20 260) 0%, oklch(0.42 0.22 255) 100%);
          box-shadow: 0 4px 24px oklch(0.35 0.20 260 / 0.5);
        }
        .marketing-btn-primary:hover {
          background: linear-gradient(135deg, oklch(0.40 0.22 260) 0%, oklch(0.47 0.24 255) 100%);
          box-shadow: 0 6px 32px oklch(0.35 0.20 260 / 0.6);
        }
        .marketing-btn-ghost {
          background: transparent;
        }
        .marketing-cta-btn {
          background: linear-gradient(135deg, oklch(0.35 0.20 260), oklch(0.42 0.22 255));
        }
        .marketing-cta-btn:hover {
          filter: brightness(1.1);
        }
        .marketing-stat-card {
          background: oklch(0.18 0.06 255 / 0.6);
          backdrop-filter: blur(8px);
        }
        .marketing-features-bg {
          background: oklch(0.15 0.05 258);
        }
        .marketing-testimonials-bg {
          background: oklch(0.12 0.04 255);
        }
        .marketing-testimonial-card {
          background: oklch(0.18 0.06 255 / 0.7);
          backdrop-filter: blur(8px);
        }
        .marketing-inquiry-bg {
          background: linear-gradient(
            135deg,
            oklch(0.17 0.06 260) 0%,
            oklch(0.13 0.04 258) 100%
          );
        }
        .marketing-inquiry-card {
          background: oklch(0.20 0.06 255 / 0.6);
          backdrop-filter: blur(12px);
        }
        .marketing-footer-bg {
          background: oklch(0.10 0.03 255);
        }
      `}</style>
    </div>
  );
}
