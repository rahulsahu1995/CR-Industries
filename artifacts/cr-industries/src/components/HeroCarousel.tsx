import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Industrial Sealants",
    subtitle: "Engineered for Performance",
    description: "High-performance tap sealants and industrial adhesives built for the most demanding applications.",
    gradient: "from-[#03045E] via-[#023E8A] to-[#0096C7]",
    pattern: "sealant",
  },
  {
    id: 2,
    title: "Precision Adhesives",
    subtitle: "Bond That Lasts",
    description: "Professional-grade adhesive solutions trusted by engineers and contractors worldwide.",
    gradient: "from-[#0096C7] via-[#0077B6] to-[#03045E]",
    pattern: "adhesive",
  },
  {
    id: 3,
    title: "Industrial Excellence",
    subtitle: "Quality You Can Trust",
    description: "From thread sealants to industrial compounds — every product meets rigorous durability standards.",
    gradient: "from-[#023E8A] via-[#0096C7] to-[#48CAE4]",
    pattern: "industrial",
  },
  {
    id: 4,
    title: "Custom Solutions",
    subtitle: "Tailored for Your Industry",
    description: "Bespoke formulations and product specifications to meet your exact industrial requirements.",
    gradient: "from-[#03045E] to-[#0096C7]",
    pattern: "custom",
  },
];

function SlidePattern({ pattern }: { pattern: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Abstract industrial pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              top: `${20 + i * 8}%`,
              right: `${5 + i * 3}%`,
              opacity: 0.3 - i * 0.03,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{
              width: "1px",
              height: `${40 + Math.random() * 60}px`,
              left: `${i * 5.3}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
      {/* Hexagonal accent */}
      <svg
        className="absolute right-0 top-0 h-full w-1/2 opacity-10"
        viewBox="0 0 400 600"
        fill="none"
      >
        <polygon points="200,50 350,137.5 350,312.5 200,400 50,312.5 50,137.5" stroke="white" strokeWidth="2" fill="none" />
        <polygon points="200,100 320,162.5 320,287.5 200,350 80,287.5 80,162.5" stroke="white" strokeWidth="1" fill="none" />
        <polygon points="200,150 290,187.5 290,262.5 200,300 110,262.5 110,187.5" stroke="white" strokeWidth="1" fill="white" fillOpacity="0.03" />
      </svg>
    </div>
  );
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slide = SLIDES[current];

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        >
          <SlidePattern pattern={slide.pattern} />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="max-w-2xl"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold tracking-widest uppercase mb-4"
                >
                  {slide.subtitle}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#0096C7] hover:bg-[#0077B6] text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0096C7]/30 hover:scale-105"
                  >
                    Explore Products <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl border border-white/30 transition-all duration-200 backdrop-blur-sm"
                  >
                    Contact Us
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-mono z-20">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </section>
  );
}
