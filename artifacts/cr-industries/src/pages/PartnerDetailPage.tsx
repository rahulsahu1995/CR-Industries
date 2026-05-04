import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { PARTNERS, type Partner } from "@/data/partners";

export default function PartnerDetailPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const reduce = useReducedMotion();
  const partner = PARTNERS.find((p) => p.id === params.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [params.id]);

  if (!partner) {
    return <PartnerNotFound />;
  }

  /* Find sibling partners for the "Other partners" strip */
  const others = PARTNERS.filter((p) => p.id !== partner.id);
  const currentIndex = PARTNERS.findIndex((p) => p.id === partner.id);
  const nextPartner = PARTNERS[(currentIndex + 1) % PARTNERS.length];

  return (
    <div className="bg-background">
      {/* Hero — brand-colored gradient */}
      <section
        className="relative mt-16 lg:mt-20 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
        }}
      >
        {/* Texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 45%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumbs */}
          <motion.nav
            initial={reduce ? undefined : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm font-semibold mb-6 sm:mb-8"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link
              href="/partners"
              className="hover:text-white transition-colors"
            >
              Partners
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white truncate">{partner.name}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-7 text-white">
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
                  Strategic Partner
                </span>
              </motion.div>

              <motion.h1
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-3 break-words"
              >
                {partner.name}
              </motion.h1>

              <motion.p
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/95 text-lg sm:text-xl font-semibold mb-5 leading-snug"
              >
                {partner.tagline}
              </motion.p>

              <motion.p
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-7"
              >
                {partner.summary}
              </motion.p>

              {/* Quick facts */}
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-3 max-w-lg"
              >
                {partner.facts.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.label}
                      className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-2.5"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="w-3 h-3 text-white" />
                        <span className="text-[9px] font-bold tracking-widest uppercase text-white/80">
                          {f.label}
                        </span>
                      </div>
                      <p className="text-white text-sm font-black leading-tight">
                        {f.value}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Logo card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={reduce ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative mx-auto max-w-md"
              >
                <div className="relative aspect-square rounded-3xl bg-white border border-white/40 shadow-2xl shadow-black/30 overflow-hidden">
                  {/* Brand tint glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${partner.accent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${partner.accent2} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top eyebrow */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold tracking-[0.3em] uppercase"
                      style={{ color: partner.accent }}
                    >
                      Strategic Partner
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                      style={{
                        backgroundColor: `${partner.accent}12`,
                        color: partner.accent,
                        border: `1px solid ${partner.accent}30`,
                      }}
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  </div>

                  {/* Logo */}
                  <div className="absolute inset-0 flex items-center justify-center px-10 py-16">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="block max-w-full max-h-full w-auto h-auto object-contain"
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className="w-40 h-40 rounded-3xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                        }}
                      >
                        <span className="text-white font-black text-7xl tracking-tighter">
                          {partner.monogram}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom plate */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-3.5 border-t flex items-center justify-between"
                    style={{
                      borderColor: `${partner.accent}1F`,
                      backgroundColor: `${partner.accent}08`,
                    }}
                  >
                    <div className="min-w-0">
                      <p
                        className="text-[9px] font-bold tracking-[0.3em] uppercase"
                        style={{ color: `${partner.accent}B0` }}
                      >
                        Partnership in Excellence
                      </p>
                      <p className="text-sm font-black leading-tight mt-0.5 text-foreground truncate">
                        {partner.name}
                      </p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm tracking-tighter shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                      }}
                    >
                      {partner.monogram}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro band */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
              style={{
                backgroundColor: `${partner.accent}10`,
                borderColor: `${partner.accent}30`,
                color: partner.accent,
              }}
            >
              <Handshake className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-widest uppercase">
                About the Partnership
              </span>
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight mb-4 leading-tight">
              {partner.tagline}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {partner.detail.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detail sections */}
      <section className="relative pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {partner.detail.sections.map((s, i) => (
              <motion.div
                key={s.heading}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300"
              >
                {/* Top brand strip */}
                <div
                  aria-hidden
                  className="absolute top-0 left-5 sm:left-6 right-5 sm:right-6 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                  }}
                />
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${partner.accent}15` }}
                  >
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: partner.accent }}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight mb-1.5">
                      {s.heading}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 text-white p-8 sm:p-10 text-center shadow-2xl shadow-black/30"
            style={{
              background:
                "linear-gradient(160deg, #0B1220 0%, #0F172A 55%, #020617 100%)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at 18% 18%, ${partner.accent}55 0%, transparent 55%), radial-gradient(circle at 82% 82%, ${partner.accent2}40 0%, transparent 55%)`,
              }}
            />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3">
                Want to know more about our work with {partner.shortName}?
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-7">
                Talk to our team about products, applications and how this
                partnership can power your project.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#03045E] font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#48CAE4] hover:text-white transition-colors duration-200"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Partners
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other partners */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-8 flex-wrap gap-3">
            <div>
              <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
                Continue Exploring
              </span>
              <h3 className="mt-1 text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Other Strategic Partners
              </h3>
            </div>
            <Link
              href={`/partners/${nextPartner.id}`}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-[#48CAE4] transition-colors"
            >
              Next: {nextPartner.shortName}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {others.map((p) => (
              <OtherPartnerCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────────────────────── */
function OtherPartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partners/${partner.id}`}
      className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div
        className="shrink-0 w-16 h-16 rounded-xl bg-white border flex items-center justify-center p-2 overflow-hidden"
        style={{ borderColor: `${partner.accent}30` }}
      >
        {partner.logo ? (
          <img
            src={partner.logo}
            alt=""
            className="block max-w-full max-h-full w-auto h-auto object-contain"
            loading="lazy"
          />
        ) : (
          <span
            className="font-black text-2xl tracking-tighter"
            style={{ color: partner.accent }}
          >
            {partner.monogram}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground mb-0.5">
          {partner.shortName}
        </p>
        <h4 className="text-base font-black text-foreground tracking-tight truncate group-hover:text-primary transition-colors">
          {partner.name}
        </h4>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
  );
}

/* ───────────────────────────────────────── */
function PartnerNotFound() {
  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center px-6 mt-16 lg:mt-20">
      <div className="text-center max-w-lg">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
          <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
            Partner Not Found
          </span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
          We couldn't find that partner.
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-7 leading-relaxed">
          The partner you're looking for may have moved or no longer exists.
          Browse all of our active strategic alliances.
        </p>
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-[#00B4D8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          See All Partners
        </Link>
      </div>
    </div>
  );
}
