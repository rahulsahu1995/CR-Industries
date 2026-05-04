import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  Lightbulb,
  Settings2,
  ShieldCheck,
  BadgeCheck,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Award,
    title: "Experienced",
    description:
      "With years of industry expertise, we bring deep technical knowledge to every project, ensuring reliable and high-performance sealing solutions.",
  },
  {
    icon: Lightbulb,
    title: "Solutions",
    description:
      "We don't just provide products; we solve problems. Our range is designed to tackle the most demanding industrial leakage and bonding challenges.",
  },
  {
    icon: Settings2,
    title: "Customized",
    description:
      "Every business is unique. We offer tailored services and product specifications to meet your exact industrial requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Professional",
    description:
      "From initial consultation to final delivery, our team maintains the highest standards of professional integrity and technical support.",
  },
  {
    icon: BadgeCheck,
    title: "Original",
    description:
      "Innovation is at our core. We provide genuine, high-grade formulations that set the benchmark for quality in the sealant market.",
  },
  {
    icon: Zap,
    title: "Fast",
    description:
      "We value your time. Our streamlined processes ensure quick turnaround times without ever compromising on the quality of the output.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative bg-card border border-border hover:border-primary/50 rounded-2xl p-6 overflow-hidden cursor-default transition-colors duration-300"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />

      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
           style={{ boxShadow: "0 0 0 1px rgba(0,150,199,0.3), 0 10px 30px rgba(0,150,199,0.08)" }} />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-300 shadow-sm">
          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

        {/* Expanding bottom accent */}
        <div className="mt-4 h-0.5 w-8 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-500 rounded-full" />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="about" className="py-12 sm:py-14 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">
            Our Edge
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Why Choose Us
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={headingInView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Decades of industrial expertise combined with a relentless pursuit of quality — we deliver sealing solutions that never fail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
