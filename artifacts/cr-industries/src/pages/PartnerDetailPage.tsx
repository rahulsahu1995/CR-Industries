import { useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Globe,
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

  /* Parallax for the editorial pillars section background */
  const pillarsRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: pillarsProgress } = useScroll({
    target: pillarsRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(
    pillarsProgress,
    [0, 1],
    reduce ? [0, 0] : [80, -120],
  );
  const blob2Y = useTransform(
    pillarsProgress,
    [0, 1],
    reduce ? [0, 0] : [-60, 100],
  );
  const blob1Opacity = useTransform(
    pillarsProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.55, 0.45, 0],
  );
  const blob2Opacity = useTransform(
    pillarsProgress,
    [0, 0.25, 0.75, 1],
    [0, 0.5, 0.4, 0],
  );

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
                {partner.facts.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.label}
                      initial={reduce ? undefined : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.45 + i * 0.07 }}
                      whileHover={
                        reduce
                          ? undefined
                          : { scale: 1.04, y: -3 }
                      }
                      className="group rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-2.5 hover:bg-white/20 hover:border-white/40 transition-colors duration-300 cursor-default"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="w-3 h-3 text-white transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />
                        <span className="text-[9px] font-bold tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
                          {f.label}
                        </span>
                      </div>
                      <p className="text-white text-sm font-black leading-tight">
                        {f.value}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Hero CTAs — Visit Website + Talk To Us */}
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                {partner.website && (
                  <motion.a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reduce ? undefined : { scale: 1.04, y: -2 }
                    }
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-foreground font-bold text-sm rounded-xl shadow-lg shadow-black/20 hover:shadow-xl transition-shadow duration-200"
                    style={{ color: partner.accent }}
                    aria-label={`Visit ${partner.name} official website (opens in new tab)`}
                  >
                    <Globe className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                    Visit {partner.shortName}
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                )}
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={
                    reduce ? undefined : { scale: 1.04, y: -2 }
                  }
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-white font-bold text-sm rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-colors duration-200"
                >
                  Talk to Our Team
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
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
                style={{ perspective: 1000 }}
              >
                {/* Soft animated halo behind the card */}
                <motion.div
                  aria-hidden
                  className="absolute -inset-6 rounded-[2.5rem] blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${partner.accent}66, transparent 60%), radial-gradient(circle at 70% 70%, ${partner.accent2}55, transparent 60%)`,
                  }}
                  animate={
                    reduce
                      ? undefined
                      : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }
                  }
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          scale: 1.03,
                          rotateY: -4,
                          rotateX: 3,
                          transition: { duration: 0.4, ease: "easeOut" },
                        }
                  }
                  className="relative aspect-square rounded-3xl bg-white border border-white/40 shadow-2xl shadow-black/30 overflow-hidden will-change-transform"
                >
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
                      <motion.img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="block max-w-full max-h-full w-auto h-auto object-contain"
                        loading="eager"
                        decoding="async"
                        animate={
                          reduce ? undefined : { scale: [1, 1.03, 1] }
                        }
                        transition={{
                          duration: 7,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
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
                </motion.div>
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
              {partner.detail.heading ?? partner.tagline}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {partner.detail.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Pillars — editorial typography layout */}
      <section
        ref={pillarsRef}
        className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden"
      >
        {/* Parallax brand-tinted background blobs */}
        <motion.div
          aria-hidden
          style={{
            y: blob1Y,
            opacity: blob1Opacity,
            background: `radial-gradient(circle at 50% 50%, ${partner.accent} 0%, transparent 65%)`,
          }}
          className="pointer-events-none absolute -top-32 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl"
        />
        <motion.div
          aria-hidden
          style={{
            y: blob2Y,
            opacity: blob2Opacity,
            background: `radial-gradient(circle at 50% 50%, ${partner.accent2} 0%, transparent 65%)`,
          }}
          className="pointer-events-none absolute -bottom-32 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl"
        />
        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Section eyebrow */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16 text-center"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border"
              style={{
                backgroundColor: `${partner.accent}10`,
                borderColor: `${partner.accent}30`,
                color: partner.accent,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-widest uppercase">
                Partnership Pillars
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.05]">
              What drives our work with{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {partner.shortName}
              </span>
            </h2>
          </motion.div>

          {/* Editorial list of pillars */}
          <ol className="relative">
            {partner.detail.sections.map((s, i) => (
              <motion.li
                key={s.heading}
                initial={reduce ? undefined : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative py-5 sm:py-6 border-b border-border/60 last:border-0 list-none"
                style={
                  {
                    ["--partner-accent" as string]: partner.accent,
                  } as React.CSSProperties
                }
              >
                {/* Heading with sliding underline + color shift on hover */}
                <h3 className="mb-3 sm:mb-3.5">
                  <span className="relative inline-block text-2xl sm:text-3xl md:text-[2.25rem] font-black tracking-tight leading-[1.15] text-foreground transition-colors duration-300 cursor-default group-hover:text-[color:var(--partner-accent)]">
                    {s.heading}
                    {/* Sliding underline */}
                    <span
                      aria-hidden
                      className="absolute left-0 -bottom-1.5 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                      }}
                    />
                  </span>
                </h3>

                {/* Body */}
                <p className="text-base sm:text-lg text-muted-foreground leading-[1.75] max-w-2xl">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery — only when partner has images */}
      {partner.gallery && partner.gallery.length > 0 && (
        <section className="relative pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-10"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border"
                style={{
                  backgroundColor: `${partner.accent}10`,
                  borderColor: `${partner.accent}30`,
                  color: partner.accent,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold tracking-widest uppercase">
                  In Pictures
                </span>
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                Inside {partner.shortName}
              </h3>
            </motion.div>

            <div
              className={`grid gap-4 sm:gap-5 ${
                partner.gallery.length === 1
                  ? "grid-cols-1"
                  : partner.gallery.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {partner.gallery.map((img, i) => (
                <motion.figure
                  key={img.src}
                  initial={reduce ? undefined : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={
                    reduce ? undefined : { y: -6, transition: { duration: 0.3 } }
                  }
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-md shadow-foreground/5 hover:shadow-2xl hover:shadow-foreground/10 transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    {/* Accent corner ribbon — grows on hover */}
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                      style={{
                        background: `linear-gradient(90deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                      }}
                    />
                    {/* Hover overlay — subtle brand-tinted veil */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(180deg, transparent 40%, ${partner.accent}55 100%)`,
                      }}
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border bg-background transition-colors duration-300 group-hover:bg-muted/30">
                      {img.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

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
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={
                    reduce ? undefined : { scale: 1.04, y: -2 }
                  }
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#03045E] font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#48CAE4] hover:text-white transition-colors duration-200"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                {partner.website && (
                  <motion.a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reduce ? undefined : { scale: 1.04, y: -2 }
                    }
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className="group inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors duration-200"
                    aria-label={`Visit ${partner.name} official website (opens in new tab)`}
                  >
                    <Globe className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                    Visit {partner.shortName}
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </motion.a>
                )}
                <Link
                  href="/partners"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
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
