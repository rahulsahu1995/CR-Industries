import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Headphones, ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function ConsultationBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [, navigate] = useLocation();

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, #03045E 0%, #023E8A 50%, #0096C7 100%)",
            boxShadow: "0 30px 60px -20px rgba(3,4,94,0.4)",
          }}
        >
          {/* Animated background orbs */}
          <motion.div
            aria-hidden
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(72,202,228,0.6) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <motion.div
            aria-hidden
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,150,199,0.6) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Floating sparkle particles */}
          {[
            { top: "12%", left: "8%", delay: 0 },
            { top: "20%", right: "14%", delay: 1.2 },
            { bottom: "20%", left: "12%", delay: 0.6 },
            { bottom: "14%", right: "18%", delay: 1.8 },
            { top: "50%", left: "5%", delay: 2.4 },
            { top: "60%", right: "8%", delay: 0.9 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute pointer-events-none"
              style={pos as React.CSSProperties}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                delay: pos.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-[#48CAE4]" />
            </motion.div>
          ))}

          {/* Subtle grid pattern */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16 lg:py-20 text-center">
            {/* Icon badge with pulse rings */}
            <div className="relative inline-flex items-center justify-center mb-7">
              {/* Pulsing rings */}
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-[#48CAE4]"
              />
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1,
                }}
                className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-[#48CAE4]"
              />
              <motion.div
                whileHover={{ rotate: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 280, damping: 15 }}
                className="relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl"
              >
                <Headphones className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#48CAE4] text-xs font-bold tracking-[0.3em] uppercase mb-4"
            >
              Expert Consultation
            </motion.p>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl mx-auto mb-5"
            >
              Not sure which product is right for your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">application?</span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute bottom-1 left-0 right-0 h-2 bg-[#48CAE4]/40 origin-left"
                />
              </span>
            </motion.h2>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
            >
              Our specialists will help you choose the right formulation, share
              technical data, and provide samples — at no cost.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative inline-block"
            >
              {/* Pulsing glow ring around button */}
              <motion.div
                aria-hidden
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-3 rounded-2xl bg-[#48CAE4]/40 blur-xl pointer-events-none"
              />

              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group relative inline-flex items-center gap-3 px-9 py-4 bg-white text-[#03045E] font-black text-base rounded-2xl shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 50px -10px rgba(72,202,228,0.6)" }}
              >
                {/* Sliding shimmer */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(72,202,228,0.4), transparent)",
                  }}
                />
                <span className="relative">Contact Our Team</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Trust indicators below button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/60 text-xs font-semibold tracking-wider uppercase"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                24/7 Technical Support
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-white/20" />
              <span>Free Samples Available</span>
              <span className="hidden sm:inline-block w-px h-3 bg-white/20" />
              <span>Replies within 4 hrs</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
