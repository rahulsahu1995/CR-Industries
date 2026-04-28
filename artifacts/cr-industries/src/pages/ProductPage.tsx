import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      <section className="relative pt-32 lg:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold tracking-[0.25em] uppercase rounded-full mb-5">
              Our Product Range
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.05] mb-6">
              Industrial Solutions{" "}
              <span className="brand-gradient-text">Engineered</span> for Every Job
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={headingInView ? { width: 80 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-primary mx-auto rounded-full mb-6"
            />
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Browse our comprehensive catalogue of sealants, adhesives, foams,
              coatings and specialty compounds — each formulated to meet the
              demands of modern industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 1: CATEGORIES GRID ── */}
      <section id="categories" className="relative py-16 px-4 sm:px-6 lg:px-8">
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
