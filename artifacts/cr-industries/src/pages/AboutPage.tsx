import { useEffect, useRef } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Droplets,
  Layers,
  Wind,
  ShieldCheck,
  FlaskConical,
  Globe2,
  Building2,
  Users,
  Factory,
  ArrowRight,
} from "lucide-react";
import { useLocation } from "wouter";
import CountUp from "@/components/CountUp";

/* High-quality industrial imagery — distinct from Home/Product pages */
const HERO_IMG =
  "https://images.unsplash.com/photo-1720036236694-d0a231c52563?fm=jpg&q=80&w=2400&auto=format&fit=crop";
const LAB_IMG =
  "https://images.unsplash.com/photo-1574689036779-bf2052a275c2?fm=jpg&q=80&w=1600&auto=format&fit=crop";
const SKYLINE_IMG =
  "https://images.unsplash.com/photo-1768675142255-7d64378910eb?fm=jpg&q=80&w=2400&auto=format&fit=crop";

/* Product portfolio aligned with C R Industries' core range */
const PORTFOLIO = [
  {
    icon: Droplets,
    name: "Sealants",
    blurb:
      "High-performance compounds that lock out moisture, dust and chemical ingress across structural joints.",
  },
  {
    icon: Layers,
    name: "Adhesives",
    blurb:
      "Industrial-grade bonding agents engineered for shear strength, vibration tolerance and long service life.",
  },
  {
    icon: Wind,
    name: "Industrial Foams",
    blurb:
      "Closed-cell and open-cell formulations delivering thermal insulation, gap-filling and acoustic dampening.",
  },
  {
    icon: ShieldCheck,
    name: "Protective Coatings",
    blurb:
      "Weather-resistant films that shield substrates from corrosion, UV, and aggressive operating environments.",
  },
  {
    icon: FlaskConical,
    name: "Specialty Compounds",
    blurb:
      "Custom-formulated chemistries — anchors, hydraulic gums, gasket seals — built for application-specific demands.",
  },
];

/* Mission statement that reveals word-by-word */
const MISSION =
  "At C R Industries, our mission is to empower businesses with the tools they need to build the future — combining sustainable practices with cutting-edge chemical technology so that every Gum Hydra and Gasket Seal we produce meets international benchmarks of safety and excellence.";

