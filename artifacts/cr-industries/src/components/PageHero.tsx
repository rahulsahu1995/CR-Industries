import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface PageHeroProps {
  imageUrl: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  pills?: string[];
  height?: string;
  overlay?: "dark" | "light";
}

export default function PageHero({
  imageUrl,
  eyebrow,
  title,
  subtitle,
  pills,
  height = "h-[68vh] min-h-[480px]",
  overlay = "dark",
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const overlayClasses =
    overlay === "dark"
      ? "bg-gradient-to-b from-[#03045E]/70 via-[#03045E]/50 to-[#03045E]/90"
      : "bg-gradient-to-b from-white/40 via-white/55 to-white/85 dark:from-[#03045E]/55 dark:via-[#03045E]/45 dark:to-[#03045E]/85";
  const textColor = overlay === "dark" ? "text-white" : "text-foreground";
  const subColor =
    overlay === "dark" ? "text-white/85" : "text-muted-foreground";

  return (
    <section
      ref={ref}
      className={`relative mt-16 lg:mt-20 ${height} flex items-center justify-center overflow-hidden`}
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          initial={{ scale: 1 }}
          animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
      <div aria-hidden className={`absolute inset-0 ${overlayClasses}`} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.div
        style={reduce ? undefined : { y: textY }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-[#48CAE4]" />
          <span className="text-[#48CAE4] text-xs font-bold tracking-[0.4em] uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-[#48CAE4]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 ${textColor}`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${subColor}`}
        >
          {subtitle}
        </motion.p>
        {pills && pills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {pills.map((p) => (
              <span
                key={p}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border text-[11px] sm:text-xs font-bold tracking-wide ${
                  overlay === "dark"
                    ? "bg-white/10 border-white/25 text-white"
                    : "bg-white/70 dark:bg-white/10 border-border text-foreground"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#48CAE4]" />
                {p}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
