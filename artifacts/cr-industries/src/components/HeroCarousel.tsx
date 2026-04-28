import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const PRODUCTS = [
  {
    id: 0,
    name: "Gum Hydra",
    tag: "Hydrophobic Sealant",
    desc: "Bonds instantly on damp surfaces where other sealants fail — watertight performance in the harshest conditions.",
    img: "/steps/step1.png",
  },
  {
    id: 1,
    name: "Thread Sealants",
    tag: "PTFE Thread Compound",
    desc: "Multi-standard PTFE compounds for gas, water and oil systems. Zero shrinkage, zero creep, zero leaks.",
    img: "/steps/step2.png",
  },
  {
    id: 2,
    name: "Tap Compounds",
    tag: "Compression Fitting",
    desc: "PTFE-reinforced tap compound delivers precision, leak-free joints across all pipe materials and pressures.",
    img: "/steps/step3.png",
  },
  {
    id: 3,
    name: "Angle Grinders",
    tag: "Surface Preparation",
    desc: "Professional-grade power tools engineered for aggressive weld-finishing and surface preparation work.",
    img: "/steps/step4.png",
  },
  {
    id: 4,
    name: "Adhesive Range",
    tag: "Industrial Bonding",
    desc: "Structural adhesives formulated to withstand extreme loads, vibration cycles, and temperature extremes.",
    img: "/steps/step5.png",
  },
  {
    id: 5,
    name: "Specialty Compounds",
    tag: "Custom Formulation",
    desc: "Bespoke industrial compounds tailored to your exact specification and compliance requirements.",
    img: "/steps/step6.png",
  },
];

const INTERVAL = 5500;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % PRODUCTS.length),
      INTERVAL
    );
    return () => clearInterval(t);
  }, []);

  const p = PRODUCTS[current];

  return (
    <section
      id="home"
      className="relative bg-background overflow-hidden pt-24 lg:pt-28 pb-16 lg:pb-20"
    >
      {/* Soft decorative orbs */}
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

      {/* Subtle dot grid */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[calc(100vh-9rem)]">

          {/* ── LEFT: TEXT ── */}
          <div className="lg:col-span-6 flex flex-col">

            {/* New product tag — sliding text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${current}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-flex items-center self-start gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-primary/10 border border-primary/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
                  {p.tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Product name — sliding text */}
            <div className="overflow-hidden mb-5">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`name-${current}`}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
                  className="text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.05] tracking-tight"
                >
                  {p.name}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description — sliding text, slight delay */}
            <div className="overflow-hidden mb-9">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${current}`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.07,
                    ease: [0.32, 0, 0.67, 0],
                  }}
                  className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
                >
                  {p.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("product")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:bg-[#00B4D8] transition-colors duration-200"
              >
                Explore Products
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
                className="px-7 py-3.5 text-foreground font-bold rounded-xl border-2 border-border hover:border-primary hover:text-primary transition-colors duration-200"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>

          {/* ── RIGHT: FLOATING IMAGE ── */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-[520px] aspect-square">
              {/* Soft gradient blob behind the image */}
              <div
                aria-hidden
                className="absolute inset-0 brand-gradient rounded-[42%_58%_70%_30%/45%_45%_55%_55%] opacity-[0.18] blur-2xl scale-105"
              />

              {/* Animated subtle ring */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                className="absolute -inset-4 rounded-full border border-dashed border-primary/15"
              />

              {/* Image card */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-card">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={p.img}
                    alt={p.name}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Soft inset border highlight */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 dark:ring-white/5 pointer-events-none" />
              </div>

              {/* Drop shadow under image — creates floating effect */}
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
                  key={`info-${current}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute -bottom-8 -left-4 sm:-left-8 z-10 bg-card border border-border backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl shadow-primary/10 max-w-[260px]"
                >
                  <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
                    {p.tag}
                  </p>
                  <p className="text-foreground text-lg font-black leading-tight">
                    {p.name}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Floating "Premium" badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-card border border-border rounded-full px-4 py-2 shadow-xl shadow-primary/10 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-foreground text-[10px] font-bold tracking-widest uppercase">
                  Premium
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
