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

const THUMB_W = 160;
const THUMB_GAP = 16;
const THUMB_STRIDE = THUMB_W + THUMB_GAP;
const ONE_SET = PRODUCTS.length * THUMB_STRIDE;
const STRIP = [...PRODUCTS, ...PRODUCTS];

const INTERVAL = 4500;

const HERO_BG = "linear-gradient(135deg, #010212 0%, #03045E 45%, #012a72 100%)";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % PRODUCTS.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  const p = PRODUCTS[current];

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      style={{ background: HERO_BG }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,150,199,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,150,199,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.05,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 28% 50%, rgba(0,150,199,0.13) 0%, transparent 65%)",
        }}
      />

      {/* Content layout */}
      <div className="relative h-full flex flex-col">

        {/* ── Main row: left text + right image ── */}
        <div className="flex-1 min-h-0 flex overflow-hidden">

          {/* LEFT panel */}
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 pb-24 z-10">

            {/* Static brand pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-white/15 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0096C7] animate-pulse" />
              C R Industries
            </motion.div>

            {/* Product tag — updates per slide */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`tag-${current}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center self-start gap-1.5 px-3.5 py-1 rounded-full text-[#48CAE4] text-[11px] font-bold tracking-widest uppercase mb-4 border border-[#0096C7]/35"
                style={{ background: "rgba(0,150,199,0.15)" }}
              >
                {p.tag}
              </motion.span>
            </AnimatePresence>

            {/* Product name — RTL slide */}
            <div className="overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`name-${current}`}
                  initial={{ x: 90, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -90, opacity: 0 }}
                  transition={{ duration: 0.48, ease: [0.32, 0, 0.67, 0] }}
                  className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight"
                >
                  {p.name}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description — RTL slide, slight delay */}
            <div className="overflow-hidden mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${current}`}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ duration: 0.48, delay: 0.06, ease: [0.32, 0, 0.67, 0] }}
                  className="text-white/60 text-base md:text-lg leading-relaxed max-w-md"
                >
                  {p.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() =>
                  document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#0096C7] hover:bg-[#00B4D8] text-white font-bold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#0096C7]/40 hover:scale-[1.04] active:scale-[0.97]"
              >
                Explore Products
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex gap-8 border-t border-white/10 pt-6"
            >
              {[
                { value: "15+", label: "Years Experience" },
                { value: "500+", label: "Products" },
                { value: "50+", label: "Countries Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-black text-white leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT panel — desktop only */}
          <div className="hidden lg:block relative w-[42%] xl:w-[46%] overflow-hidden">
            {/* Edge fades */}
            <div
              className="absolute top-0 left-0 bottom-0 w-28 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #03045E, transparent)" }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, #03045E, transparent)" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, #03045E, transparent)" }}
            />

            {/* Sliding image */}
            <AnimatePresence initial={false}>
              <motion.div
                key={current}
                initial={{ x: "100%", opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0.8 }}
                transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
                className="absolute inset-0"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(3,4,94,0.85) 0%, rgba(3,4,94,0.15) 35%, transparent 65%)",
                  }}
                />
                {/* Image label */}
                <div className="absolute bottom-8 left-8 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-label-${current}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-[#48CAE4] text-[10px] font-bold tracking-widest uppercase mb-1.5">
                        {p.tag}
                      </p>
                      <p className="text-white text-2xl font-black">{p.name}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Thumbnail strip ── */}
        <div
          className="flex-none h-[76px] overflow-hidden relative"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex items-center h-full will-change-transform"
            style={{
              gap: THUMB_GAP + "px",
              width: STRIP.length * THUMB_STRIDE + "px",
              paddingLeft: "8px",
            }}
            animate={{ x: [0, -ONE_SET] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {STRIP.map((prod, i) => {
              const active = prod.id === current;
              return (
                <div
                  key={`${prod.id}-${i}`}
                  className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-500"
                  style={{
                    width: THUMB_W + "px",
                    height: "64px",
                    opacity: active ? 1 : 0.45,
                    border: active
                      ? "1.5px solid rgba(0,150,199,0.8)"
                      : "1.5px solid rgba(255,255,255,0.1)",
                    boxShadow: active ? "0 0 14px rgba(0,150,199,0.35)" : "none",
                  }}
                >
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <p className="absolute bottom-1.5 left-2.5 text-white text-[9px] font-bold leading-none">
                    {prod.name}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Controls row ── */}
        <div className="flex-none h-8 flex items-center justify-center gap-2 relative">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2 bg-[#0096C7]"
                  : "w-2 h-2 bg-white/25 hover:bg-white/55"
              }`}
            />
          ))}
          <span className="absolute right-6 text-white/30 text-[10px] font-mono tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className="flex-none h-0.5 bg-white/10">
          <motion.div
            key={current}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
            className="h-full bg-[#0096C7]"
          />
        </div>
      </div>
    </section>
  );
}
