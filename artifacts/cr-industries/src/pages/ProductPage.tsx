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

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold tracking-wider uppercase"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary text-base font-black">7</span> Categories
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-border" />
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary text-base font-black">125+</span> Products
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-border" />
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary text-base font-black">ISO</span> Certified
              </span>
            </motion.div>
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
