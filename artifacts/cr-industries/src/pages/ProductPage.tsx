import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, FlaskConical, Wrench, Globe2 } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/data/productCategories";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import ConsultationBanner from "@/components/ConsultationBanner";

export default function ProductPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <main className="relative bg-background overflow-hidden">
      {/* Top decorative orbs */}
      <div
        aria-hidden
        className="absolute top-32 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(0,150,199,0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-96 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(3,4,94,0.18) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── PAGE HEADER ── */}
      <section className="relative pt-32 lg:pt-40 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Eyebrow with dot accents */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-primary/40" />
              <span className="text-primary text-xs font-bold tracking-[0.35em] uppercase">
                Catalogue
              </span>
              <span className="h-px w-10 bg-primary/40" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.02] mb-7">
              Our{" "}
              <span className="relative inline-block">
                <span className="brand-gradient-text">Product Range</span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={headingInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#0096C7] to-[#48CAE4] origin-left rounded-full"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Browse our comprehensive catalogue of sealants, adhesives, foams,
              coatings and specialty compounds — each formulated to meet the
              demands of modern industry.
            </motion.p>

            {/* Brand value pills */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {[
                { Icon: ShieldCheck, label: "Industrial-Grade Quality" },
                { Icon: FlaskConical, label: "R&D Backed Formulations" },
                { Icon: Wrench, label: "Built for Tough Jobs" },
                { Icon: Globe2, label: "Trusted Across Industries" },
              ].map(({ Icon, label }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={headingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07, ease: "easeOut" }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground text-xs font-semibold tracking-wide hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 1: CATEGORIES GRID ── */}
      <section id="categories" className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {PRODUCT_CATEGORIES.map((category, i) => (
              <ProductCategoryCard
                key={category.slug}
                category={category}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CONSULTATION BANNER ── */}
      <ConsultationBanner />
    </main>
  );
}