export default function AboutPage() {
  const [, navigate] = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  /* ──────────────────────────  SECTION 1 — HERO  ────────────────────────── */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Parallax + Ken Burns combo: scale from 1.05 → 1.25 over scroll lifetime
  const heroImgScale = useTransform(heroProgress, [0, 1], [1.05, 1.25]);
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.55, 0.88]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-40%"]);

  const heroInView = useInView(heroRef, { once: true });

  /* ──────────────────────────  SECTION 2 — EXPERTISE  ────────────────────────── */
  const expertiseRef = useRef<HTMLDivElement>(null);
  const expertiseInView = useInView(expertiseRef, {
    once: true,
    margin: "-100px",
  });

  /* ──────────────────────────  SECTION 3 — VISION  ────────────────────────── */
  const visionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: visionProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });
  const skyScale = useTransform(visionProgress, [0, 1], [1.0, 1.18]);
  const skyY = useTransform(visionProgress, [0, 1], ["-5%", "5%"]);

  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const missionWords = MISSION.split(" ");

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative bg-background overflow-hidden">
      {/* ════════════════════════ SECTION 1 — THE CORE OF INNOVATION ════════════════════════ */}
      <section
        ref={heroRef}
        aria-labelledby="about-hero-title"
        className="relative h-[100vh] min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        {/* Background with parallax + continuous Ken Burns scale */}
        <motion.div
          aria-hidden
          style={
            reduce
              ? undefined
              : { y: heroImgY, scale: heroImgScale }
          }
          className="absolute inset-0 will-change-transform"
        >
          {/* Ken Burns continuous animation layer */}
          <motion.img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            initial={{ scale: 1 }}
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.08, 1], x: ["0%", "-1.5%", "0%"] }
            }
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Warm golden + brand overlay */}
        <motion.div
          aria-hidden
          style={reduce ? undefined : { opacity: heroOverlayOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#03045E]/65 via-[#03045E]/45 to-[#03045E]/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#03045E]/40 via-transparent to-amber-900/20" />
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>

        {/* Subtle grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Content */}
        <motion.div
          style={reduce ? undefined : { y: heroTextY }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 mb-7"
          >
            <span className="h-px w-12 bg-[#48CAE4]" />
            <span className="text-[#48CAE4] text-xs font-bold tracking-[0.4em] uppercase">
              The Core of Innovation
            </span>
            <span className="h-px w-12 bg-[#48CAE4]" />
          </motion.div>

          {/* Headline fades up */}
          <motion.h1
            id="about-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
          >
            Redefining Industrial Bonds{" "}
            <span className="block sm:inline">
              Since{" "}
              <span className="bg-gradient-to-r from-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
                2001.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-white/85 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            C R Industries stands at the forefront of chemical engineering,
            providing the backbone for modern construction and manufacturing.
            We specialize in high-grade{" "}
            <span className="text-white font-bold">Sealants</span> and{" "}
            <span className="text-white font-bold">Adhesives</span> that ensure
            structural integrity in the most demanding environments.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-32 sm:-bottom-40 flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════ SECTION 2 — ENGINEERING EXCELLENCE ════════════════════════ */}
      <section
        ref={expertiseRef}
        aria-labelledby="about-expertise-title"
        className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Decorative orbs */}
        <div
          aria-hidden
          className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(0,150,199,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Two-column intro: text left → slides from left, image right → slides from right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 lg:mb-24">
            {/* Text — slides in from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={expertiseInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary/40" />
                <span className="text-primary text-xs font-bold tracking-[0.35em] uppercase">
                  Our Expertise
                </span>
              </div>

              <h2
                id="about-expertise-title"
                className="text-4xl sm:text-5xl md:text-[3.4rem] font-black text-foreground leading-[1.05] mb-6"
              >
                Precision-Engineered{" "}
                <span className="brand-gradient-text">Specialty Solutions.</span>
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5">
                From{" "}
                <span className="text-foreground font-semibold">
                  Industrial Foams
                </span>{" "}
                that offer superior insulation to{" "}
                <span className="text-foreground font-semibold">
                  Protective Coatings
                </span>{" "}
                designed for extreme weather resistance, our portfolio is built
                on a foundation of rigorous testing.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                We don't just sell products — we provide the{" "}
                <span className="text-primary font-bold">
                  specialty compounds
                </span>{" "}
                that power global infrastructure.
              </p>
            </motion.div>

            {/* Image — slides in from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={expertiseInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] group">
                <motion.img
                  src={LAB_IMG}
                  alt="Quality testing in our R&D lab"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/70 via-transparent to-transparent" />

                {/* Floating R&D badge */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={expertiseInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30"
                >
                  <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Quality Lab
                  </span>
                </motion.div>

                {/* Bottom caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <p className="text-[#48CAE4] text-xs font-bold tracking-widest uppercase mb-2">
                    R&amp;D Excellence
                  </p>
                  <p className="text-white text-xl sm:text-2xl font-black leading-tight">
                    Every batch tested.
                    <br />
                    Every spec verified.
                  </p>
                </motion.div>
              </div>

              {/* Decorative shapes */}
              <div
                aria-hidden
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl bg-primary/10 -z-10"
              />
              <div
                aria-hidden
                className="absolute -top-6 -left-6 w-24 h-24 rounded-3xl bg-[#48CAE4]/15 -z-10"
              />
            </motion.div>
          </div>

          {/* Portfolio header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs font-bold tracking-[0.35em] uppercase">
              Core Product Range
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
              Five families.{" "}
              <span className="brand-gradient-text">One standard.</span>
            </h3>
          </motion.div>

          {/* Product portfolio cards — slide in from RIGHT staggered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {PORTFOLIO.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: 60, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.11,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-400 cursor-default"
                >
                  {/* Top accent bar */}
                  <div
                    aria-hidden
                    className="absolute left-6 right-6 top-0 h-0.5 bg-gradient-to-r from-primary to-[#48CAE4] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />

                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 16,
                    }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#03045E] flex items-center justify-center shadow-md mb-4"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h4 className="text-foreground text-base font-black mb-2 group-hover:text-primary transition-colors duration-300">
                    {p.name}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {p.blurb}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════ SECTION 3 — OUR GLOBAL COMMITMENT ════════════════════════ */}
      <section
        ref={visionRef}
        aria-labelledby="about-vision-title"
        className="relative min-h-[100vh] flex items-center overflow-hidden py-24 lg:py-32"
      >
        {/* Parallax skyline background */}
        <motion.div
          aria-hidden
          style={reduce ? undefined : { scale: skyScale, y: skyY }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={SKYLINE_IMG}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Dark gradient overlays */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#03045E]/85 via-[#03045E]/75 to-[#0096C7]/65"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mb-14 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="h-px w-10 bg-[#48CAE4]" />
              <span className="text-[#48CAE4] text-xs font-bold tracking-[0.35em] uppercase">
                Our Global Commitment
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              id="about-vision-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.02] mb-10"
            >
              Shaping the Future of{" "}
              <span className="bg-gradient-to-r from-[#48CAE4] to-[#90E0EF] bg-clip-text text-transparent">
                Industry.
              </span>
            </motion.h2>

            {/* Mission — word-by-word reveal */}
            <p
              ref={missionRef}
              className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium tracking-tight"
            >
              {missionWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={
                    missionInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.28em]"
                >
                  {word === "Industries," ||
                  word === "Hydra" ||
                  word === "Seal" ? (
                    <span className="text-[#90E0EF] font-bold">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Counter strip — supporting global commitment data */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {[
              {
                Icon: Users,
                end: 1200,
                suffix: "+",
                label: "Industrial Clients",
              },
              {
                Icon: Building2,
                end: 8500,
                suffix: "+",
                label: "Projects Completed",
              },
              { Icon: Globe2, end: 18, suffix: "", label: "Countries Served" },
              {
                Icon: Factory,
                end: 42,
                suffix: "M+",
                label: "Units Shipped",
              },
            ].map(({ Icon, end, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-[#48CAE4]/40 transition-all duration-400"
              >
                <div className="w-11 h-11 rounded-xl bg-[#48CAE4]/15 flex items-center justify-center mb-4 group-hover:bg-[#48CAE4]/25 group-hover:scale-110 transition-all duration-400">
                  <Icon className="w-5 h-5 text-[#48CAE4]" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-1.5">
                  <CountUp end={end} duration={2.2} suffix={suffix} />
                </div>
                <p className="text-white/65 text-[11px] sm:text-xs font-semibold tracking-wide uppercase">
                  {label}
                </p>
                <div
                  aria-hidden
                  className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#48CAE4]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 rounded-3xl bg-white/5 backdrop-blur-md border border-white/15"
          >
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-black mb-1">
                Build with us.
              </h3>
              <p className="text-white/70 text-sm">
                Let's spec the right compound for your next project.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#03045E] font-black text-sm rounded-xl shadow-2xl shadow-[#48CAE4]/30 transition-all duration-300"
            >
              Talk to Our Team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
    </MotionConfig>
  );
}
