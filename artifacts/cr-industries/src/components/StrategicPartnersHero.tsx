import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { PARTNERS, type Partner } from "@/data/partners";

/* ────────────────────────────────────────────────────────────────────
   Strategic Partners — landing section
   Static grid of clickable partner cards. Each card links to
   /partners/:id where full details are rendered.
   ──────────────────────────────────────────────────────────────────── */

export default function StrategicPartnersHero() {
  return (
    <section
      id="home"
      className="relative bg-background overflow-hidden pt-24 lg:pt-28 pb-6 lg:pb-8"
    >
      {/* Decorative orbs + dot grid */}
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
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Our <span className="text-primary">Strategic Partners</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
            World-class manufacturers and innovators who power C R Industries'
            commitment to excellence. Tap any partner to see the full story.
          </p>
        </motion.div>

        {/* Static grid — 1 / 2 / 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {PARTNERS.map((partner, i) => (
            <PartnerGridCard key={partner.id} partner={partner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   PartnerGridCard — clickable, hoverable card linking to /partners/:id
   ──────────────────────────────────────────────────────────────────── */
function PartnerGridCard({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/partners/${partner.id}`}
        aria-label={`View ${partner.name} partnership details`}
        className="group block relative rounded-2xl bg-card border border-border overflow-hidden shadow-md shadow-foreground/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={
          {
            ["--accent" as string]: partner.accent,
          } as React.CSSProperties
        }
      >
        {/* Brand accent strip on top */}
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
          }}
        />

        {/* Logo area — white surface with brand-tinted glow */}
        <div className="relative aspect-[4/3] bg-white overflow-hidden">
          {/* Brand-tinted soft glow */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${partner.accent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${partner.accent2} 0%, transparent 60%)`,
            }}
          />

          {/* Eyebrow + Verified pill */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span
              className="text-[9px] font-bold tracking-[0.3em] uppercase"
              style={{ color: partner.accent }}
            >
              Strategic
            </span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
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
          <div className="absolute inset-0 flex items-center justify-center px-8 py-10">
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="block max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                }}
              >
                <span className="text-white font-black text-4xl tracking-tighter">
                  {partner.monogram}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content plate */}
        <div className="p-5 relative">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground">
              {partner.shortName}
            </span>
            <span
              className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
              }}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </span>
          </div>

          <h3
            className="text-lg lg:text-xl font-black text-foreground tracking-tight mb-1 leading-tight transition-colors duration-200 group-hover:text-primary"
            style={{ wordBreak: "break-word" }}
          >
            {partner.name}
          </h3>
          <p className="text-muted-foreground text-xs lg:text-[13px] leading-snug mb-3 line-clamp-2">
            {partner.tagline}
          </p>

          {/* CTA hint */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-primary opacity-80 group-hover:opacity-100 transition-opacity">
            <span>View Partnership</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Hover ring overlay */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-transparent group-hover:ring-2 transition-all duration-300"
          style={{
            ["--tw-ring-color" as string]: `${partner.accent}55`,
          } as React.CSSProperties}
        />
      </Link>
    </motion.div>
  );
}
