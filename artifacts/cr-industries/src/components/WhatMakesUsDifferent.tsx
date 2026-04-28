import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Heart, Tag, Truck } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Gem,
    title: "Consistent Quality",
    description:
      "High-grade manufacturing ensures that every batch meets rigorous safety and durability standards.",
    gradient: "from-[#0096C7] to-[#48CAE4]",
    glow: "rgba(0,150,199,0.35)",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "Our commitment to our clients goes beyond the sale; we provide continuous support and value.",
    gradient: "from-[#03045E] to-[#023E8A]",
    glow: "rgba(3,4,94,0.45)",
  },
  {
    icon: Tag,
    title: "Unbeatable Prices",
    description:
      "Premium quality doesn't have to be overpriced. We offer the most competitive rates in the industry.",
    gradient: "from-[#0096C7] to-[#0077B6]",
    glow: "rgba(0,150,199,0.35)",
  },
  {
    icon: Truck,
    title: "On-Time Delivery",
    description:
      "With a robust logistics network, we guarantee that your orders reach you exactly when you need them.",
    gradient: "from-[#023E8A] to-[#0096C7]",
    glow: "rgba(2,62,138,0.4)",
  },
];

function DiffCard({
  item,
  index,
}: {
  item: (typeof DIFFERENTIATORS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group relative text-center bg-card border border-border rounded-2xl p-8 overflow-hidden cursor-default"
    >
      {/* Hover gradient fill */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
           style={{ background: `radial-gradient(ellipse 80% 70% at 50% 30%, ${item.glow}, transparent 70%)` }} />

      {/* Shimmer border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
           style={{ boxShadow: `0 0 0 1.5px ${item.glow}, 0 8px 32px ${item.glow}` }} />

      {/* Icon */}
      <div className="relative mx-auto w-20 h-20 mb-6">
        {/* Glow orb behind icon */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} blur-2xl opacity-20 group-hover:opacity-60 transition-all duration-400 scale-110`}
        />
        <motion.div
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-9 h-9 text-white drop-shadow-sm" />
        </motion.div>
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2.5 relative z-10">{item.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto relative z-10">
        {item.description}
      </p>

      {/* Bottom accent line */}
      <div className={`mt-5 mx-auto h-0.5 w-8 group-hover:w-16 bg-gradient-to-r ${item.gradient} transition-all duration-500 rounded-full`} />
    </motion.div>
  );
}

export default function WhatMakesUsDifferent() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section className="py-24 bg-muted/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase rounded-full mb-4">
            Our Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            What Makes Us Different?
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <DiffCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
