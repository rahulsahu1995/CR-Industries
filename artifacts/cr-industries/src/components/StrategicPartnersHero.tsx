import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { PARTNERS, type Partner } from "@/data/partners";

/* ────────────────────────────────────────────────────────────────────
   Strategic Partners — primary landing hero
   Auto-playing carousel of 4 real partners with detail modal.
   ──────────────────────────────────────────────────────────────────── */


const INTERVAL = 6500;

export default function StrategicPartnersHero() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  /* Tracks the element that opened the modal — focus is restored here on close */
  const exploreBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const partner = PARTNERS[active];

  const handleOpen = useCallback((id: string) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setOpenId(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenId(null);
    /* Restore focus on next tick so the modal has fully unmounted */
    requestAnimationFrame(() => {
      (triggerRef.current ?? exploreBtnRef.current)?.focus({
        preventScroll: true,
      });
    });
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActive((c) => (c + 1) % PARTNERS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((c) => (c - 1 + PARTNERS.length) % PARTNERS.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      if (i === active) return;
      setDirection(i > active ? 1 : -1);
      setActive(i);
    },
    [active],
  );

  /* Autoplay — pauses on hover or while modal is open */
  useEffect(() => {
    if (paused || openId) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, openId, next]);

  const openPartner = PARTNERS.find((p) => p.id === openId) ?? null;

  return (
    <section
      id="home"
      className="relative bg-background overflow-hidden pt-24 lg:pt-28 pb-6 lg:pb-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative orbs + dot grid (consistent with site aesthetic) */}
      <div
        aria-hidden
        className="absolute top-20 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,150,199,0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(72,202,228,0.18) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(3,4,94,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
              Strategic Alliances
            </span>
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Our <span className="text-primary">Strategic Partners</span>
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl">
            World-class manufacturers and innovators who power C R Industries'
            commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── LEFT — text column ── */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-muted-foreground/80 text-[11px] tracking-widest uppercase font-bold">
                {partner.shortName}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`block-${active}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-foreground leading-[1.05] tracking-tight mb-4 break-words">
                  {partner.name}
                </h1>
                <p className="text-foreground/85 text-base md:text-lg font-semibold mb-3 leading-snug">
                  {partner.tagline}
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mb-7">
                  {partner.summary}
                </p>

                {/* Facts strip */}
                <div className="grid grid-cols-3 gap-2.5 mb-7 max-w-md">
                  {partner.facts.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.label}
                        className="bg-card border border-border rounded-xl p-2.5 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="w-3 h-3 text-primary" />
                          <span className="text-[9px] tracking-widest uppercase font-bold text-muted-foreground">
                            {f.label}
                          </span>
                        </div>
                        <p className="font-black text-foreground text-xs md:text-sm leading-tight">
                          {f.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                ref={exploreBtnRef}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpen(partner.id)}
                className="group flex items-center gap-2 px-6 py-3 text-sm bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:bg-[#00B4D8] transition-colors duration-200"
              >
                Explore Partnership
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 text-sm text-foreground font-bold rounded-xl border-2 border-border hover:border-primary hover:text-primary transition-colors duration-200"
              >
                Become a Partner
              </motion.button>
            </motion.div>
          </div>

          {/* ── RIGHT — branded partner card ── */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-[400px] aspect-square">
              {/* Brand-colored glow blob */}
              <AnimatePresence mode="wait">
                <motion.div
                  aria-hidden
                  key={`glow-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-[42%_58%_70%_30%/45%_45%_55%_55%] blur-2xl scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${partner.accent}, ${partner.accent2})`,
                  }}
                />
              </AnimatePresence>

              {/* Slowly rotating dashed ring */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                className="absolute -inset-4 rounded-full border border-dashed border-primary/15"
              />

              {/* Card frame */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-card border border-border shadow-2xl shadow-primary/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-${active}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {/* Brand gradient background */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                      }}
                    />
                    {/* Subtle dot texture */}
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    {/* Soft top sheen */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-40"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 45%)",
                      }}
                    />
                    {/* Top eyebrow */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/95">
                      <span className="text-[10px] font-bold tracking-[0.32em] uppercase opacity-90">
                        Strategic Partner
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                        Verified
                      </span>
                    </div>
                    {/* Logo or monogram */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white/15 blur-2xl scale-125" />
                        {partner.logo ? (
                          <div className="relative w-72 h-56 md:w-80 md:h-64 rounded-3xl bg-white border border-white/40 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center p-7 md:p-9">
                              <img
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                className="block max-w-full max-h-full w-auto h-auto object-contain"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/15 border border-white/35 backdrop-blur-md flex items-center justify-center shadow-2xl">
                            <span className="text-white font-black text-5xl md:text-6xl tracking-tighter drop-shadow-2xl">
                              {partner.monogram}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Bottom name plate */}
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-[9px] font-bold tracking-[0.32em] uppercase opacity-80 mb-0.5">
                        Partnership in Excellence
                      </p>
                      <p className="text-white text-base md:text-lg font-black leading-tight">
                        {partner.name}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>

              {/* Drop shadow */}
              <div
                aria-hidden
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-10 rounded-full blur-2xl opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(3,4,94,0.7) 0%, transparent 70%)",
                }}
              />

              {/* Floating glass info card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${active}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute -bottom-6 -left-3 sm:-left-6 z-10 bg-card border border-border backdrop-blur-md rounded-xl px-4 py-3 shadow-2xl shadow-primary/10 max-w-[220px]"
                >
                  <p className="text-primary text-[9px] font-bold tracking-widest uppercase mb-0.5">
                    {partner.shortName}
                  </p>
                  <p className="text-foreground text-sm font-black leading-tight">
                    {partner.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Active chip */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-card border border-border rounded-full px-3 py-1.5 shadow-xl shadow-primary/10 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-foreground text-[9px] font-bold tracking-widest uppercase">
                  Active
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="mt-8 lg:mt-10 flex items-center justify-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous partner"
            className="w-10 h-10 rounded-full border-2 border-border bg-card hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next partner"
            className="w-10 h-10 rounded-full border-2 border-border bg-card hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {openPartner && (
          <PartnerModal partner={openPartner} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Partner detail modal — portaled to body, ESC-closeable, scroll-locked
   ──────────────────────────────────────────────────────────────────── */
function PartnerModal({
  partner,
  onClose,
}: {
  partner: Partner;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /* Lock body scroll while open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Move focus into the dialog on mount (next tick to allow animation) */
  useEffect(() => {
    const id = window.setTimeout(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 30);
    return () => window.clearTimeout(id);
  }, []);

  /* Keyboard handling — ESC closes, Tab is trapped within the dialog */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (activeEl === first || !dialogRef.current.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop — clickable to close */}
      <button
        aria-label="Close partner details"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
      />

      {/* Dialog */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`partner-${partner.id}-title`}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-2xl bg-card border border-border shadow-2xl shadow-primary/20 flex flex-col"
      >
        {/* Hero strip */}
        <div className="relative h-44 md:h-52 shrink-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 45%)",
            }}
          />
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4 text-white">
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-[0.32em] uppercase opacity-85 mb-1">
                Strategic Partner
              </p>
              <h2
                id={`partner-${partner.id}-title`}
                className="text-3xl md:text-4xl font-black leading-none truncate"
              >
                {partner.name}
              </h2>
              <p className="mt-2 text-white/90 text-sm md:text-base font-semibold">
                {partner.tagline}
              </p>
            </div>
            <div className="hidden sm:block shrink-0 w-28 h-20 rounded-2xl bg-white/95 border border-white/35 backdrop-blur-md overflow-hidden relative">
              {partner.logo ? (
                <div className="absolute inset-0 flex items-center justify-center p-2.5">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="block max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-black text-3xl" style={{ color: partner.accent }}>
                    {partner.monogram}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Facts row */}
          <div className="grid grid-cols-3 gap-3">
            {partner.facts.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="bg-muted/40 border border-border rounded-xl p-3"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground">
                      {f.label}
                    </span>
                  </div>
                  <p className="font-black text-foreground text-sm md:text-base leading-tight">
                    {f.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Intro */}
          <p className="text-foreground/90 text-base leading-relaxed">
            {partner.detail.intro}
          </p>

          {/* Sections */}
          <div className="space-y-5">
            {partner.detail.sections.map((s, i) => (
              <div key={i} className="border-l-2 border-primary/40 pl-4">
                <h3 className="text-foreground font-bold text-base md:text-lg mb-1.5">
                  {s.heading}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4 flex flex-wrap gap-3 justify-end border-t border-border">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary hover:text-primary text-foreground font-bold transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                requestAnimationFrame(() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                });
              }}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-[#00B4D8] transition-colors"
            >
              {partner.detail.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
