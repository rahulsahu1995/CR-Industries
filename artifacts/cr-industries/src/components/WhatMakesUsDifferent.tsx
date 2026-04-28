import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Heart, Tag, Truck } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Gem,
    title: "Consistent Quality",
    description:
      "High-grade manufacturing ensures that every batch meets rigorous safety and durability standards.",
    color: "from-[#0096C7] to-[#48CAE4]",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "Our commitment to our clients goes beyond the sale; we provide continuous support and value.",
    color: "from-[#03045E] to-[#023E8A]",
  },
  {
    icon: Tag,
    title: "Unbeatable Prices",
    description:
      "Premium quality doesn't have to be overpriced. We offer the most competitive rates in the industry.",
    color: "from-[#0096C7] to-[#0077B6]",
  },
  {
    icon: Truck,
    title: "On-Time Delivery",
    description:
      "With a robust logistics network, we guarantee that your orders reach you exactly when you need them.",
    color: "from-[#023E8A] to-[#0096C7]",
  },
];

export default function WhatMakesUsDifferent() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section className="py-24 bg-muted/40">
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
          {DIFFERENTIATORS.map((item, i) => {
            const ref = useRef(null);
            const cardInView = useInView(ref, { once: true, margin: "-50px" });
            const Icon = item.icon;

            return (
              <motion.div
                ref={ref}
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group text-center"
              >
                <div className="relative mx-auto w-20 h-20 mb-5">
                  <div
                    className={`w-full h-full rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
