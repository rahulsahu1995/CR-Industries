import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, Handshake, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { PARTNERS, type Partner } from "@/data/partners";

const HERO_IMG =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?fm=jpg&q=80&w=2400&auto=format&fit=crop";

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reverse = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      id={partner.id}
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative scroll-mt-24"
    >
      <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-lg shadow-foreground/5">
        {/* Top accent strip */}
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
          }}
        />

        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 items-center ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Logo card */}
          <div className="lg:col-span-5 [direction:ltr]">
            <div className="relative">
              {/* Decorative blurred orb behind the card */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] opacity-30 blur-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${partner.accent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${partner.accent2} 0%, transparent 60%)`,
                }}
              />
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border shadow-2xl flex flex-col"
                style={{ borderColor: `${partner.accent}30` }}
              >
                {/* Brand accent bar */}
                <div
                  aria-hidden
                  className="h-2 w-full shrink-0"
                  style={{
                    background: `linear-gradient(90deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                  }}
                />

                {/* Eyebrow */}
                <div className="px-5 pt-4 flex items-center justify-between shrink-0">
                  <span
                    className="text-[10px] font-bold tracking-[0.32em] uppercase"
                    style={{ color: partner.accent }}
                  >
                    Strategic Partner
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                    style={{
                      backgroundColor: `${partner.accent}12`,
                      color: partner.accent,
                      border: `1px solid ${partner.accent}30`,
                    }}
                  >
                    Verified
                  </span>
                </div>

                {/* Big logo */}
                <div className="flex-1 min-h-0 flex items-center justify-center px-8 md:px-12 py-6">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="block max-w-full max-h-full w-auto h-auto object-contain drop-shadow-sm"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${partner.accent} 0%, ${partner.accent2} 100%)`,
                      }}
                    >
                      <span className="text-white font-black text-5xl tracking-tighter">
                        {partner.monogram}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom plate */}
                <div
                  className="px-5 py-3.5 border-t shrink-0 flex items-center justify-between"
                  style={{
                    borderColor: `${partner.accent}1F`,
                    backgroundColor: `${partner.accent}08`,
                  }}
                >
                  <div>
                    <p
                      className="text-[9px] font-bold tracking-[0.3em] uppercase"
                      style={{ color: `${partner.accent}B0` }}
                    >
                      Partnership in Excellence
                    </p>
                    <p className="text-sm md:text-base font-black leading-tight mt-0.5 text-foreground">
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
            </div>

            {/* Quick facts */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {partner.facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="rounded-xl bg-muted/40 border border-border px-3 py-2.5 text-left"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon
                        className="w-3 h-3"
                        style={{ color: partner.accent }}
                      />
                      <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground">
                        {f.label}
                      </span>
                    </div>
                    <p className="text-foreground font-bold text-sm leading-tight">
                      {f.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 [direction:ltr]">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span
                className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border"
                style={{
                  color: partner.accent,
                  borderColor: `${partner.accent}40`,
                  backgroundColor: `${partner.accent}10`,
                }}
              >
                Partner {String(index + 1).padStart(2, "0")} /{" "}
                {String(PARTNERS.length).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground/80 text-[11px] tracking-widest uppercase font-bold">
                {partner.shortName}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.05] mb-3">
              {partner.name}
            </h2>
            <p className="text-foreground/85 text-base md:text-lg font-semibold mb-4 leading-snug">
              {partner.tagline}
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              {partner.detail.intro}
            </p>

            {/* Detail sections */}
            <div className="space-y-3.5">
              {partner.detail.sections.map((s) => (
                <div
                  key={s.heading}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors duration-200"
                >
                  <span
                    className="shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${partner.accent}15` }}
                  >
                    <CheckCircle2
                      className="w-4 h-4"
                      style={{ color: partner.accent }}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-foreground tracking-tight mb-0.5">
                      {s.heading}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PartnersPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="bg-background">
      <PageHero
        imageUrl={HERO_IMG}
        eyebrow="Partner With Us"
        title={
          <>
            Our Strategic{" "}
            <span className="text-[#48CAE4]">Partners</span>
          </>
        }
        subtitle="World-class manufacturers and innovators who power C R Industries' commitment to excellence — across India and around the world."
        pills={["SOUDAL", "CUMI", "AVERY DENNISON", "KIPL"]}
        overlay="dark"
      />

      {/* Intro band */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Handshake className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
              Strategic Alliances
            </span>
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Built on Trust. Delivered with Excellence.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            C R Industries proudly partners with global leaders in materials
            science, sealants, adhesives, abrasives and labelling — a network
            that brings the world's best chemistry, technology and craftsmanship
            to every Indian project we touch.
          </p>
        </div>
      </section>

      {/* Partner cards */}
      <section className="relative pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-14">
          {PARTNERS.map((p, i) => (
            <PartnerCard key={p.id} partner={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-primary/25 bg-[#03045E] text-white p-8 sm:p-12 text-center"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(0,150,199,0.5) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(72,202,228,0.4) 0%, transparent 55%)",
              }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#48CAE4]" />
                <span className="text-[#48CAE4] text-[11px] font-bold tracking-widest uppercase">
                  Become a Partner
                </span>
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3">
                Let's build the next era of industrial excellence — together.
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-7">
                Whether you're a global manufacturer, a specialty chemistry
                innovator, or an Indian distributor — we'd love to talk about a
                strategic relationship that grows both our businesses.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#03045E] font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#48CAE4] hover:text-white transition-colors duration-200"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
